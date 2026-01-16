import React, { useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Admin logged in");
      window.location.href = "/admin/documents";
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-card p-8 rounded-3xl shadow space-y-4 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form-input"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-input"
          required
        />

        <button className="btn-hero-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
