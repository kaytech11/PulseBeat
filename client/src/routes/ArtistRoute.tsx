import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface Props {
  children: React.ReactNode;
}

const ArtistRoute = ({
  children,
}: Props) => {

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ARTIST") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ArtistRoute;