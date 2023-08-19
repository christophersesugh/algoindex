import { createCookieSessionStorage, redirect } from "@remix-run/node";
// import bcrypt from "bcryptjs";
import algon2 from "argon2";
import { db } from "./db.server";

export async function register({ password, email }) {
  // const passwordHash = await bcrypt.hash(password, 10);
  const passwordHash = await algon2.hash(password);
  const user = await db.user.create({
    data: { passwordHash, email },
  });
  return { id: user.id, email, role: user.role };
}

export async function login({ email, password }) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }

  // const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  // if (!isCorrectPassword) {
  //   return null;
  // }
  const isCorrectPassword = await algon2.verify(user.passwordHash, password);
  if (!isCorrectPassword) {
    return null;
  }

  return { id: user.id, email, role: user.role };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "AlgoIndex_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}

export async function requireUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    throw redirect("/");
  }
  return userId;
}

export async function getUser(request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  const user = await db.user.findUnique({
    select: { id: true, email: true, role: true },
    where: { id: userId },
  });

  if (!user) {
    throw await logout(request);
  }

  return user;
}

export async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userId, role) {
  const session = await storage.getSession();
  session.set("userId", userId);
  if (role === "ADMIN") {
    return redirect("/admin", {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  }
  return redirect("/dsa", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
