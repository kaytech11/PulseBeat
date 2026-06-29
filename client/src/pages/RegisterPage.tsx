import { useState } from "react";
import { registerUser } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authslice";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "LISTENER",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const data = await registerUser(formData);

  //     console.log(data);
  //     dispatch(setToken(data.token));

  //     alert("Registration successful");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    alert("Passwords do not match");
    return;
  }

  try {

    console.log("Submitting...");

    const data = await registerUser(
      formData
    );

    console.log(data);

    dispatch(
      setAuth({
        token: data.token,
        user: data.user,
      })
    );

    alert("Registration successful");

    navigate("/");

  } catch (error: any) {

    console.log(error);

    alert(
      error?.response?.data?.message ||
      "Registration failed"
    );
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

      {/* Form Container */}
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
              Create Account
            </h1>

            <p
              className="mt-2 text-sm"
              style={{
                color: "#94a3b8",
              }}
            >
              Start streaming your favorite music.
            </p>
          </div>

          {/* Username */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "0.78rem",
                color: "#94a3b8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
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

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
              placeholder="Create a password"
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

          {/* Confirm Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
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

          {/* Role */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "0.78rem",
                color: "#94a3b8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              I am a...
            </label>

            <select
              name="role"
              onChange={handleChange}
              style={{
                background: "#1c2128",
                border: "1px solid #2a313c",
                borderRadius: "12px",
                padding: "0.9rem 1rem",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
                cursor: "pointer",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(34,197,94,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#22c55e";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="LISTENER">Listener</option>
              <option value="ARTIST">Artist</option>
            </select>
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
            Register
          </button>

          {/* Footer */}
          <div className="text-center mt-2">
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.92rem",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#22c55e",
                  fontWeight: 600,
                }}
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;


    