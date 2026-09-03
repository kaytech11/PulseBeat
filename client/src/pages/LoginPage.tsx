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

//       dispatch(setAuth({
//         token: data.token,
//         user: data.user,
//       }

//       ));

//       // alert("Login successful");
//       toast.success("Login successful");

//       navigate("/");
//     } catch (error: any) {
//       console.log(error);

//       toast.error(
//         error?.response?.data?.message ||
//         "Login failed"
//       )
//     }
//   };

//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div
//       className="min-h-screen flex flex-col"
//       style={{
//         background: "#0f1115",
//       }}
//     >
//       {/* Logo */}
//       <div>
//         <h1
//           className="flex justify-center items-center py-10 sm:py-16 font-semibold font-serif text-3xl sm:text-4xl"
//           style={{
//             color: "#22c55e",
//             letterSpacing: "0.18em",
//             textShadow: "0 0 20px rgba(34,197,94,0.15)",
//           }}
//         >
//           PULSEBEAT
//         </h1>
//       </div>

//       {/* Login Container */}
//       <div className="flex-1 flex items-center justify-center px-4">
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-5 w-full max-w-[400px] sm:p-10"
//           style={{
//             background: "#161b22",
//             border: "1px solid #2a313c",
//             borderRadius: "20px",
//             padding: "1.5rem",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
//           }}
//         >
//           {/* Heading */}
//           <div>
//             <h1
//               className="text-2xl sm:text-3xl font-semibold"
//               style={{
//                 color: "#f8fafc",
//               }}
//             >
//               Welcome Back
//             </h1>

//             <p
//               className="mt-2 text-sm sm:text-base"
//               style={{
//                 color: "#94a3b8",
//               }}
//             >
//               Login to continue streaming your music.
//             </p>
//           </div>

//           {/* Email */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "6px",
//             }}
//           >
//             <label
//               style={{
//                 fontSize: "0.78rem",
//                 color: "#94a3b8",
//                 letterSpacing: "0.06em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               onChange={handleChange}
//               style={{
//                 background: "#1c2128",
//                 border: "1px solid #2a313c",
//                 borderRadius: "12px",
//                 padding: "0.9rem 1rem",
//                 color: "#f8fafc",
//                 fontSize: "0.95rem",
//                 outline: "none",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = "#22c55e";
//                 e.target.style.boxShadow =
//                   "0 0 0 3px rgba(34,197,94,0.15)";
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = "#2a313c";
//                 e.target.style.boxShadow = "none";
//               }}
//             />
//           </div>

//           {/* Password */}
          
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "6px",
//             }}
//           >
//             <label
//               style={{
//                 fontSize: "0.78rem",
//                 color: "#94a3b8",
//                 letterSpacing: "0.06em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 onChange={handleChange}
//                 className="w-full"
//                 style={{
//                   background: "#1c2128",
//                   border: "1px solid #2a313c",
//                   borderRadius: "12px",
//                   padding: "0.9rem 3rem 0.9rem 1rem",
//                   color: "#f8fafc",
//                   fontSize: "0.95rem",
//                   outline: "none",
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = "#22c55e";
//                   e.target.style.boxShadow =
//                     "0 0 0 3px rgba(34,197,94,0.15)";
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = "#2a313c";
//                   e.target.style.boxShadow = "none";
//                 }}
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword((prev) => !prev)
//                 }
//                 className="absolute right-3 top-1/2 -translate-y-1/2"
//                 style={{
//                   color: "#94a3b8",
//                   background: "transparent",
//                   border: "none",
//                   padding: "4px",
//                   cursor: "pointer",
//                 }}
//                 aria-label={
//                   showPassword
//                     ? "Hide password"
//                     : "Show password"
//                 }
//               >
//                 {showPassword ? (
//                   <EyeOff size={20} />
//                 ) : (
//                   <Eye size={20} />
//                 )}
//               </button>
//             </div>
//           </div>

//             {/* forgot password */}

//           <div className="flex justify-end -mt-2">
//             <Link
//               to="/forgot-password"
//               style={{
//                 color: "#22c55e",
//                 fontSize: "0.88rem",
//                 fontWeight: 500,
//               }}
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* Button */}
//           <button
//             className="w-full"
//             type="submit"
//             style={{
//               background: "#22c55e",
//               border: "none",
//               borderRadius: "12px",
//               padding: "0.95rem",
//               color: "#ffffff",
//               fontSize: "1rem",
//               fontWeight: 600,
//               cursor: "pointer",
//               transition: "0.2s ease",
//               marginTop: "0.5rem",
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = "#16a34a";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = "#22c55e";
//             }}
//           >
//             Login
//           </button>

//           {/* Resend verification */}
//           <div className="text-center">
//             <p
//               style={{
//                 color: "#94a3b8",
//                 fontSize: "0.9rem",
//               }}
//             >
//               Didn't receive your verification email?{" "}
//               <Link
//                 to="/resend-verification"
//                 style={{
//                   color: "#22c55e",
//                   fontWeight: 600,
//                 }}
//               >
//                 Resend email
//               </Link>
//             </p>
//           </div>

//           {/* Divider */}
//           {/* <div
//             style={{
//               height: "1px",
//               background: "#2a313c",
//               marginTop: "0.25rem",
//             }}
//           /> */}

//           {/* Divider */}
//           <div className="flex items-center my-2">
//             <div className="flex-1 h-px bg-[#2a313c]" />
//             <span className="px-3 text-sm text-gray-400">
//               OR
//             </span>
//             <div className="flex-1 h-px bg-[#2a313c]" />
//           </div>

//           {/* <div className="flex justify-center"> */}
//           {/* <GoogleLogin
//               onSuccess={(credentialResponse) => {
//                 console.log(credentialResponse);
//               }}
//               onError={() => {
//                 toast.error("Google login failed");
//               }}
//             /> */}
//           <GoogleLogin
//             theme="filled_black"
//             shape="pill"
//             size="large"
//             width="350"
//             onSuccess={async (credentialResponse) => {
//               try {
//                 if (!credentialResponse.credential) {
//                   toast.error("Google login failed");
//                   return;
//                 }

//                 const data = await googleLoginUser({
//                   token: credentialResponse.credential,
//                 });

//                 dispatch(
//                   setAuth({
//                     token: data.token,
//                     user: data.user,
//                   })
//                 );

//                 toast.success("Login successful");

//                 navigate("/");
//               } catch (error: any) {
//                 toast.error(
//                   error?.response?.data?.message ||
//                   "Google login failed"
//                 );
//               }
//             }}
//             onError={() => {
//               toast.error("Google login failed");
//             }}
//           />


//           {/* Footer */}
//           <div className="text-center px-2">
//             <p
//               style={{
//                 color: "#94a3b8",
//                 fontSize: "0.92rem",
//               }}
//             >
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 style={{
//                   color: "#22c55e",
//                   fontWeight: 600,
//                 }}
//               >
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </form>
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
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden h-full inset-0 bg-[#090909] text-white">

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-80 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#1ED760]/[0.07] blur-[120px]" />

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
            className="w-full max-w-[430px] rounded-2xl border border-white/[0.08] bg-[#111111] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)] sm:p-8  lg:p-9">

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
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  "
                />

                <button
                  type="button"
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
                    hover:bg-white/[0.05]
                    hover:text-white
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
                className="text-sm font-medium text-[#1ED760] transition hover:text-[#69ed91]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="
                h-12
                w-full
                rounded-xl
                bg-[#1ED760]
                text-sm
                font-bold
                text-black
                transition
                hover:bg-[#1fdf64]
                active:scale-[0.99]
              "
            >
              Login
            </button>

            {/* Resend verification */}
            <div className="mt-5 text-center">
              <p className="text-sm leading-6 text-[#8F8F8F]">
                Didn't receive your verification email?{" "}
                <Link
                  to="/resend-verification"
                  className="font-semibold text-[#1ED760] hover:text-[#69ed91]"
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
            <div className="flex justify-center overflow-hidden rounded-full">
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
            </div>

            {/* Register */}
            <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
              <p className="text-sm text-[#8F8F8F]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#1ED760] transition hover:text-[#69ed91]"
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