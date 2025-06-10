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
      await axios.post("http://localhost:3000/api/auth/register", {
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
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url('/bg.jpg')` }} // bg.jpg must be in /public
    >
      <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-am"></div>

      <div className="rounded-lg max-w-md w-full bg-black/50 bg-opacity-90 p-8 shadow-lg backdrop-blur-sm relative z-10">
        <h1 className="text-3xl font-bold text-green-400 mb-3">SIGN UP</h1>
        <p className="mb-6 text-center text-green-400 text-xl">
          Already have an account?{" "}
          <Link href="/login" className="text-green-300 font-semibold hover:underline">
            Login here
          </Link>
        </p>

        {errorMsg && (
          <div className="bg-green-100 border border-green-400 text-green-400 px-4 py-3 rounded mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6" noValidate>
          <div>
            <label htmlFor="firstName" className="block text-green-500 mb-2 font-medium">
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
              className="w-full border border-green-300 text-white rounded px-4 py-3 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-green-500 mb-2 font-medium">
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
              className="w-full border border-green-300 text-white rounded px-4 py-3 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-green-500 mb-2 font-medium">
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
              className="w-full border border-green-300 text-white rounded px-4 py-3 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-green-500 mb-2 font-medium">
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
              className="w-full border border-green-300 text-white rounded px-4 py-3 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded hover:bg-green-800 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
