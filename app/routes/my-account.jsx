import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import React from "react";
import bcrypt from "bcryptjs";
import { getUser } from "../utils/session.server";
import { db } from "../utils/db.server";
import { FaSpinner } from "react-icons/fa";

export async function loader({ request }) {
  const user = await getUser(request);
  return { user };
}

export async function action({ request }) {
  const form = await request.formData();
  const userId = form.get("user_id");
  const userPassword = form.get("user_password");
  if (userPassword) {
    const passwordHash = await bcrypt.hash(userPassword, 10);
    await db.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
    return { message: "Password update success." };
  }
  return null;
}

export default function MyAccount() {
  const { user } = useLoaderData();
  const data = useActionData();
  const navigation = useNavigation();
  return (
    <section className="min-h-screen py-1 bg-slate-100">
      <div className="max-w-lg mx-auto py-12">
        <Form
          method="POST"
          className="w-full flex flex-col items-center mx-auto justify-center drop-shadow-xl rounded-md bg-white p-8"
        >
          <div className="mb-8 w-full">
            <input type="hidden" name="user_id" value={user.id} id="user-id" />
            <label htmlFor="user-email">Email</label>
            <input
              required
              type="text"
              name="user_email"
              id="user-email"
              disabled
              value={user.email}
              className="w-full disabled:bg-slate-300  cursor-not-allowed p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="user-password">Password</label>
            <input
              required
              type="text"
              name="user_password"
              id="user-password"
              className="w-full  p-2 rounded-md border border-black bg-slate-100"
            />
          </div>
          <button type="submit" className="bg-slate-300 p-2 rounded-md">
            {navigation.state === "submitting" ? (
              <FaSpinner className="text-black animate-spin text-3xl" />
            ) : (
              "Update"
            )}
          </button>
          {data?.message ? (
            <p className="bg-green-200 p-2 mt-6">{data.message}</p>
          ) : null}
          <div className="mt-12 justify-self-start self-start">
            <h1 className="mb-4 text-left text-lg text-slate-600">
              <span className="text-slate-400">Quiz score</span>:{" "}
              {user.quizScore}%
            </h1>
          </div>

          {user.role === "ADMIN" ? (
            <Link to="/admin">
              <button className="bg-slate-700 text-white p-2 rounded-md mt-8">
                Dashboard
              </button>
            </Link>
          ) : null}
        </Form>
      </div>
    </section>
  );
}
