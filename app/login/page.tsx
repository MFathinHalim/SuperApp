"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { userType } from "../interface";

export default function Post() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<userType | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        name,
        password,
      });
      console.log("API Response:", response.data);
      setResponse(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="w-full max-w-md p-4 bg-gray-900 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 mb-2">Nama</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {response && (
          <div className="mt-4">
            <h1 className="text-3xl text-center">{response.name}</h1>
            <h2 className="text-2xl text-center">{response.desc}</h2>
          </div>
        )}
      </div>
    </main>
  );
}
