"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage() {
  const { login, loginWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  if (user && !loading) {
    router.replace("/");
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      router.replace("/");
    } catch {
      setErr("Invalid credentials");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 p-8 border rounded">
        <h2 className="text-xl font-bold">Sign In</h2>
        <input
          className="border p-2 rounded w-full"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {err && <div className="text-red-500">{err}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Sign In</button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
          onClick={loginWithGoogle}
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
} 