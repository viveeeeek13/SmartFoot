"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      setLoading(false); // 🔴 IMPORTANT
      return;
    }

    alert("Registration successful");
    router.push("/login"); // ✅ redirect happens ONLY here
  } catch (error) {
    alert("Something went wrong");
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white p-2"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}