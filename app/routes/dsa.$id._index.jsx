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
        <form
          action=""
          className="max-w-2xl w-full mx-auto flex items-center bg-white rounded-md border border-blue-500 my-12"
        >
          <input
            type="search"
            placeholder="e.g: arrays"
            name="search"
            id="search"
            className="p-2 focus:border-none bg-slate-100 rounded-md w-full"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 rounded-md text-white "
          >
            <AiOutlineSearch className="text-2xl" />
          </button>
        </form>
        <div className="mx-auto">
          <div className="flex flex-col">
            {Array.isArray(course.lessons) &&
              course.lessons?.map((lesson, index) => {
                return (
                  <div key={`${lesson.id} ${index}`}>
                    <h2 className="text-xl mt-6 text-center text-blue-500 capitalize">
                      {lesson.title}
                    </h2>
                    <ol className="space-y-4 mx-auto max-w-2xl w-full bg-slate-100 mt-6 p-8 rounded-md list-decimal">
                      <li className="text-blue-500">
                        <Link to={`${lesson.id}`}>{lesson.title}</Link>
                      </li>
                    </ol>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
