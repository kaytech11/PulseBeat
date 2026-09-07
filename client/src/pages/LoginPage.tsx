// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser, googleLoginUser } from "../services/auth.service";
// import { setAuth } from "../features/auth/authslice";
// import { toast } from "react-toastify";
// import { GoogleLogin } from "@react-oauth/google";
// import { Eye, EyeOff } from "lucide-react";

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     try {
//       const data = await loginUser(formData);

//       dispatch(
//         setAuth({
//           token: data.token,
//           user: data.user,
//         })
//       );

//       toast.success("Login successful");

//       navigate("/");
//     } catch (error: any) {
//       console.log(error);

//       toast.error(
//         error?.response?.data?.message ||
//         "Login failed"
//       );
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-hidden h-full inset-0 bg-[#090909] text-white">

//       {/* Ambient background glow */}
//       <div className="pointer-events-none absolute -top-40 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-[#1ED760]/[0.07] blur-[120px]" />

//       <div className="relative flex min-h-screen flex-col">

//         {/* Logo */}
//         <header className="flex justify-center px-5 pt-8 sm:pt-12 lg:pt-14">
//           <Link
//             to="/login"
//             className="text-2xl font-bold tracking-[0.18em] text-[#1ED760] transition-opacity hover:opacity-90 sm:text-3xl"
//           >
//             PULSEBEAT
//           </Link>
//         </header>

//         {/* Login area */}
//         <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">

//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-107.5 rounded-2xl border border-white/8 bg-[#111111] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)] sm:p-8  lg:p-9">

//             {/* Heading */}
//             <div className="mb-7">
//               <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//                 Welcome back
//               </h1>

//               <p className="mt-2 text-sm leading-6 text-[#9CA3AF] sm:text-[15px]">
//                 Log in to continue streaming your music.
//               </p>
//             </div>

//             {/* Email */}
//             <div className="mb-5">
//               <label
//                 htmlFor="email"
//                 className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-[#9CA3AF]"
//               >
//                 Email
//               </label>

//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 onChange={handleChange}
//                 className="
//                   h-12
//                   w-full
//                   rounded-xl
//                   border
//                   border-[#292929]
//                   bg-[#181818]
//                   px-4
//                   text-sm
//                   text-white
//                   outline-none
//                   placeholder:text-[#666]
//                   transition
//                   focus:border-[#1ED760]
//                   focus:ring-4
//                   focus:ring-[#1ED760]/10
//                 "
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-3">
//               <label
//                 htmlFor="password"
//                 className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-[#9CA3AF]"
//               >
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter your password"
//                   onChange={handleChange}
//                   className="
//                     h-12
//                     w-full
//                     rounded-xl
//                     border
//                     border-[#292929]
//                     bg-[#181818]
//                     px-4
//                     pr-12
//                     text-sm
//                     text-white
//                     outline-none
//                     placeholder:text-[#666]
//                     transition
//                     focus:border-[#1ED760]
//                     focus:ring-4
//                     focus:ring-[#1ED760]/10
//                   "
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword((prev) => !prev)
//                   }
//                   className="
//                     absolute
//                     right-2
//                     top-1/2
//                     flex
//                     h-9
//                     w-9
//                     -translate-y-1/2
//                     items-center
//                     justify-center
//                     rounded-lg
//                     text-[#8B8B8B]
//                     transition
//                     hover:bg-white/5
//                     hover:text-white
//                   "
//                   aria-label={
//                     showPassword
//                       ? "Hide password"
//                       : "Show password"
//                   }
//                 >
//                   {showPassword ? (
//                     <EyeOff size={19} />
//                   ) : (
//                     <Eye size={19} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Forgot password */}
//             <div className="mb-6 flex justify-end">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm font-medium text-[#1ED760] transition hover:text-[#69ed91]"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Login button */}
//             <button
//               type="submit"
//               className="
//                 h-12
//                 w-full
//                 rounded-xl
//                 bg-[#1ED760]
//                 text-sm
//                 font-bold
//                 text-black
//                 transition
//                 hover:bg-[#1fdf64]
//                 active:scale-[0.99]
//               "
//             >
//               Login
//             </button>

//             {/* Resend verification */}
//             <div className="mt-5 text-center">
//               <p className="text-sm leading-6 text-[#8F8F8F]">
//                 Didn't receive your verification email?{" "}
//                 <Link
//                   to="/resend-verification"
//                   className="font-semibold text-[#1ED760] hover:text-[#69ed91]"
//                 >
//                   Resend email
//                 </Link>
//               </p>
//             </div>

//             {/* Divider */}
//             <div className="my-7 flex items-center gap-3">
//               <div className="h-px flex-1 bg-[#292929]" />

//               <span className="text-xs font-medium text-[#666]">
//                 OR
//               </span>

//               <div className="h-px flex-1 bg-[#292929]" />
//             </div>

//             {/* Google Login */}
//             <div className="flex justify-center overflow-hidden rounded-full">
//               <GoogleLogin
//                 theme="filled_black"
//                 shape="pill"
//                 size="large"
//                 width="350"
//                 onSuccess={async (credentialResponse) => {
//                   try {
//                     if (!credentialResponse.credential) {
//                       toast.error("Google login failed");
//                       return;
//                     }

//                     const data = await googleLoginUser({
//                       token: credentialResponse.credential,
//                     });

//                     dispatch(
//                       setAuth({
//                         token: data.token,
//                         user: data.user,
//                       })
//                     );

//                     toast.success("Login successful");

//                     navigate("/");
//                   } catch (error: any) {
//                     toast.error(
//                       error?.response?.data?.message ||
//                       "Google login failed"
//                     );
//                   }
//                 }}
//                 onError={() => {
//                   toast.error("Google login failed");
//                 }}
//               />
//             </div>

//             {/* Register */}
//             <div className="mt-7 border-t border-white/6 pt-6 text-center">
//               <p className="text-sm text-[#8F8F8F]">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/register"
//                   className="font-semibold text-[#1ED760] transition hover:text-[#69ed91]"
//                 >
//                   Register here
//                 </Link>
//               </p>
//             </div>

//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLoginUser } from "../services/auth.service";
import { setAuth } from "../features/auth/authslice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

    // Prevent multiple login requests
    if (loading || googleLoading) return;

    setLoading(true);

    try {
      const data = await loginUser(formData);

      dispatch(
        setAuth({
          token: data.token,
          user: data.user,
        })
      );

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (
    credentialResponse: any
  ) => {
    if (loading || googleLoading) return;

    if (!credentialResponse.credential) {
      toast.error("Google login failed");
      return;
    }

    setGoogleLoading(true);

    try {
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
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden h-full inset-0 bg-[#090909] text-white">

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-[#1ED760]/[0.07] blur-[120px]" />

      <div className="relative flex min-h-screen flex-col">

        {/* Logo */}
        <header className="flex justify-center px-5 pt-8 sm:pt-12 lg:pt-14">
          <Link
            to="/login"
            className="text-2xl font-bold tracking-[0.18em] text-[#1ED760] transition-opacity hover:opacity-90 sm:text-3xl"
          >
            PULSEBEAT
          </Link>
        </header>

        {/* Login area */}
        <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-107.5 rounded-2xl border border-white/8 bg-[#111111] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)] sm:p-8 lg:p-9"
          >

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#9CA3AF] sm:text-[15px]">
                Log in to continue streaming your music.
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-[#9CA3AF]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading || googleLoading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#292929]
                  bg-[#181818]
                  px-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-[#666]
                  transition
                  focus:border-[#1ED760]
                  focus:ring-4
                  focus:ring-[#1ED760]/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-[#9CA3AF]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading || googleLoading}
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#292929]
                    bg-[#181818]
                    px-4
                    pr-12
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-[#666]
                    transition
                    focus:border-[#1ED760]
                    focus:ring-4
                    focus:ring-[#1ED760]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  disabled={loading || googleLoading}
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-2
                    top-1/2
                    flex
                    h-9
                    w-9
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-lg
                    text-[#8B8B8B]
                    transition
                    hover:bg-white/5
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="mb-6 flex justify-end">
              <Link
                to="/forgot-password"
                className={`text-sm font-medium text-[#1ED760] transition hover:text-[#69ed91] ${loading || googleLoading
                    ? "pointer-events-none opacity-50"
                    : ""
                  }`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="
              cursor-pointer
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#1ED760]
                text-sm
                font-bold
                text-black
                transition
                hover:bg-[#1fdf64]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:bg-[#1ED760]
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Resend verification */}
            <div className="mt-5 text-center">
              <p className="text-sm leading-6 text-[#8F8F8F]">
                Didn't receive your verification email?{" "}
                <Link
                  to="/resend-verification"
                  className={`font-semibold text-[#1ED760] hover:text-[#69ed91] ${loading || googleLoading
                      ? "pointer-events-none opacity-50"
                      : ""
                    }`}
                >
                  Resend email
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#292929]" />

              <span className="text-xs font-medium text-[#666]">
                OR
              </span>

              <div className="h-px flex-1 bg-[#292929]" />
            </div>

            {/* Google Login */}
            <div
              className={`flex justify-center overflow-hidden rounded-full ${loading || googleLoading
                  ? "pointer-events-none opacity-50"
                  : ""
                }`}
            >
              <GoogleLogin
                theme="filled_black"
                shape="pill"
                size="large"
                width="350"
                onSuccess={handleGoogleLogin}
                onError={() => {
                  setGoogleLoading(false);
                  toast.error("Google login failed");
                }}
              />
            </div>

            {/* Register */}
            <div className="mt-7 border-t border-white/6 pt-6 text-center">
              <p className="text-sm text-[#8F8F8F]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className={`font-semibold text-[#1ED760] transition hover:text-[#69ed91] ${loading || googleLoading
                      ? "pointer-events-none opacity-50"
                      : ""
                    }`}
                >
                  Register here
                </Link>
              </p>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
