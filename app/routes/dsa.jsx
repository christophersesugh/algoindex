import { Link } from "@remix-run/react";
import React from "react";

export default function DSA() {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <section className="min-w-full min-h-screen px-4">
      <div className="max-w-3xl mx-auto">
        <form
          action=""
          className="max-w-2xl w-full mx-auto flex flex-col items-center bg-white drop-shadow-lg rounded-md border border-blue-500 my-12"
        >
          <input
            type="search"
            placeholder="arrays"
            name="search"
            id="search"
            className="p-2 mt-6 focus:border-none border border-blue-500 rounded-md w-[80%]"
          />
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 rounded-md text-white"
          >
            Search...
          </button>
          <p className="text-xl text-center my-6">Search AlgoIndex</p>
        </form>
        <div className="mx-auto">
          <div className="flex justify-center">
            {items.map((item, index) => (
              <button
                onClick={() => setTabIndex(index)}
                key={`item-${index}`}
                className={`p-2 border-b-4  ${
                  index === tabIndex
                    ? "border-b-blue-500 text-blue-600 bg-slate-200"
                    : "bg-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl mt-6 text-center">Data structures</h2>
            <ol className="space-y-4 mx-auto max-w-2xl w-full bg-slate-100 mt-6 p-8 rounded-md list-decimal">
              <li className="text-blue-500">
                <Link to={`/dsa/some`}>Linked lists</Link>
              </li>
              <li className="text-blue-500">
                <Link to={`/dsa/other`}>Linked lists</Link>
              </li>
              <li className="text-blue-500">
                <Link to={`/dsa/1`}>Linked lists</Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

const items = ["Data structures", "Algorithms"];
