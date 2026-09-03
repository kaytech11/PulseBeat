import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios, {AxiosError} from "axios";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

   const verifyStarted = useRef(false)
   
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-[#121212] p-8 rounded-xl w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-4">
          Email Verification
        </h1>

        <p className={error ? "text-red-400" : "text-gray-300"}>
          {message}
        </p>

        {!error && (
          <p className="text-sm text-gray-500 mt-4">
            Redirecting you to login...
          </p>
        )}

      </div>
    </div>
  );
};

export default VerifyEmailPage;