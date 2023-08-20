import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React from "react";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }) => {
  const user = await getUser(request);
  if (!user || user.role !== "ADMIN") {
    return redirect("/");
  }
  return null;
};

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
