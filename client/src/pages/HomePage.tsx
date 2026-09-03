import { useQuery } from "@tanstack/react-query";
import SongCard from "../components/SongCard";
import { getSongs } from "../services/song.service";
import { resendVerificationEmail } from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../features/player/playerSlice";
import type { RootState } from "../store/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setPlaylist(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  // const handleResendVerification = async () => {
  //   if (!user?.email) {
  //     toast.error("Email address not found");
  //     return;
  //   }

  //   try {
  //     setIsResending(true);

  //     const response = await resendVerificationEmail(
  //       user.email
  //     );

  //     toast.success(
  //       response?.message ||
  //         "Verification email sent successfully."
  //     );
  //   } catch (error: any) {
  //     toast.error(
  //       error?.response?.data?.message ||
  //         "Failed to resend verification email"
  //     );
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  const handleResendVerification = async () => {
    if (!user?.email) {
      toast.error("Email address not found");
      return;
    }

    try {
      setIsResending(true);

      const response = await resendVerificationEmail(
        user.email
      );

      toast.success(
        response?.message ||
        "Verification email sent successfully."
      );

      // Start 5-minute cooldown
      setResendCooldown(300);

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to resend verification email"
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Email Verification Notification */}
      {user && !user.emailVerified && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="font-semibold text-yellow-400">
                Verify your email
              </h3>

              <p className="mt-1 text-sm text-gray-300">
                Your email address hasn't been verified yet.
                Please check your inbox and verify your email.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Didn't receive the email?
              </p>
            </div>

            <button
              type="button"
              onClick={handleResendVerification}
              disabled={isResending || resendCooldown > 0}
              className="w-full sm:w-auto rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending
                ? "Sending..."
                : resendCooldown > 0
                ? `Resend available in ${Math.floor(resendCooldown / 60)}:${String(
                  resendCooldown % 60
                ).padStart(2, "0")}`
                : "Resend verification email"}
            </button>

          </div>
        </div>
      )}

      {/* Hero section */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Hello
        </h1>

        <p className="text-gray-400 mt-1 text-sm sm:text-base">
          Trending songs picked for you
        </p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-[#1a1a1a] rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <p className="text-red-400">
          Failed to load songs
        </p>
      )}

      {/* Songs section */}
      {!isLoading && !isError && (
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Trending Songs
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.map((song: any) => (
              <SongCard
                key={song.id}
                song={song}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;