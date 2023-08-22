import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
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
  if (lessonId) {
    await db.lesson.delete({
      where: {
        id: lessonId,
      },
    });
    return redirect("/admin");
  }
  return null;
};

export default function Admin() {
  const { categoriess, quizzes } = useLoaderData();
  console.log(quizzes);
  return (
    <section className="min-h-screen bg-slate-100 py-12">
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
          className="mt-8 bg-slate-300/50 min-w-full rounded-md w-full p-2"
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
                            className="flex justify-between w-full p-4"
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

        <Form className="mt-8" method="POST">
          {Array.isArray(quizzes) && quizzes.length ? (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="rounded-md bg-slate-300/50 p-2 mb-2"
              >
                <div className="flex flex-col">
                  <p>
                    <span className="capitalize mr-2 text-lg">category:</span>{" "}
                    {quiz.category}
                  </p>

                  <p>
                    <span className="mr-2 text-lg">Question:</span>
                    {quiz.question}
                  </p>
                </div>
                <p className="text-lg">Option:</p>
                <div className="flex gap-4">
                  {quiz.options.map((option, index) => (
                    <div key={option.id} className="flex justify-start">
                      <p>
                        <span className="mr-1">{index + 1}.</span> {option.text}
                      </p>
                    </div>
                  ))}
                </div>
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
        </Form>
      </div>
    </section>
  );
}
