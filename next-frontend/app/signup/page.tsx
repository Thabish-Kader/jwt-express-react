"use client";
import { signup } from "@/utils/apis/apis";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(userInput, setUserInput, router);
  };

  return (
    <main className="max-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-2 mt-20"
      >
        <h1 className="text-5xl">Sign Up</h1>
        <input
          type="text"
          name="username"
          value={userInput.username}
          onChange={handleInputChange}
          className="bg-transparent border rounded-lg outline-none p-2 w-full"
          placeholder="Enter Username"
        />
        <input
          type="text"
          name="password"
          value={userInput.password}
          onChange={handleInputChange}
          className="bg-transparent border rounded-lg outline-none p-2 w-full"
          placeholder="Enter Password"
        />
        <button
          type="submit"
          className="p-2 border rounded-lg hover:bg-slate-200 hover:text-black transition-colors duration-300 w-full"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
