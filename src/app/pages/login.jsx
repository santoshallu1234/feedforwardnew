"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [users, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("../api/users/login", users);
      console.log("login success", response.data);

      // Reset the form before redirect
      setUser({
        email: "",
        password: "",
      });

      router.push("/profile");
    } catch (error) {
      console.log("login failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users.email.length > 0 && users.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [users.email, users.password]);

  return (
    <main className="flex flex-col gap-6 h-screen w-full bg-gradient-to-r from-gray-800 to-gray-900 items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr className="border-gray-600 mb-6" />
        
        <input
          id="email"
          value={users.email}
          onChange={(e) => setUser({ ...users, email: e.target.value })}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          id="password"
          value={users.password}
          onChange={(e) => setUser({ ...users, password: e.target.value })}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className={`w-full px-4 py-2 rounded-md text-white font-semibold ${buttonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "Enter Details" : "Login"}
        </button>

        <Link href="../signup" className="block text-center text-blue-400 hover:text-blue-300 mt-6">
          Don’t have an account? Sign up
        </Link>
      </div>
    </main>
  );
}
