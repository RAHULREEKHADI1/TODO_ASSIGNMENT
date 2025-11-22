import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/forgot-password",
        { email }
      );
      toast.success(data.message);
      setEmail("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f7f7] px-4">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#CF3620]">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center">
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CF3620]"
          required
        />

        <button
          type="submit"
          className="bg-[#CF3620] text-white py-2 rounded hover:bg-[#e94a36] transition-colors"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};
