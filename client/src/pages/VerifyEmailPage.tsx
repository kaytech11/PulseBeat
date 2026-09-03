// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios, {AxiosError} from "axios";

// const VerifyEmailPage = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//    const verifyStarted = useRef(false)
   
//   const [message, setMessage] = useState("Verifying your email...");
//   const [error, setError] = useState(false);

 

//   useEffect(() => {

//     if (verifyStarted.current) return;

//     verifyStarted.current = true;

//     const token = searchParams.get("token");

//     if (!token) {
//       setMessage("Verification token is missing.");
//       setError(true);
//       return;
//     }

//     const verifyEmail = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`
//         );

//         setMessage(response.data.message);
//         setError(false);

//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } catch (error) {
//         console.error(error);

//         if (error instanceof AxiosError) {
//           setMessage(
//             error.response?.data?.message ||
//             "Email verification failed. Please try again."
//           );
//         } else {
//           setMessage("Email verification failed. please try again.");
//         }
//         setError(true);
//       }
//     };

//     verifyEmail();
//   }, [searchParams, navigate]);

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
//       <div className="bg-[#121212] p-8 rounded-xl w-full max-w-md text-center">

//         <h1 className="text-2xl font-bold mb-4">
//           Email Verification
//         </h1>

//         <p className={error ? "text-red-400" : "text-gray-300"}>
//           {message}
//         </p>

//         {!error && (
//           <p className="text-sm text-gray-500 mt-4">
//             Redirecting you to login...
//           </p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default VerifyEmailPage;



import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CheckCircle2, AlertCircle, Loader2, Music2 } from "lucide-react";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const verifyStarted = useRef(false);

  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (verifyStarted.current) return;

    verifyStarted.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setMessage("Verification token is missing.");
      setError(true);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`
        );

        setMessage(response.data.message);
        setError(false);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          setMessage(
            error.response?.data?.message ||
              "Email verification failed. Please try again."
          );
        } else {
          setMessage("Email verification failed. please try again.");
        }

        setError(true);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

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

        {/* Verification card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
          {/* Status icon */}
          <div
            className={`mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center ${
              error ? "bg-red-500/10" : "bg-[#1ED760]/10"
            }`}
          >
            {error ? (
              <AlertCircle className="w-8 h-8 text-red-400" />
            ) : message === "Verifying your email..." ? (
              <Loader2 className="w-8 h-8 text-[#1ED760] animate-spin" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-[#1ED760]" />
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            {error ? "Verification Failed" : "Email Verification"}
          </h1>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              error ? "text-red-400" : "text-gray-300"
            }`}
          >
            {message}
          </p>

          {!error && (
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <p className="text-sm text-gray-500">
                Redirecting you to login...
              </p>

              <div className="mt-3 h-1 w-full bg-[#242424] rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-[#1ED760] rounded-full animate-pulse" />
              </div>
            </div>
          )}

          {error && (
            <button
              onClick={() => navigate("/login")}
              className="mt-7 w-full bg-[#1ED760] hover:bg-[#1fdf64] text-black font-semibold py-3 rounded-full transition-all duration-200 active:scale-[0.98]"
            >
              Back to Login
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          © PulseBeat. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;