import { Link } from "@remix-run/react";
import React from "react";

// export const loader = async ({ request }) => {};

export default function Admin() {
  return (
    <section className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-3xl mx-auto">
        <Link to="create">
          <button className="capitalize p-2 bg-blue-500 rounded-md text-white">
            add lesson
          </button>
        </Link>
      </div>
    </section>
  );
}
