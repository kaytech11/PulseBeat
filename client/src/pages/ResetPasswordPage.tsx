// import { useState } from "react";
// import {
//   Link,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   Eye,
//   EyeOff,
//   LockKeyhole,
//   Music2,
// } from "lucide-react";
// import { resetPassword } from "../services/auth.service";

// const ResetPasswordPage = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const token = searchParams.get("token");

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   const [showPassword, setShowPassword] =
//     useState(false);

//   const [
//     showConfirmPassword,
//     setShowConfirmPassword,
//   ] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (!token) {
//       toast.error("Invalid or missing reset token");
//       return;
//     }

//     if (!password || !confirmPassword) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await resetPassword(
//         token,
//         password,
//         confirmPassword
//       );

//       toast.success(
//         data.message ||
//           "Password reset successfully"
//       );

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (error: any) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to reset password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#090909] text-white flex items-center justify-center px-4 py-8">
//       {/* Ambient background glow */}
//       <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#1ED760]/10 rounded-full blur-3xl pointer-events-none" />

//       <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#1ED760]/5 rounded-full blur-3xl pointer-events-none" />

//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo */}
//         <div className="flex items-center justify-center gap-2 mb-8">
//           <div className="w-10 h-10 rounded-full bg-[#1ED760] flex items-center justify-center">
//             <Music2 className="w-5 h-5 text-black" />
//           </div>

//           <span className="text-2xl font-bold tracking-tight">
//             Pulse<span className="text-[#1ED760]">Beat</span>
//           </span>
//         </div>

//         {/* Card */}
//         <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl">
//           {/* Icon */}
//           <div className="w-14 h-14 rounded-full bg-[#1ED760]/10 flex items-center justify-center mb-6">
//             <LockKeyhole className="w-7 h-7 text-[#1ED760]" />
//           </div>

//           {/* Heading */}
//           <div className="mb-7">
//             <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//               Reset Password
//             </h1>

//             <p className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
//               Create a new password for your PulseBeat
//               account.
//             </p>
//           </div>

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >
//             {/* New Password */}
//             <div>
//               <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
//                 New Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={
//                     showPassword
//                       ? "text"
//                       : "password"
//                   }
//                   value={password}
//                   onChange={(e) =>
//                     setPassword(e.target.value)
//                   }
//                   placeholder="Create a new password"
//                   autoComplete="new-password"
//                   disabled={loading}
//                   className="w-full rounded-xl border border-white/[0.08] bg-[#181818] py-3.5 pl-4 pr-12 text-sm sm:text-base text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-[#1ED760]/60 focus:ring-4 focus:ring-[#1ED760]/10 disabled:opacity-60"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(
//                       (prev) => !prev
//                     )
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white"
//                   aria-label={
//                     showPassword
//                       ? "Hide password"
//                       : "Show password"
//                   }
//                 >
//                   {showPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
//                 Confirm Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={
//                     showConfirmPassword
//                       ? "text"
//                       : "password"
//                   }
//                   value={confirmPassword}
//                   onChange={(e) =>
//                     setConfirmPassword(
//                       e.target.value
//                     )
//                   }
//                   placeholder="Repeat your new password"
//                   autoComplete="new-password"
//                   disabled={loading}
//                   className="w-full rounded-xl border border-white/[0.08] bg-[#181818] py-3.5 pl-4 pr-12 text-sm sm:text-base text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-[#1ED760]/60 focus:ring-4 focus:ring-[#1ED760]/10 disabled:opacity-60"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowConfirmPassword(
//                       (prev) => !prev
//                     )
//                   }
//                   className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white"
//                   aria-label={
//                     showConfirmPassword
//                       ? "Hide confirm password"
//                       : "Show confirm password"
//                   }
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={20} />
//                   ) : (
//                     <Eye size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-full bg-[#1ED760] py-3.5 text-sm sm:text-base font-bold text-black transition-all duration-200 hover:bg-[#1fdf64] hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#145c2d] disabled:text-gray-400"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
//                   Resetting...
//                 </span>
//               ) : (
//                 "Reset Password"
//               )}
//             </button>
//           </form>

//           {/* Back to login */}
//           <div className="text-center mt-7 pt-6 border-t border-white/[0.06]">
//             <Link
//               to="/login"
//               className="text-sm font-semibold text-[#1ED760] hover:text-[#1fdf64] transition-colors"
//             >
//               Back to Login
//             </Link>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-gray-600 mt-6">
//           © PulseBeat. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordPage;


import { useState } from "react";
import {Link,useNavigate,useSearchParams,} from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, LockKeyhole, Music2, Loader2, CheckCircle2, } from "lucide-react";
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (loading) return;

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

      setSuccess(true);

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

  const isBusy = loading || success;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#090909] text-white flex items-center justify-center px-4 py-8 sm:py-10">
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#1ED760]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#1ED760]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-7 sm:mb-8">
          <div className="w-10 h-10 rounded-full bg-[#1ED760] flex items-center justify-center shadow-[0_0_25px_rgba(30,215,96,0.15)]">
            <Music2 className="w-5 h-5 text-black" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Pulse<span className="text-[#1ED760]">
              Beat
            </span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all ${success
                ? "bg-[#1ED760]/10"
                : "bg-[#1ED760]/10"
              }`}
          >
            {success ? (
              <CheckCircle2 className="w-7 h-7 text-[#1ED760]" />
            ) : loading ? (
              <Loader2 className="w-7 h-7 text-[#1ED760] animate-spin" />
            ) : (
              <LockKeyhole className="w-7 h-7 text-[#1ED760]" />
            )}
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {success
                ? "Password Reset!"
                : "Reset Password"}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
              {success
                ? "Your password has been updated successfully. You will be redirected to login shortly."
                : "Create a new password for your PulseBeat account."}
            </p>
          </div>

          {/* Success state */}
          {success ? (
            <div className="rounded-xl border border-[#1ED760]/20 bg-[#1ED760]/[0.07] p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1ED760] flex-shrink-0" />

                <p className="text-sm text-green-300">
                  Password updated successfully.
                </p>
              </div>

              <div className="mt-4 h-1 w-full bg-[#242424] rounded-full overflow-hidden">
                <div className="h-full w-full bg-[#1ED760] rounded-full animate-pulse" />
              </div>

              <p className="mt-3 text-xs text-gray-500 text-center">
                Redirecting to login...
              </p>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* New Password */}
              <div>
                <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
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
                    disabled={isBusy}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#181818] py-3.5 pl-4 pr-12 text-sm sm:text-base text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-[#1ED760]/60 focus:ring-4 focus:ring-[#1ED760]/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  />

                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
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
              <div>
                <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
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
                    disabled={isBusy}
                    className="w-full rounded-xl border border-white/[0.08] bg-[#181818] py-3.5 pl-4 pr-12 text-sm sm:text-base text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-[#1ED760]/60 focus:ring-4 focus:ring-[#1ED760]/10 disabled:opacity-60 disabled:cursor-not-allowed"
                  />

                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isBusy}
                className="w-full rounded-full bg-[#1ED760] py-3.5 text-sm sm:text-base font-bold text-black transition-all duration-200 hover:bg-[#1fdf64] hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#145c2d] disabled:text-gray-400 disabled:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          {/* Back to login */}
          {!success && (
            <div className="text-center mt-7 pt-6 border-t border-white/[0.06]">
              <Link
                to="/login"
                className={`text-sm font-semibold text-[#1ED760] hover:text-[#1fdf64] transition-colors ${loading
                    ? "pointer-events-none opacity-50"
                    : ""
                  }`}
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          © PulseBeat. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;


