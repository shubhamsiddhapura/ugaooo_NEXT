"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await axios.post("/api/register", {
        Firstname: formData.firstName,
        Lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      router.push("/login");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url('/bg.jpg')` }} // bg.jpg must be in /public
    >
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-am"></div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-lg shadow-lg bg-black/50 bg-opacity-90 backdrop-blur-sm">
        <h1 className="mb-3 text-3xl font-bold text-green-400">SIGN UP</h1>
        <p className="mb-6 text-xl text-center text-green-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-green-300 hover:underline">
            Login here
          </Link>
        </p>

        {errorMsg && (
          <div className="px-4 py-3 mb-6 text-center text-green-400 bg-green-100 border border-green-400 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6" noValidate>
          <div>
            <label htmlFor="firstName" className="block mb-2 font-medium text-green-500">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
              className="w-full px-4 py-3 text-black placeholder-green-400 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-2 font-medium text-green-500">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full px-4 py-3 text-black placeholder-green-400 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-green-500">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-black placeholder-green-400 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-green-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              className="w-full px-4 py-3 text-black placeholder-green-400 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition bg-green-700 rounded hover:bg-green-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
