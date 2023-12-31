import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import React from "react";
import { getUser } from "~/utils/session.server";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { db } from "~/utils/db.server";
import { getCourses } from "../utils/prisma.server";

export const loader = async ({ request }) => {
  const user = await getUser(request);
  if (!user || user.role !== "ADMIN") {
    return redirect("/");
  }
  const categoriess = await getCourses();
  const quizzes = await db.quiz.findMany({ include: { options: true } });
  return { categoriess, quizzes };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const lessonId = form.get("lesson_id");
  const quizId = form.get("quiz_id");
  if (lessonId) {
    await db.lesson.delete({
      where: {
        id: lessonId,
      },
    });
    return redirect("/admin");
  }

  if (quizId) {
    try {
      await db.option.deleteMany({ where: { quizId } });
      await db.quiz.delete({
        where: { id: quizId },
      });
      return json({ message: "Quiz delete success." }, 200);
    } catch (error) {
      console.log(error);
      return json({ message: "Error deleting quiz." }, 500);
    }
  }
  return null;
};

export default function Admin() {
  const { categoriess, quizzes } = useLoaderData();
  const navigation = useNavigation();
  return (
    <section className={`min-h-screen bg-slate-100  py-12 `}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-around">
          <Link to="create">
            <button className="capitalize p-2 bg-blue-500 rounded-md text-white">
              add lesson
            </button>
          </Link>
          <Link to="create-quiz">
            <button className="capitalize p-2 bg-blue-500 rounded-md text-white">
              add quiz
            </button>
          </Link>
        </div>
        <Form
          method="POST"
          className={`mt-8 bg-slate-300/50 min-w-full rounded-md w-full p-2 `}
        >
          {categoriess ? (
            categoriess.map((category) => (
              <div key={category.id}>
                {category ? (
                  category?.courses.map((course) => (
                    <div key={course.id}>
                      {course ? (
                        course?.lessons.map((lesson) => (
                          <div
                            className={`flex justify-between border-b border-black gap-4 items-center w-full p-2  ${
                              navigation.state === ("submitting" || "loading")
                                ? "opacity-70 bg-black"
                                : ""
                            }`}
                            key={lesson.id}
                          >
                            <Link to={`/dsa/${course.id}/${lesson.id}`}>
                              <h1 className="text-blue-700">{lesson.title}</h1>
                            </Link>
                            <div className="flex gap-6">
                              <Link to={`edit/${lesson.id}`}>
                                <button>
                                  <FaEdit className="text-green-500" />
                                </button>
                              </Link>
                              <button
                                type="submit"
                                value={lesson.id}
                                name="lesson_id"
                              >
                                <MdDelete className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p key={1}>no courses</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>no courses</p>
                )}
              </div>
            ))
          ) : (
            <p>no courses</p>
          )}
        </Form>

        <Form
          className={`mt-8  ${
            navigation.state === ("submitting" || "loading")
              ? "opacity-70 bg-black"
              : ""
          }`}
          method="POST"
          action="/admin?index"
        >
          <h2 className="text-lg">Quizzes</h2>
          <div className="bg-slate-300/50 p-2">
            {Array.isArray(quizzes) && quizzes.length ? (
              quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="rounded-md flex items-center gap-4 justify-between  mb-2 border-b border-black"
                >
                  <p>{quiz.question.substring(0, 65)}...</p>
                  <div className="flex gap-6 mt-4">
                    <Link to={`create-quiz/${quiz.id}`}>
                      <button>
                        <FaEdit className="text-green-500" />
                      </button>
                    </Link>
                    <button type="submit" value={quiz.id} name="quiz_id">
                      <MdDelete className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No quizzes</p>
            )}
          </div>
        </Form>
      </div>
    </section>
  );
}
