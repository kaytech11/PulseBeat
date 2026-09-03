import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../services/auth.service";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await resetPassword(
        token,
        password,
        confirmPassword
      );

      toast.success(
        data.message ||
          "Password reset successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#0f1115",
      }}
    >
      {/* Logo */}
      <div>
        <h1
          className="flex justify-center items-center py-10 sm:py-16 font-semibold font-serif text-3xl sm:text-4xl"
          style={{
            color: "#22c55e",
            letterSpacing: "0.18em",
            textShadow:
              "0 0 20px rgba(34,197,94,0.15)",
          }}
        >
          PULSEBEAT
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div
          className="w-full max-w-[400px]"
          style={{
            background: "#161b22",
            border: "1px solid #2a313c",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div className="mb-7">
            <h1
              className="text-2xl sm:text-3xl font-semibold"
              style={{
                color: "#f8fafc",
              }}
            >
              Reset Password
            </h1>

            <p
              className="mt-2 text-sm sm:text-base"
              style={{
                color: "#94a3b8",
              }}
            >
              Create a new password for your PulseBeat
              account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* New Password */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <label
                style={{
                  fontSize: "0.78rem",
                  color: "#94a3b8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                New Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create a new password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full"
                  style={{
                    background: "#1c2128",
                    border: "1px solid #2a313c",
                    borderRadius: "12px",
                    padding:
                      "0.9rem 3rem 0.9rem 1rem",
                    color: "#f8fafc",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{
                    color: "#94a3b8",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <label
                style={{
                  fontSize: "0.78rem",
                  color: "#94a3b8",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Repeat your new password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full"
                  style={{
                    background: "#1c2128",
                    border: "1px solid #2a313c",
                    borderRadius: "12px",
                    padding:
                      "0.9rem 3rem 0.9rem 1rem",
                    color: "#f8fafc",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{
                    color: "#94a3b8",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full"
              style={{
                background: loading
                  ? "#166534"
                  : "#22c55e",
                border: "none",
                borderRadius: "12px",
                padding: "0.95rem",
                color: "#ffffff",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              style={{
                color: "#22c55e",
                fontWeight: 600,
                fontSize: "0.92rem",
              }}
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;