import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import { db } from "../utils/db.server";
import { redirect } from "@remix-run/node";

export async function loader({ params }) {
  const id = params.id;
  const lesson = await db.lesson.findUnique({
    where: { id },
    include: { course: true },
  });
  return { lesson };
}

export async function action({ request }) {
  const form = await request.formData();
  const lessonId = form.get("lesson_id");
  const courseId = form.get("course_id");
  const courseTitle = form.get("course_title");
  const lessonTitle = form.get("lesson_title");
  const lessonContent = form.get("lesson_content");

  await db.lesson.update({
    where: { id: lessonId },
    data: {
      title: lessonTitle,
      content: lessonContent,
      course: {
        connect: {
          id: courseId,
          title: courseTitle,
        },
      },
    },
  });
  return redirect("/admin");
}

export default function Edit() {
  const { lesson } = useLoaderData();
  const [courseTitle, setCOurseTitle] = React.useState(lesson.course.title);
  const [lessonTitle, setLessonTitle] = React.useState(lesson.title);
  const [lessonContent, setLessonContent] = React.useState(lesson.content);

  return (
    <section className="min-h-screen py-1 bg-slate-100">
      <div className="max-w-3xl mx-auto py-12">
        <Form
          method="POST"
          className="w-full flex flex-col items-center mx-auto justify-center drop-shadow-xl rounded-md bg-white p-8"
        >
          <input type="hidden" value={lesson.id} name="lesson_id" />
          <input type="hidden" value={lesson.course.id} name="course_id" />

          <div className="mb-8 w-full">
            <label htmlFor="course-title">Course title</label>
            <input
              required
              type="text"
              name="course_title"
              id="course-title"
              value={courseTitle}
              onChange={(e) => setCOurseTitle(e.target.value)}
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="lesson-title">Lesson title</label>
            <input
              required
              type="text"
              name="lesson_title"
              id="lesson-title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="lesson-content">Lesson content</label>
            <textarea
              required
              name="lesson_content"
              id="lesson-content"
              value={lessonContent}
              onChange={(e) => setLessonContent(e.target.value)}
              cols="30"
              rows="20"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            ></textarea>
          </div>
          <button type="submit" className="bg-slate-300 p-2 rounded-md">
            Submit
          </button>
        </Form>
      </div>
    </section>
  );
}
