import React from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { createUserSession, login, register } from "~/utils/session.server";
import { FaSpinner } from "react-icons/fa";

function validateEmail(email) {
  const validDomain = ["gmail.com", "outlook.com", "yahoo.com"];
  const validEMail = email.split("@")[1];
  if (!validDomain.includes(validEMail)) {
    return "Incorrect email address";
  }
}

function validatePassword(password) {
  if (password.length < 6) {
    return "Passwords must be at least 6 characters long";
  }
}

export let action = async ({ request }) => {
  let form = await request.formData();
  let loginType = form.get("loginType");
  let email = form.get("email");
  let password = form.get("password");
  if (
    typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { loginType, email, password };
  let fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  switch (loginType) {
    case "login": {
      let user = await login({ email, password });
      if (!user) {
        return {
          fields,
          formError: `Email or Password incorrect`,
        };
      }
      return createUserSession(user.id, user.role);
    }
    case "register": {
      let userExists = await db.user.findFirst({
        where: { email },
      });
      if (userExists) {
        return {
          fields,
          formError: `User with email ${email} already exists`,
        };
      }
      const user = await register({ email, password });
      if (!user) {
        return {
          fields,
          formError: `Something went wrong trying to create a new user.`,
        };
      }
      return createUserSession(user.id, user.role);
    }
    default: {
      return { fields, formError: `Login type invalid` };
    }
  }
};

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  console.log(navigation.state);
  return (
    <div className="flex justify-center items-start pt-20 p-2 h-screen bg-slate-100">
      <Form
        method="POST"
        className="rounded-md drop-shadow-xl p-8 bg-white w-full max-w-md"
      >
        <fieldset className="w-full flex justify-evenly my-6 text-center">
          <legend className="sr-only">Login or Register?</legend>
          <label>
            <input
              type="radio"
              name="loginType"
              value="login"
              defaultChecked={
                !actionData?.fields?.loginType ||
                actionData?.fields?.loginType === "login"
              }
            />{" "}
            Login
          </label>
          <label>
            <input
              type="radio"
              name="loginType"
              value="register"
              defaultChecked={actionData?.fields?.loginType === "register"}
            />{" "}
            Register
          </label>
        </fieldset>
        <div className="mb-8">
          <label htmlFor="email-input">Email</label>
          <input
            type="email"
            id="email-input"
            name="email"
            required
            className="p-2 rounded-sm w-full border"
          />
          {actionData?.fieldErrors ? (
            <p className="text-red-500">{actionData.fieldErrors.email}</p>
          ) : null}
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            name="password"
            type="password"
            required
            className="p-2 rounded-sm w-full border"
          />
          {actionData?.fieldErrors ? (
            <p className="text-red-500">{actionData.fieldErrors.password}</p>
          ) : null}
        </div>
        <button
          disabled={navigation.state === "submitting"}
          type="submit"
          className="bg-[#394264] p-2 rounded-md text-white disabled:bg-slate-300 mt-6"
        >
          {navigation.state === "submitting" ? (
            <FaSpinner className="text-black animate-spin text-3xl" />
          ) : (
            "Submit"
          )}
        </button>
        {actionData?.formError ? (
          <p className="text-red-500 mt-2">{actionData.formError}</p>
        ) : null}
      </Form>
    </div>
  );
}
