import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { cache } from "react";
import { ApiError } from "@/server/api";
import { getDb } from "@/server/db";
import { requireEnv } from "@/server/env";
import { verifyPassword } from "@/server/password";

const COOKIE = "mb_session";
const SESSION_DAYS = 7;
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export type Role = "admin" | "editor";
export type SessionUser = { id: string; email: string; name: string; role: Role };

/** The database stores only a keyed hash, so a leak can't reveal live tokens. */
const hashToken = (token: string) =>
  createHmac("sha256", requireEnv("AUTH_SECRET")).update(token).digest("hex");

export async function startSession(userId: ObjectId): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);

  const db = await getDb();
  await db.collection("sessions").insertOne({ tokenHash: hashToken(token), userId, expiresAt });

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;

  if (token) {
    const db = await getDb();
    await db.collection("sessions").deleteOne({ tokenHash: hashToken(token) });
  }
  store.delete(COOKIE);
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;

  const db = await getDb();
  const session = await db.collection("sessions").findOne({ tokenHash: hashToken(token) });
  if (!session || session.expiresAt < new Date()) return null;

  const user = await db.collection("users").findOne({ _id: session.userId, active: true });
  if (!user) return null;

  return { id: user._id.toString(), email: user.email, name: user.name, role: user.role };
});

/** Every admin operation calls this on the server, whatever the interface shows. */
export async function requireUser(role?: Role): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new ApiError(401, "UNAUTHENTICATED", "Sign in to continue.");
  if (role === "admin" && user.role !== "admin") {
    throw new ApiError(403, "FORBIDDEN", "You don't have permission to do this.");
  }
  return user;
}

export async function signIn(email: string, password: string): Promise<void> {
  const db = await getDb();
  const attempts = db.collection<{ _id: string; count: number; expiresAt: Date }>("loginAttempts");
  const attempt = await attempts.findOne({ _id: email });

  if (attempt && attempt.count >= MAX_ATTEMPTS && attempt.expiresAt > new Date()) {
    throw new ApiError(429, "RATE_LIMITED", "Too many attempts. Try again in 15 minutes.");
  }

  const user = await db.collection("users").findOne({ email, active: true });
  const valid = user ? await verifyPassword(password, user.passwordHash) : false;

  if (!user || !valid) {
    await attempts.updateOne(
      { _id: email },
      {
        $inc: { count: 1 },
        $set: { expiresAt: new Date(Date.now() + LOCK_MINUTES * 60_000) },
      },
      { upsert: true },
    );
    throw new ApiError(401, "UNAUTHENTICATED", "The email or password is incorrect.");
  }

  await attempts.deleteOne({ _id: email });
  await startSession(user._id);
}

export async function countUsers(): Promise<number> {
  const db = await getDb();
  return db.collection("users").countDocuments();
}
