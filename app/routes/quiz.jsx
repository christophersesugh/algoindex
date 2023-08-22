import { Form, useActionData, useNavigation } from "@remix-run/react";
import React from "react";
import { db } from "../utils/db.server";
import { json } from "@remix-run/node";
import { Markdown } from "../components/markdown";

export async function action({ request }) {
  const form = await request.formData();
  const quizCategory = form.get("quiz_category");
  try {
    const quizzes = await db.quiz.findMany({
      where: { category: quizCategory },
      include: { options: true },
    });
    return json({ quizzes }, 200);
  } catch (error) {
    return json({ message: "Error fetching quizzes" }, 500);
  }
}

export default function Quiz() {
  const data = useActionData();
  const navigation = useNavigation();
  const [currentQuizQuestion, setCurrentQuizQuestion] = React.useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
  const [quizScore, setQuizScore] = React.useState(0);
  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    if (currentQuizQuestion < data?.quizzes?.length) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      const quizScorePercentage =
        (correctAnswersCount / data?.quizzes?.length) * 100;
      setQuizScore(quizScorePercentage);
    }
  };

  const currentQuestion = data?.quizzes[currentQuizQuestion];
  return (
    <section className="min-w-full min-h-screen bg-slate-100">
      <div className="max-w-xl w-full mx-auto px-4 py-20">
        {data?.quizzes?.length ? (
          <Form className="mx-auto w-full" method="POST">
            <input type="hidden" name="quiz_score" value={quizScore} />
            {currentQuestion ? (
              <div className="px-4 w-full mx-auto">
                <h2>
                  {" "}
                  <span className="text-xl"></span>Question:{" "}
                  {currentQuizQuestion + 1}
                </h2>
                <Markdown source={currentQuestion.question} />
                {currentQuestion.options.map((option, index) => (
                  <label htmlFor="quiz-option" key={option.id} className="flex">
                    <div className="flex items-center gap-2">
                      <span>{index + 1}</span>
                      <input
                        type="radio"
                        name="quiz_option"
                        value={option.text}
                        onClick={() => handleNextQuestion(option.isCorrect)}
                        className="mr-4"
                      />
                    </div>
                    <Markdown source={option.text} />
                  </label>
                ))}
              </div>
            ) : null}
            <div className="w-full mx-auto">
              {currentQuizQuestion <= data?.quizzes.length - 1 ? (
                <button
                  type="button"
                  onClick={() => handleNextQuestion(false)}
                  className="p-2 rounded-sm bg-slate-500 mx-auto my-6 text-white"
                >
                  Next Question
                </button>
              ) : (
                <p className="bg-green-100 rounded-sm p-2">
                  Quiz completed! Your answered {correctAnswersCount} correct
                  questions.
                </p>
              )}
            </div>
          </Form>
        ) : (
          <Form
            className="drop-shadow-xl rounded-md bg-white p-4 "
            method="POST"
            aria-disabled={data?.quizzes?.length}
          >
            <h1 className="text-xl my-4">Select quiz category to begin.</h1>
            <select
              disabled={data?.quizzes?.length}
              name="quiz_category"
              id="quiz-category"
              className="p-2 bg-slate-100 w-full disabled:bg-slate-300 border border-black rounded-md"
            >
              <option value="data-structures">Data structures</option>
              <option value="algorithms">Algorithms</option>
            </select>
            <button
              disabled={data?.quizzes?.length}
              type="submit"
              className="p-2 bg-blue-500 disabled:bg-blue-200 text-white rounded-md mt-6 w-full"
            >
              {navigation.state === "submitting"
                ? "Fetching quizzes"
                : " Submit"}
            </button>
          </Form>
        )}
      </div>
    </section>
  );
}
