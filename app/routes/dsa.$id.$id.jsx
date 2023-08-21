import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { db } from "~/utils/db.server";
import { Markdown } from "../components/markdown";

export const loader = async ({ params }) => {
  const id = params.id;
  const lesson = await db.lesson.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
    },
  });
  return json({
    lesson,
  });
};

export default function Lesson() {
  const { lesson } = useLoaderData();
  return (
    <section className="min-w-full min-h-screen max-w-3xl bg-slate-100">
      <div className="max-w-3xl py-12 mx-auto px-4">
        {/* <Link to={``}>
        <button className="mb-6">Back to course</button>
        
        </Link> */}
        <h1 className="text-2xl text-blue-950 mb-8 bg-slate-200 p-2 rounded-sm">
          <span className="bg-zinc-700 text-white rounded-sm p-2">
            {" "}
            Course:
          </span>{" "}
          {lesson.course.title}
        </h1>
        <h2 className="text-xl text-blue-700 bg-slate-200 p-2 rounded-sm">
          <span className="bg-stone-700 rounded-sm text-white p-2">
            Lesson:
          </span>{" "}
          {lesson.title}
        </h2>
        <div className="mt-12">
          <Markdown source={lesson.content} />
        </div>
      </div>
    </section>
  );
}
