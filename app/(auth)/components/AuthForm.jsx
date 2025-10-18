"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "signup") {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) router.push("/login");
    } else {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (!res.error) router.push("/");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center capitalize">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      <button
        onClick={() => signIn("google")}
        className="w-full mt-4 border flex items-center justify-center gap-2 p-2 rounded hover:bg-gray-100"
      >
        <img src="/google.svg" alt="Google" width={20} />
        Continue with Google
      </button>
    </div>
  );
}
