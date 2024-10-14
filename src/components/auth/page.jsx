"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      if (buttonDisabled) {
        return "Incorrect credentials";
      }
      setLoading(true);
      const response = await axios.post("../api/users/signup", user);
      console.log("Signup success", response.data);

      // Reset the form after successful signup
      setUser({
        email: "",
        password: "",
        username: "",
      });

      router.push("/login");
    } catch (error) {
      console.log("Signup failed");
      toast.error(error.response?.data || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main className="flex flex-col gap-6 h-screen w-full bg-gradient-to-r from-gray-800 to-gray-900 items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Sign Up"}
        </h1>
        <hr className="border-gray-600 mb-6" />

        <input
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          placeholder="Username"
          required
          className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 mb-6 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className={`w-full px-4 py-2 rounded-md text-white font-semibold ${buttonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Fill all fields" : "Sign Up"}
        </button>

        <Link href="../login" className="block text-center text-blue-400 hover:text-blue-300 mt-6">
          Already have an account? Login
        </Link>
      </div>
    </main>
  );
}


