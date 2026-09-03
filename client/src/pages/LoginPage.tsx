import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLoginUser } from "../services/auth.service";
import { setAuth } from "../features/auth/authslice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

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

      // alert("Login successful");
      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Login failed"
      )
    }
  };

  const [showPassword, setShowPassword] = useState(false);

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
          className="flex flex-col gap-5 w-full max-w-[400px] sm:p-10"
          style={{
            background: "#161b22",
            border: "1px solid #2a313c",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          {/* Heading */}
          <div>
            <h1
              className="text-2xl sm:text-3xl font-semibold"
              style={{
                color: "#f8fafc",
              }}
            >
              Welcome Back
            </h1>

            <p
              className="mt-2 text-sm sm:text-base"
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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full"
                style={{
                  background: "#1c2128",
                  border: "1px solid #2a313c",
                  borderRadius: "12px",
                  padding: "0.9rem 3rem 0.9rem 1rem",
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

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{
                  color: "#94a3b8",
                  background: "transparent",
                  border: "none",
                  padding: "4px",
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

            {/* forgot password */}

          <div className="flex justify-end -mt-2">
            <Link
              to="/forgot-password"
              style={{
                color: "#22c55e",
                fontSize: "0.88rem",
                fontWeight: 500,
              }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            className="w-full"
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

          {/* Resend verification */}
          <div className="text-center">
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
            >
              Didn't receive your verification email?{" "}
              <Link
                to="/resend-verification"
                style={{
                  color: "#22c55e",
                  fontWeight: 600,
                }}
              >
                Resend email
              </Link>
            </p>
          </div>

          {/* Divider */}
          {/* <div
            style={{
              height: "1px",
              background: "#2a313c",
              marginTop: "0.25rem",
            }}
          /> */}

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-[#2a313c]" />
            <span className="px-3 text-sm text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-[#2a313c]" />
          </div>

          {/* <div className="flex justify-center"> */}
          {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                toast.error("Google login failed");
              }}
            /> */}
          <GoogleLogin
            theme="filled_black"
            shape="pill"
            size="large"
            width="350"
            onSuccess={async (credentialResponse) => {
              try {
                if (!credentialResponse.credential) {
                  toast.error("Google login failed");
                  return;
                }

                const data = await googleLoginUser({
                  token: credentialResponse.credential,
                });

                dispatch(
                  setAuth({
                    token: data.token,
                    user: data.user,
                  })
                );

                toast.success("Login successful");

                navigate("/");
              } catch (error: any) {
                toast.error(
                  error?.response?.data?.message ||
                  "Google login failed"
                );
              }
            }}
            onError={() => {
              toast.error("Google login failed");
            }}
          />


          {/* Footer */}
          <div className="text-center px-2">
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