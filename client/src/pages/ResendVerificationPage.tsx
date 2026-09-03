// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { resendVerificationEmail } from "../services/auth.service";

// const ResendVerificationPage = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       toast.error("Please enter your email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       setSent(false);

//       const data = await resendVerificationEmail(
//         email.trim()
//       );

//       setSent(true);

//       toast.success(
//         data.message ||
//         "Verification email sent successfully"
//       );
//     } catch (error: any) {
//       console.error(error);

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to resend verification email"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

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
//             textShadow:
//               "0 0 20px rgba(34,197,94,0.15)",
//           }}
//         >
//           PULSEBEAT
//         </h1>
//       </div>

//       {/* Content */}
//       <div className="flex-1 flex items-center justify-center px-4">
//         <div
//           className="w-full max-w-[400px]"
//           style={{
//             background: "#161b22",
//             border: "1px solid #2a313c",
//             borderRadius: "20px",
//             padding: "1.5rem",
//             boxShadow:
//               "0 10px 30px rgba(0,0,0,0.25)",
//           }}
//         >
//           {/* Heading */}
//           <div className="mb-7">
//             <h1
//               className="text-2xl sm:text-3xl font-semibold"
//               style={{
//                 color: "#f8fafc",
//               }}
//             >
//               Resend Verification
//             </h1>

//             <p
//               className="mt-2 text-sm sm:text-base"
//               style={{
//                 color: "#94a3b8",
//               }}
//             >
//               Didn't receive your verification email?
//               Enter the email you used to create your
//               PulseBeat account and we'll send you a new
//               verification link.
//             </p>
//           </div>

//           {/* Success message */}
//           {sent && (
//             <div
//               className="mb-5 rounded-xl p-4"
//               style={{
//                 background:
//                   "rgba(34,197,94,0.08)",
//                 border:
//                   "1px solid rgba(34,197,94,0.25)",
//               }}
//             >
//               <p
//                 className="text-sm"
//                 style={{
//                   color: "#86efac",
//                 }}
//               >
//                 Verification email sent successfully.
//                 Please check your inbox and spam folder.
//               </p>
//             </div>
//           )}

//           {/* Form */}
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-5"
//           >
//             {/* Email */}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "6px",
//               }}
//             >
//               <label
//                 style={{
//                   fontSize: "0.78rem",
//                   color: "#94a3b8",
//                   letterSpacing: "0.06em",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Email
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(e.target.value)
//                 }
//                 placeholder="you@example.com"
//                 autoComplete="email"
//                 disabled={loading}
//                 style={{
//                   background: "#1c2128",
//                   border: "1px solid #2a313c",
//                   borderRadius: "12px",
//                   padding: "0.9rem 1rem",
//                   color: "#f8fafc",
//                   fontSize: "0.95rem",
//                   outline: "none",
//                   opacity: loading ? 0.7 : 1,
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor =
//                     "#22c55e";
//                   e.target.style.boxShadow =
//                     "0 0 0 3px rgba(34,197,94,0.15)";
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor =
//                     "#2a313c";
//                   e.target.style.boxShadow = "none";
//                 }}
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full"
//               style={{
//                 background: loading
//                   ? "#166534"
//                   : "#22c55e",
//                 border: "none",
//                 borderRadius: "12px",
//                 padding: "0.95rem",
//                 color: "#ffffff",
//                 fontSize: "1rem",
//                 fontWeight: 600,
//                 cursor: loading
//                   ? "not-allowed"
//                   : "pointer",
//                 transition: "0.2s ease",
//                 marginTop: "0.5rem",
//               }}
//             >
//               {loading
//                 ? "Sending..."
//                 : "Resend Verification Email"}
//             </button>
//           </form>

//           {/* Back to login */}
//           <div className="text-center mt-6">
//             <Link
//               to="/login"
//               style={{
//                 color: "#22c55e",
//                 fontWeight: 600,
//                 fontSize: "0.92rem",
//               }}
//             >
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResendVerificationPage;



import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Music2, CheckCircle2 } from "lucide-react";
import { resendVerificationEmail } from "../services/auth.service";

const ResendVerificationPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setSent(false);

      const data = await resendVerificationEmail(email.trim());

      setSent(true);

      toast.success(
        data.message || "Verification email sent successfully"
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
    <div className="relative min-h-screen overflow-hidden bg-[#090909] text-white flex items-center justify-center px-4 py-8">
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#1ED760]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#1ED760]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#1ED760] flex items-center justify-center">
            <Music2 className="w-5 h-5 text-black" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Pulse<span className="text-[#1ED760]">Beat</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-[#1ED760]/10 flex items-center justify-center mb-6">
            <Mail className="w-7 h-7 text-[#1ED760]" />
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Resend Verification
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-400 leading-relaxed">
              Didn't receive your verification email? Enter the
              email you used to create your PulseBeat account and
              we'll send you a new verification link.
            </p>
          </div>

          {/* Success message */}
          {sent && (
            <div className="mb-6 rounded-xl border border-[#1ED760]/20 bg-[#1ED760]/[0.07] p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#1ED760] flex-shrink-0 mt-0.5" />

                <p className="text-sm text-green-300 leading-relaxed">
                  Verification email sent successfully. Please
                  check your inbox and spam folder.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#181818] py-3.5 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-gray-600 outline-none transition-all duration-200 focus:border-[#1ED760]/60 focus:ring-4 focus:ring-[#1ED760]/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1ED760] py-3.5 text-sm sm:text-base font-bold text-black transition-all duration-200 hover:bg-[#1fdf64] hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#145c2d] disabled:text-gray-400"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  Sending...
                </span>
              ) : (
                "Resend Verification Email"
              )}
            </button>
          </form>

          {/* Back to login */}
          <div className="text-center mt-7 pt-6 border-t border-white/[0.06]">
            <Link
              to="/login"
              className="text-sm font-semibold text-[#1ED760] hover:text-[#1fdf64] transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          © PulseBeat. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ResendVerificationPage;
