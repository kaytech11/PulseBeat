import { LogOut, X } from "lucide-react";
import { logout } from "../../features/auth/authslice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-full max-w-[250px] h-full bg-[#0f0f0f] text-white p-4 lg:p-5 flex flex-col gap-5 lg:gap-6 border-r border-gray-900">

      {/* Brand */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white">
          PulseBeat
        </h1>

        <button
          onClick={onClose}
          className="lg:hidden p-1"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 lg:gap-2 text-sm">

        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2.5 rounded-md transition text-sm ${
              isActive
                ? "bg-[#1DB954] text-black font-medium"
                : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/search"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2.5 rounded-md transition text-sm ${
              isActive
                ? "bg-[#1DB954] text-black font-medium"
                : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
            }`
          }
        >
          Search
        </NavLink>

        <NavLink
          to="/library"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2.5 rounded-md transition text-sm ${
              isActive
                ? "bg-[#1DB954] text-black font-medium"
                : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
            }`
          }
        >
          Library
        </NavLink>

        <NavLink
          to="/Playlists"
          onClick={onClose}
          className={({ isActive }) =>
            `px-3 py-2.5 rounded-md transition text-sm ${
              isActive
                ? "bg-[#1DB954] text-black font-medium"
                : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
            }`
          }
        >
          Playlists
        </NavLink>

        {/* Artist section */}
        {user?.role === "ARTIST" && (
          <NavLink
            to="/upload"
            onClick={onClose}
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-md transition text-sm ${
                isActive
                  ? "bg-[#1DB954] text-black font-medium"
                  : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
              }`
            }
          >
            Upload Song
          </NavLink>
        )}

        {user?.role === "ARTIST" && (
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-md transition text-sm ${
                isActive
                  ? "bg-[#1DB954] text-black font-medium"
                  : "text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
              }`
            }
          >
            Artist Dashboard
          </NavLink>
        )}

      </nav>

      <div className="mt-auto">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition text-sm text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
        >
          <LogOut size={18} />
          Logout
        </button>

        <div className="mt-5 text-[11px] lg:text-xs text-gray-500">
          © PulseBeat
        </div>

      </div>

    </div>
  );
};

export default Sidebar;