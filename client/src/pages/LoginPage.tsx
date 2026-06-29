


import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { setAuth } from "../features/auth/authslice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      dispatch(setAuth({
        token: data.token,
        user: data.user,
      }

      ));

      alert("Login successful");

      navigate("/");
    } catch (error) {
      console.log(error);
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
          className="flex justify-center items-center py-16 font-semibold font-serif text-4xl"
          style={{
            color: "#22c55e",
            letterSpacing: "0.18em",
            textShadow: "0 0 20px rgba(34,197,94,0.15)",
          }}
        >
          PULSEBEAT
        </h1>
      </div>

      {/* Login Container */}
      <div className="flex-1 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-[400px]"
          style={{
            background: "#161b22",
            border: "1px solid #2a313c",
            borderRadius: "20px",
            padding: "2.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          {/* Heading */}
          <div>
            <h1
              className="text-3xl font-semibold"
              style={{
                color: "#f8fafc",
              }}
            >
              Welcome Back
            </h1>

            <p
              className="mt-2 text-sm"
              style={{
                color: "#94a3b8",
              }}
            >
              Login to continue streaming your music.
            </p>
          </div>

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
              placeholder="you@example.com"
              onChange={handleChange}
              style={{
                background: "#1c2128",
                border: "1px solid #2a313c",
                borderRadius: "12px",
                padding: "0.9rem 1rem",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(34,197,94,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#2a313c";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password */}
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
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              style={{
                background: "#1c2128",
                border: "1px solid #2a313c",
                borderRadius: "12px",
                padding: "0.9rem 1rem",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(34,197,94,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#2a313c";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              background: "#22c55e",
              border: "none",
              borderRadius: "12px",
              padding: "0.95rem",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.2s ease",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#16a34a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#22c55e";
            }}
          >
            Login
          </button>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "#2a313c",
              marginTop: "0.25rem",
            }}
          />

          {/* Footer */}
          <div className="text-center">
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.92rem",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#22c55e",
                  fontWeight: 600,
                }}
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;