import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import React from "react";
import { db } from "../utils/db.server";
import { getUser } from "~/utils/session.server";
import { json, redirect } from "@remix-run/node";
import { Markdown } from "../components/markdown";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user || user === "undefined") {
    return redirect("/login");
  }
  try {
    const quizzes = await db.quiz.findMany({ include: { options: true } });
    return json({ user, quizzes, errorMessage: null }, 200);
  } catch (error) {
    return json(
      { user: null, quizzes: null, errorMessage: "Error fetching user" },
      500
    );
  }
}

export async function action({ request }) {
  const form = await request.formData();
  const userId = form.get("user_id");
  const quizCount = form.get("quiz_count");
  const quizLength = form.get("quiz_length");

  const quizScore = (quizCount / quizLength) * 100;
  try {
    await db.user.update({ where: { id: userId }, data: { quizScore } });
    return redirect("/my-account");
  } catch (error) {
    return json({ message: "Error submitting quiz" });
  }
}

export default function Quiz() {
  const loaderData = useLoaderData();
  const { user, quizzes } = loaderData;
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [currentQuizQuestion, setCurrentQuizQuestion] = React.useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  // const [quizScore, setQuizScore] = React.useState(0);
  const [startQuiz, setStartQuiz] = React.useState(false);
  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    if (currentQuizQuestion < quizzes.length) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuizQuestion < quizzes.length) {
      setCurrentQuizQuestion(currentQuizQuestion - 1);
    }
  };
  const currentQuestion = quizzes[currentQuizQuestion];

  return (
    <section className="min-w-full min-h-screen bg-slate-100">
      <div className="max-w-xl w-full mx-auto px-4 py-20">
        {startQuiz ? (
          <Form method="POST" className="mx-auto w-full px-4">
            <input type="hidden" name="user_id" value={user.id} />
            <input
              type="hidden"
              name="quiz_count"
              value={correctAnswersCount}
            />
            <input type="hidden" name="quiz_length" value={quizzes.length} />

            <h1 className="text-2xl text-center mb-6">Quiz</h1>

            {currentQuizQuestion < quizzes.length ? (
              currentQuestion && (
                <>
                  <p className="text-lg text-center">
                    Question: {currentQuizQuestion + 1} of {quizzes.length}
                  </p>
                  <Markdown source={currentQuestion.question} />
                  {currentQuestion.options.map((option, index) => (
                    <div className="flex flex-col gap-6" key={option.id}>
                      <label
                        htmlFor="quiz-option"
                        className="flex gap-4 items-center"
                      >
                        <span>{index + 1}.</span>
                        <input
                          type="radio"
                          name="quiz_option"
                          id="quiz-option"
                          value={option.text}
                          onClick={() => handleNextQuestion(option.isCorrect)}
                        />
                        <Markdown source={option.text} />
                      </label>
                    </div>
                  ))}
                  <div className="flex justify-around">
                    {currentQuizQuestion > 0 && (
                      <button
                        type="button"
                        onClick={() => handlePreviousQuestion()}
                        className="rounded-sm p-2 bg-blue-500 mt-6 text-white"
                      >
                        Previous question
                      </button>
                    )}
                    {currentQuizQuestion < quizzes.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleNextQuestion(false)}
                        className="rounded-sm p-2 bg-blue-500 mt-6 text-white"
                      >
                        Next question
                      </button>
                    )}
                  </div>
                </>
              )
            ) : (
              <div>
                <h2>Quiz completed!</h2>
                <p className="p-2 rounded-md text-white bg-stone-600 mt-4">
                  You answered {correctAnswersCount} out of {quizzes.length}{" "}
                  questions correctly.
                </p>
                <div className="flex justify-evenly">
                  <button
                    disabled={navigation.state === "submitting"}
                    type="submit"
                    className="rounded-sm p-2 disabled::bg-blue-300 disabled:cursor-not-allowed bg-blue-500 mt-6 text-white"
                  >
                    {navigation.state === "submitting"
                      ? "Submitting..."
                      : "Submit quiz"}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(0)}
                    className="rounded-sm p-2 bg-blue-500 mt-6 text-white"
                  >
                    Retake quiz
                  </button>
                </div>
                {actionData?.message ? (
                  <p className="text-red-500 mt-4">{actionData.message}</p>
                ) : null}
              </div>
            )}
          </Form>
        ) : (
          <button
            disabled={!quizzes.length}
            type="button"
            onClick={() => setStartQuiz(true)}
            className="rounded-sm disabled:bg-blue-300 disabled:cursor-not-allowed p-2 bg-blue-500 mt-6 text-white mx-auto w-full"
          >
            Start quiz
          </button>
        )}
      </div>
    </section>
  );
}
