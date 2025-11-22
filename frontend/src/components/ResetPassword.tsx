import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/user/reset-password",
        { token, newPassword }
      );
      toast.success(data.message);
      setNewPassword("");
      navigate("/login"); // redirect to login after successful reset
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f7f7f7] px-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#CF3620]">
          Reset Password
        </h2>
        <p className="text-gray-600 text-center">
          Enter your new password to reset your account
        </p>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#CF3620]"
          required
        />

        <button
          type="submit"
          className="bg-[#CF3620] text-white py-2 rounded hover:bg-[#e94a36] transition-colors"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};
