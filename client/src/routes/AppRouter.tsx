import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import LibraryPage from "../pages/LibraryPage";
import UploadPage from "../pages/UploadSongPage";
import ArtistDashboardPage from "../pages/ArtistDashboardPage";
import PlaylistPage from "../pages/PlaylistPage";
import PlaylistDetailsPage from "../pages/playlistDetailspage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import ProtectedRoutes from "./ProtectedRoutes";
import ArtistRoute from "./ArtistRoute";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import ResendVerificationPage from "../pages/ResendVerificationPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />
        <Route
          path="/resend-verification"
          element={<ResendVerificationPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        <Route
          path="/*"
          element={
            <ProtectedRoutes>
              <MainLayout>

                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/library" element={<LibraryPage />} />
                  {/* <Route path="/playlists" element={<ProtectedRoutes><PlaylistPage /></ProtectedRoutes>} />
                  <Route path="/playlists/:id" element={<ProtectedRoutes><PlaylistDetailsPage /></ProtectedRoutes>}/> */}
                  <Route
                    path="/playlists"
                    element={<PlaylistPage />}
                  />

                  <Route
                    path="/playlists/:id"
                    element={<PlaylistDetailsPage />}
                  />

                  <Route
                    path="/upload"
                    element={
                      <ArtistRoute>
                        <UploadPage />
                      </ArtistRoute>
                    }
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <ArtistRoute>
                        <ArtistDashboardPage />
                      </ArtistRoute>
                    }
                  />

                </Routes>

              </MainLayout>
            </ProtectedRoutes>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;