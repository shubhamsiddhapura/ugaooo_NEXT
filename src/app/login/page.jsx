"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";  // Put bg.jpg in public/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post("/api/login", {
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
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url('/bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-lg shadow-lg bg-black/50 bg-opacity-90 backdrop-blur-sm">
        <h1 className="mb-3 text-3xl font-bold text-green-400">LOGIN</h1>
        <p className="mb-6 text-xl text-center text-green-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-green-300 hover:underline">
            Create Account
          </Link>
        </p>

        {errorMsg && (
          <div className="px-4 py-3 mb-6 text-center text-green-400 bg-green-100 border border-green-400 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-green-500" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-black placeholder-green-400 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-green-500" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-4 py-3 text-black placeholder-green-400 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition bg-green-700 rounded hover:bg-green-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
