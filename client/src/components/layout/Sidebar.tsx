

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="w-[250px] h-full bg-[#0f0f0f] text-white p-5 flex flex-col gap-6 border-r border-gray-900">

      {/* Brand */}
      <h1 className="text-2xl font-bold tracking-tight text-white">
        PulseBeat
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-sm">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
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
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
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
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
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
          className={({ isActive }) =>
            `px-3 py-2 rounded-md transition ${
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
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
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
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
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

      {/* Bottom spacing like Spotify sidebar feel */}
      <div className="mt-auto text-xs text-gray-500">
        © PulseBeat
      </div>

    </div>
  );
};

export default Sidebar;