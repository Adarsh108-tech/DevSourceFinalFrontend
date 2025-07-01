"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AuthForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // only for signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = type === "login" ? "http://localhost:5000/login" : "http://localhost:5000/register";
    const payload = type === "login"
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      if (type === "login") {
        localStorage.setItem("token", data.token);
        toast.success("Logged in successfully!");
        // optionally redirect
      } else {
        toast.success("Registered successfully!");
        // optionally redirect
      }
    } catch (err) {
      toast.error("Network error or server is down.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#3B0000] to-[#8B0000] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-8 shadow-lg backdrop-blur-md border border-red-900/50 relative overflow-hidden">
        <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-br from-red-800/40 to-red-600/20 blur-xl"></div>

        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-bold text-center mb-6 tracking-widest uppercase">
            {type === "login" ? "Login" : "Sign Up"}
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {type === "signup" && (
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-red-800 hover:bg-red-700 transition duration-300 text-white font-semibold tracking-wide"
            >
              {type === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="text-sm mt-6 text-center">
            {type === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-red-400 hover:text-red-200 underline">
                  Sign Up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-red-400 hover:text-red-200 underline">
                  Login
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
