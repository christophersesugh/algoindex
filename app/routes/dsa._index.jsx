import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    courses: await db.course.findMany(),
  });
};

export default function DSA() {
  const { courses } = useLoaderData();
  const [category, setCategory] = React.useState("data-structures");

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
          <div className="flex justify-center">
            {/* {Array.isArray(courses) && courses.length ? (
              Array.from(
                new Set(
                  courses.map((course) => {
                    return course.category;
                  })
                )
              ).map((uniqueCategory, index) => ( */}
            <button
              onClick={() => setCategory(uniqueCategory)}
              key={`item-${index}`}
              className={`p-2 border-b-4 duration-300 transition-all capitalize  ${
                category === uniqueCategory
                  ? "border-b-blue-500 text-blue-600 bg-slate-200"
                  : "bg-slate-300"
              }`}
            >
              {uniqueCategory}
            </button>
            {/* ))
            ) */}
            : (
            <h1 className="text-2xl text-slate-500">No courses available.</h1>
            )}
          </div>
          <div className="flex flex-col">
            {Array.isArray(courses) &&
              Array.from(new Set(courses.map((course) => course.category))).map(
                (uniqueCategory, index) => (
                  <div key={`uniqueCategory-${index}`}>
                    {category === uniqueCategory && (
                      <>
                        <h2 className="text-xl mt-6 text-center text-blue-500 capitalize">
                          {uniqueCategory}
                        </h2>
                        <ol className="space-y-4 mx-auto max-w-2xl w-full bg-slate-100 mt-6 p-8 rounded-md list-decimal">
                          {courses
                            .filter(
                              (course) => course.category === uniqueCategory
                            )
                            .map((filteredCourse, index) => (
                              <li
                                key={`${filteredCourse.id} ${index}`}
                                className="text-blue-500"
                              >
                                <Link to={filteredCourse.id}>
                                  {filteredCourse.title}
                                </Link>
                              </li>
                            ))}
                        </ol>
                      </>
                    )}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
