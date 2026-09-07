// import { useState } from "react";
// import { registerUser, googleRegisterUser } from "../services/auth.service";
// import { useDispatch } from "react-redux";
// import { setAuth } from "../features/auth/authslice";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { GoogleLogin } from "@react-oauth/google";
// import { Eye, EyeOff } from "lucide-react";

// const RegisterPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();



//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "LISTENER",
//   });

//   const [googleToken, setGoogleToken] = useState("");
//   const [showRoleModal, setShowRoleModal] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

//     if (
//       formData.password !==
//       formData.confirmPassword
//     ) {

//       toast.error("Passwords do not match");
//       return;
//     }

//     try {

//       console.log("Submitting...");

//       const data = await registerUser(
//         formData
//       );

//       console.log(data);

//       toast.success("Registration successful. please check your email to verify your account.");

//       navigate("/login")

//       // dispatch(
//       //   setAuth({
//       //     token: data.token,
//       //     user: data.user,
//       //   })
//       // );

//       // alert("Registration successful");
//       // toast.success("Registration successful");

//       // navigate("/");

//     } catch (error: any) {

//       console.log(error);

//       toast.error(
//         error?.response?.data?.message ||
//         "Registration failed"
//       );
//     }
//   };

//   const handleGoogleRegister = async () => {
//     try {
//       const data = await googleRegisterUser({
//         token: googleToken,
//         role: formData.role,
//       });

//       dispatch(
//         setAuth({
//           token: data.token,
//           user: data.user,
//         })
//       );

//       toast.success("Registration successful");

//       navigate("/");
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//         "Google registration failed"
//       );
//     }
//   };

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

//       {/* Form Container */}
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
//               Create Account
//             </h1>

//             <p
//               className="mt-2 text-sm sm:text-base"
//               style={{
//                 color: "#94a3b8",
//               }}
//             >
//               Start streaming your favorite music.
//             </p>
//           </div>

//           {/* Username */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <label
//               style={{
//                 fontSize: "0.78rem",
//                 color: "#94a3b8",
//                 letterSpacing: "0.06em",
//                 textTransform: "uppercase",
//               }}
//             >
//               Username
//             </label>

//             <input
//               type="text"
//               name="username"
//               placeholder="Enter your username"
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

//           {/* Email */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
//                 placeholder="Create a password"
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

//           {/* Confirm Password */}

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
//               Confirm Password
//             </label>

//             <div className="relative">
//               <input
//                 type={
//                   showConfirmPassword
//                     ? "text"
//                     : "password"
//                 }
//                 name="confirmPassword"
//                 placeholder="Repeat your password"
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
//                   setShowConfirmPassword(
//                     (prev) => !prev
//                   )
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
//                   showConfirmPassword
//                     ? "Hide confirm password"
//                     : "Show confirm password"
//                 }
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff size={20} />
//                 ) : (
//                   <Eye size={20} />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Role */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <label
//               style={{
//                 fontSize: "0.78rem",
//                 color: "#94a3b8",
//                 letterSpacing: "0.06em",
//                 textTransform: "uppercase",
//               }}
//             >
//               I am a...
//             </label>

//             <select
//               name="role"
//               onChange={handleChange}
//               style={{
//                 background: "#1c2128",
//                 border: "1px solid #2a313c",
//                 borderRadius: "12px",
//                 padding: "0.9rem 1rem",
//                 color: "#f8fafc",
//                 fontSize: "0.95rem",
//                 outline: "none",
//                 cursor: "pointer",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = "#22c55e";
//                 e.target.style.boxShadow =
//                   "0 0 0 3px rgba(34,197,94,0.15)";
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = "#22c55e";
//                 e.target.style.boxShadow = "none";
//               }}
//             >
//               <option value="LISTENER">Listener</option>
//               <option value="ARTIST">Artist</option>
//             </select>
//           </div>

//           {/* Button */}
//           <button className="w-full"
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
//             Register
//           </button>

//           <div className="flex items-center my-2">
//             <div className="flex-1 h-px bg-[#2a313c]" />
//             <span className="px-3 text-sm text-gray-400">
//               OR
//             </span>
//             <div className="flex-1 h-px bg-[#2a313c]" />
//           </div>

//           {/* <GoogleLogin
//             theme="filled_black"
//             shape="pill"
//             size="large"
//             width="350"
//             onSuccess={async (credentialResponse) => {
//               try {
//                 const data = await googleRegisterUser({
//                   token: credentialResponse.credential!,
//                   role: formData.role,
//                 });

//                 dispatch(
//                   setAuth({
//                     token: data.token,
//                     user: data.user,
//                   })
//                 );

//                 toast.success("Registration successful");

//                 navigate("/");
//               } catch (error: any) {
//                 toast.error(
//                   error?.response?.data?.message ||
//                   "Google registration failed"
//                 );
//               }
//             }}
//             onError={() => {
//               toast.error("Google Sign-In failed");
//             }}
//           /> */}

//           <GoogleLogin
//             theme="filled_black"
//             shape="pill"
//             size="large"
//             width="350"
//             onSuccess={(credentialResponse) => {
//               setGoogleToken(credentialResponse.credential!);
//               setShowRoleModal(true);
//             }}
//             onError={() => {
//               toast.error("Google Sign-In failed");
//             }}
//           />

//           {/* Footer */}
//           <div className="text-center mt-2 px-2">
//             <p
//               style={{
//                 color: "#94a3b8",
//                 fontSize: "0.92rem",
//               }}
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 style={{
//                   color: "#22c55e",
//                   fontWeight: 600,
//                 }}
//               >
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//       {showRoleModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-[#161b22] w-[90%] max-w-md rounded-2xl p-6">

//             <h2 className="text-2xl font-semibold text-white mb-2">
//               Continue as
//             </h2>

//             <p className="text-gray-400 mb-6">
//               Select how you want to use PulseBeat.
//             </p>

//             <div className="space-y-4">

//               <button
//                 className={`w-full p-4 text-white rounded-xl border ${formData.role === "LISTENER"
//                   ? "border-green-500"
//                   : "border-[#2a313c]"
//                   }`}
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     role: "LISTENER",
//                   })
//                 }
//               >
//                 Listener
//               </button>

//               <button
//                 className={`w-full p-4 text-white rounded-xl border ${formData.role === "ARTIST"
//                   ? "border-green-500"
//                   : "border-[#2a313c]"
//                   }`}
//                 onClick={() =>
//                   setFormData({
//                     ...formData,
//                     role: "ARTIST",
//                   })
//                 }
//               >
//                 Artist
//               </button>

//             </div>

//             <button
//               onClick={handleGoogleRegister}
//               className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 font-semibold"
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegisterPage;



import { useState } from "react";
import {registerUser,googleRegisterUser,} from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authslice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import {Eye,EyeOff,Loader2,} from "lucide-react";

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

  const [googleToken, setGoogleToken] = useState("");
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    // Prevent duplicate requests
    if (loading || googleLoading) return;

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("Submitting...");

      const data = await registerUser(formData);

      console.log(data);

      toast.success(
        "Registration successful. please check your email to verify your account."
      );

      navigate("/login");
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (loading || googleLoading) return;

    if (!googleToken) {
      toast.error("Google registration failed");
      return;
    }

    setGoogleLoading(true);

    try {
      const data = await googleRegisterUser({
        token: googleToken,
        role: formData.role,
      });

      dispatch(
        setAuth({
          token: data.token,
          user: data.user,
        })
      );

      toast.success("Registration successful");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Google registration failed"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const isBusy = loading || googleLoading;

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

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-[400px] sm:p-10"
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
          <div>
            <h1
              className="text-2xl sm:text-3xl font-semibold"
              style={{
                color: "#f8fafc",
              }}
            >
              Create Account
            </h1>

            <p
              className="mt-2 text-sm sm:text-base"
              style={{
                color: "#94a3b8",
              }}
            >
              Start streaming your favorite music.
            </p>
          </div>

          {/* Username */}
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
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              disabled={isBusy}
              style={{
                background: "#1c2128",
                border: "1px solid #2a313c",
                borderRadius: "12px",
                padding: "0.9rem 1rem",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
                opacity: isBusy ? 0.6 : 1,
                cursor: isBusy
                  ? "not-allowed"
                  : "text",
              }}
              onFocus={(e) => {
                if (isBusy) return;

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
              value={formData.email}
              onChange={handleChange}
              disabled={isBusy}
              style={{
                background: "#1c2128",
                border: "1px solid #2a313c",
                borderRadius: "12px",
                padding: "0.9rem 1rem",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
                opacity: isBusy ? 0.6 : 1,
                cursor: isBusy
                  ? "not-allowed"
                  : "text",
              }}
              onFocus={(e) => {
                if (isBusy) return;

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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={isBusy}
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
                  opacity: isBusy ? 0.6 : 1,
                  cursor: isBusy
                    ? "not-allowed"
                    : "text",
                }}
                onFocus={(e) => {
                  if (isBusy) return;

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

              <button
                type="button"
                disabled={isBusy}
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
                  padding: "4px",
                  cursor: isBusy
                    ? "not-allowed"
                    : "pointer",
                  opacity: isBusy ? 0.5 : 1,
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
                name="confirmPassword"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isBusy}
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
                  opacity: isBusy ? 0.6 : 1,
                  cursor: isBusy
                    ? "not-allowed"
                    : "text",
                }}
                onFocus={(e) => {
                  if (isBusy) return;

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

              <button
                type="button"
                disabled={isBusy}
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
                  padding: "4px",
                  cursor: isBusy
                    ? "not-allowed"
                    : "pointer",
                  opacity: isBusy ? 0.5 : 1,
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

          {/* Role */}
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
              I am a...
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isBusy}
              style={{
                background: "#1c2128",
                border: "1px solid #2a313c",
                borderRadius: "12px",
                padding: "0.9rem 1rem",
                color: "#f8fafc",
                fontSize: "0.95rem",
                outline: "none",
                cursor: isBusy
                  ? "not-allowed"
                  : "pointer",
                opacity: isBusy ? 0.6 : 1,
              }}
              onFocus={(e) => {
                if (isBusy) return;

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
            >
              <option value="LISTENER">
                Listener
              </option>

              <option value="ARTIST">
                Artist
              </option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isBusy}
            className="w-full flex items-center justify-center gap-2"
            style={{
              background: isBusy
                ? "#15803d"
                : "#22c55e",
              border: "none",
              borderRadius: "12px",
              padding: "0.95rem",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: isBusy
                ? "not-allowed"
                : "pointer",
              transition: "0.2s ease",
              marginTop: "0.5rem",
              opacity: isBusy ? 0.75 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isBusy) {
                e.currentTarget.style.background =
                  "#16a34a";
              }
            }}
            onMouseLeave={(e) => {
              if (!isBusy) {
                e.currentTarget.style.background =
                  "#22c55e";
              }
            }}
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-[#2a313c]" />

            <span className="px-3 text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-[#2a313c]" />
          </div>

          {/* Google Registration */}
          <div
            className={`flex justify-center overflow-hidden rounded-full ${
              isBusy
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <GoogleLogin
              theme="filled_black"
              shape="pill"
              size="large"
              width="350"
              onSuccess={(credentialResponse) => {
                if (loading || googleLoading) return;

                if (!credentialResponse.credential) {
                  toast.error(
                    "Google registration failed"
                  );
                  return;
                }

                setGoogleToken(
                  credentialResponse.credential
                );

                setShowRoleModal(true);
              }}
              onError={() => {
                setGoogleLoading(false);
                toast.error(
                  "Google Sign-In failed"
                );
              }}
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-2 px-2">
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.92rem",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className={
                  isBusy
                    ? "pointer-events-none opacity-50"
                    : ""
                }
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

      {/* Google Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#161b22] w-full max-w-md rounded-2xl p-6 border border-[#2a313c]">

            <h2 className="text-2xl font-semibold text-white mb-2">
              Continue as
            </h2>

            <p className="text-gray-400 mb-6">
              Select how you want to use PulseBeat.
            </p>

            <div className="space-y-4">

              {/* Listener */}
              <button
                type="button"
                disabled={googleLoading}
                className={`w-full p-4 text-white rounded-xl border transition ${
                  formData.role === "LISTENER"
                    ? "border-green-500 bg-green-500/5"
                    : "border-[#2a313c]"
                } ${
                  googleLoading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:border-green-500"
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "LISTENER",
                  })
                }
              >
                Listener
              </button>

              {/* Artist */}
              <button
                type="button"
                disabled={googleLoading}
                className={`w-full p-4 text-white rounded-xl border transition ${
                  formData.role === "ARTIST"
                    ? "border-green-500 bg-green-500/5"
                    : "border-[#2a313c]"
                } ${
                  googleLoading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:border-green-500"
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: "ARTIST",
                  })
                }
              >
                Artist
              </button>

            </div>

            {/* Continue */}
            <button
              type="button"
              disabled={googleLoading}
              onClick={handleGoogleRegister}
              className="
                w-full
                mt-6
                rounded-xl
                py-3
                font-semibold
                text-white
                flex
                items-center
                justify-center
                gap-2
                transition
                bg-green-500
                hover:bg-green-600
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {googleLoading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Creating account...
                </>
              ) : (
                "Continue"
              )}
            </button>

            {/* Cancel */}
            {!googleLoading && (
              <button
                type="button"
                onClick={() =>
                  setShowRoleModal(false)
                }
                className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

