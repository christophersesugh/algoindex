import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import React from "react";
export const loader = async ({ params }) => {
  const slug = params.slug;
  return json({ slug });
};
export default function DSAItemRoute() {
  // const slug = useLoaderData();
  const slug = useParams();
  console.log(slug);
  return (
    <section className="bg-slate-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center my-6">Linked lists</h1>
        <div>content {slug}</div>
      </div>
    </section>
  );
}
