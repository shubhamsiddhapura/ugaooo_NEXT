"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";  // Put bg.jpg in public/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:3000/api/section/getSectionWithSubSections", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role);

      if (user.role === "admin") {
        router.push("/admin-panel");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm"></div>

      <div className="rounded-lg max-w-md w-full bg-black/50 bg-opacity-90 p-8 shadow-lg backdrop-blur-sm relative z-10">
        <h1 className="text-3xl font-bold text-green-400 mb-3">LOGIN</h1>
        <p className="mb-6 text-center text-green-400 text-xl">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-300 font-semibold hover:underline">
            Create Account
          </Link>
        </p>

        {errorMsg && (
          <div className="bg-green-100 border border-green-400 text-green-400 px-4 py-3 rounded mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-green-500 mb-2 font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-green-300 text-white rounded px-4 py-3 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-green-500 mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full border border-green-300 text-white rounded px-4 py-3 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
