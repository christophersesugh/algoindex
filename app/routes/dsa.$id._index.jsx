import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const id = params.id;
  return json({
    course: await db.course.findUnique({
      where: { id },
      include: {
        lessons: true,
      },
    }),
  });
};

export default function DSAItemRoute() {
  const { course } = useLoaderData();
  return (
    <section className="min-w-full min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mx-auto">
          <div className="flex flex-col">
            <h2 className="text-xl mt-6 text-center text-blue-500 capitalize">
              {course.title}
            </h2>
            <ol className="space-y-4 mx-auto max-w-2xl w-full bg-slate-100 mt-6 p-8 rounded-md list-decimal">
              {Array.isArray(course.lessons) &&
                course.lessons?.map((lesson, index) => {
                  return (
                    <div key={`${lesson.id} ${index}`}>
                      <li className="text-blue-500">
                        <Link prefetch="intent" to={`${lesson.id}`}>
                          {lesson.title}
                        </Link>
                      </li>
                    </div>
                  );
                })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
