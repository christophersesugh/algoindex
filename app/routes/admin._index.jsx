import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
  return { categoriess };
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
  const { categoriess } = useLoaderData();
  return (
    <section className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Link to="create">
          <button className="capitalize p-2 bg-blue-500 rounded-md text-white">
            add lesson
          </button>
        </Link>
        <form
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
        </form>
      </div>
    </section>
  );
}
