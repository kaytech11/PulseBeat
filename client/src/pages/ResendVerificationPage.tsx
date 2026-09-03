import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { resendVerificationEmail } from "../services/auth.service";

const ResendVerificationPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setSent(false);

      const data = await resendVerificationEmail(
        email.trim()
      );

      setSent(true);

      toast.success(
        data.message ||
        "Verification email sent successfully"
      );
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to resend verification email"
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

      {/* Content */}
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
          {/* Heading */}
          <div className="mb-7">
            <h1
              className="text-2xl sm:text-3xl font-semibold"
              style={{
                color: "#f8fafc",
              }}
            >
              Resend Verification
            </h1>

            <p
              className="mt-2 text-sm sm:text-base"
              style={{
                color: "#94a3b8",
              }}
            >
              Didn't receive your verification email?
              Enter the email you used to create your
              PulseBeat account and we'll send you a new
              verification link.
            </p>
          </div>

          {/* Success message */}
          {sent && (
            <div
              className="mb-5 rounded-xl p-4"
              style={{
                background:
                  "rgba(34,197,94,0.08)",
                border:
                  "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <p
                className="text-sm"
                style={{
                  color: "#86efac",
                }}
              >
                Verification email sent successfully.
                Please check your inbox and spam folder.
              </p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            {/* Email */}
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
                Email
              </label>

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                style={{
                  background: "#1c2128",
                  border: "1px solid #2a313c",
                  borderRadius: "12px",
                  padding: "0.9rem 1rem",
                  color: "#f8fafc",
                  fontSize: "0.95rem",
                  outline: "none",
                  opacity: loading ? 0.7 : 1,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor =
                    "#22c55e";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(34,197,94,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    "#2a313c";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Submit */}
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
                transition: "0.2s ease",
                marginTop: "0.5rem",
              }}
            >
              {loading
                ? "Sending..."
                : "Resend Verification Email"}
            </button>
          </form>

          {/* Back to login */}
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

export default ResendVerificationPage;