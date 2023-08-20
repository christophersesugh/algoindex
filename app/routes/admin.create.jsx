import React from "react";
import { getUser } from "~/utils/session.server";
import { createLesson } from "~/utils/prisma.server";
import { Editor } from "../components/admin/editor";
import { Form, useActionData } from "@remix-run/react";
import { redirect } from "@remix-run/node";

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
  const lesson = await createLesson(courseTitle, categoryName, lessonData);
  return { user, lesson };
}

export default function Create() {
  const [content, setContent] = React.useState(``);
  return (
    <section className="min-h-screen py-1 bg-slate-100">
      <div className="max-w-3xl mx-auto py-12">
        <Form
          method="POST"
          className="w-full flex flex-col items-center mx-auto justify-center drop-shadow-xl rounded-md bg-white"
        >
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category_name"
            className="w-full md:w-[50%]"
          >
            <option value="data-structures">Data structures</option>
            <option value="algorithms">Algorithms</option>
          </select>
          <label htmlFor="course-title">Course title</label>
          <input type="text" name="course_title" id="course-title" />
          <label htmlFor="lesson-title">Lesson title</label>
          <input type="text" name="lesson_title" id="lesson-title" />
          <input
            type="hidden"
            name="lesson_content"
            id="lesson-content"
            value={content}
            onChange={() => {}}
          />
          <Editor content={content} setContent={setContent} />
          <button type="submit">Submit</button>
        </Form>
      </div>
    </section>
  );
}
