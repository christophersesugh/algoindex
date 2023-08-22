import React from "react";
import { getUser } from "~/utils/session.server";
import { createLesson } from "~/utils/prisma.server";
import { Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { db } from "../utils/db.server";

export async function loader({ request }) {
  return null;
}

export async function action({ request }) {
  const form = await request.formData();
  const quizCategory = form.get("quiz_category");
  const quizQuestion = form.get("quiz_question");
  const optionOne = form.get("option_1");
  const optionTwo = form.get("option_2");
  const optionThree = form.get("option_3");
  const optionFour = form.get("option_4");
  const correctOption = parseInt(form.get("correct_option"));

  try {
    await db.quiz.create({
      data: {
        question: quizQuestion,
        category: quizCategory,
        options: {
          create: [
            { text: optionOne, isCorrect: correctOption === 0 },
            { text: optionTwo, isCorrect: correctOption === 1 },
            { text: optionThree, isCorrect: correctOption === 2 },
            { text: optionFour, isCorrect: correctOption === 3 },
          ],
        },
      },
    });
    return redirect("/admin");
  } catch (error) {
    return json({ message: "Error creating quiz" }, 500);
  }
}

export default function CreateQuiz() {
  return (
    <section className="min-h-screen py-1 bg-slate-100">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-xl my-4">Create quiz</h1>
        <Form
          method="POST"
          className="w-full flex flex-col items-center mx-auto justify-center drop-shadow-xl rounded-md bg-white p-8"
        >
          <div className="w-full mb-8 mx-auto">
            <label htmlFor="quiz-category">Quiz category</label>
            <select
              required
              id="quiz-category"
              name="quiz_category"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            >
              <option value="data-structures">Data structures</option>
              <option value="algorithms">Algorithms</option>
            </select>
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="quiz-question">Quiz question</label>
            <textarea
              required
              name="quiz_question"
              id="quiz-question"
              cols="30"
              rows="5"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            ></textarea>
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="option-1">Option 1</label>
            <input
              required
              type="text"
              name="option_1"
              id="option-1"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="option-2">Option 2</label>
            <input
              required
              type="text"
              name="option_2"
              id="option-2"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="option-3">Option 3</label>
            <input
              required
              type="text"
              name="option_3"
              id="option-3"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="option-4">Option 4</label>
            <input
              required
              type="text"
              name="option_4"
              id="option-4"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="w-full mb-8 mx-auto">
            <label htmlFor="correct-option">Correct option</label>
            <select
              required
              id="correct-option"
              name="correct_option"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            >
              <option value="0">Option 1</option>
              <option value="1">Option 2</option>
              <option value="2">Option 3</option>
              <option value="3">Option 4</option>
            </select>
          </div>

          <button type="submit" className="bg-slate-300 p-2 rounded-md">
            Create Quiz
          </button>
        </Form>
      </div>
    </section>
  );
}
