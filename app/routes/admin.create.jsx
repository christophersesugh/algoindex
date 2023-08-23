import React from "react";
import { getUser } from "~/utils/session.server";
import { createLesson } from "~/utils/prisma.server";
import { Form, useNavigation } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { useLocalStorageState } from "../utils/hooks";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user || user.role !== "ADMIN") {
    throw redirect("/");
  }
  return null;
}

export async function action({ request }) {
  const form = await request.formData();
  const categoryName = form.get("category_name");
  const courseTitle = form.get("course_title");
  const lessonTitle = form.get("lesson_title");
  const lessonContent = form.get("lesson_content");
  const user = await getUser(request);
  if (!user || user.role !== "ADMIN") {
    throw redirect("/");
  }
  const lessonData = {
    title: lessonTitle,
    content: lessonContent,
  };
  await createLesson(courseTitle, categoryName, lessonData);
  return redirect("/admin");
}

export default function Create() {
  // const [lessonContent, setLessonContent] = useLocalStorageState(
  //   "lesson_content",
  //   ""
  // );
  const navigattion = useNavigation();
  return (
    <section className="min-h-screen py-1 bg-slate-100">
      <div className="max-w-3xl mx-auto py-12">
        <Form
          method="POST"
          className="w-full flex flex-col items-center mx-auto justify-center drop-shadow-xl rounded-md bg-white p-8"
        >
          <div className="w-full mb-8 mx-auto">
            <label htmlFor="category">Category</label>
            <select
              required
              id="category"
              name="category_name"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            >
              <option value="data-structures">Data structures</option>
              <option value="algorithms">Algorithms</option>
            </select>
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="course-title">Course title</label>
            <input
              required
              type="text"
              name="course_title"
              id="course-title"
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
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="lesson-content">Lesson content</label>
            <textarea
              required
              name="lesson_content"
              id="lesson-content"
              cols="30"
              rows="20"
              // value={lessonContent}
              // onChange={(e) => setLessonContent(e.target.value)}
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            ></textarea>
          </div>
          <button type="submit" className="bg-slate-300 p-2 rounded-md">
            {navigattion.state === "submitting"
              ? "Creating course..."
              : "Create course"}
          </button>
        </Form>
      </div>
    </section>
  );
}
