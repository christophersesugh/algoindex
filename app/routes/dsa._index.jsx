import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { getCourses } from "../utils/prisma.server";

export const loader = async () => {
  const categories = await getCourses();
  return json({
    categories,
  });
};

export const action = async ({ request }) => {
  const form = await request?.formData();
  const searchTerm = form?.get("search").toLowerCase();
  const categories = await getCourses(searchTerm);
  return json({
    categories,
  });
};

export default function DSA() {
  const { categories } = useLoaderData();
  const [initialCategory, setCategory] = React.useState("data-structures");
  return (
    <section className="min-w-full min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <form
          method="POST"
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
          <div className="flex justify-center">
            {Array.isArray(categories) && categories.length ? (
              categories.map((category, index) => (
                <button
                  onClick={() => setCategory(category.name)}
                  key={category.id}
                  className={`p-2 border-b-4 duration-300 transition-all capitalize  ${
                    initialCategory === category.name
                      ? "border-b-blue-500 text-blue-600 bg-slate-200"
                      : "bg-slate-300"
                  }`}
                >
                  {category.name}
                </button>
              ))
            ) : (
              <h1 className="text-2xl text-slate-500">No courses available.</h1>
            )}
          </div>
          <div className="flex flex-col">
            {Array.isArray(categories) && categories.length
              ? categories.map((category, index) => (
                  <div key={`uniqueCategory-${index}`}>
                    {initialCategory === category.name && (
                      <>
                        <h2 className="text-xl mt-6 text-center text-blue-500 capitalize">
                          {category.name}
                        </h2>
                        <ol className="space-y-4 mx-auto max-w-2xl w-full bg-slate-100 mt-6 p-8 rounded-md list-decimal">
                          {category.courses.map((course, index) => (
                            <li
                              key={course.id}
                              className="text-blue-700 text-lg"
                            >
                              <button>
                                <Link prefetch="intent" to={course.id}>
                                  {course.title}
                                </Link>
                              </button>
                            </li>
                          ))}
                        </ol>
                      </>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
