import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-[70px] flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 md:px-6 py-3">

      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-[#242424]"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-base sm:text-lg font-semibold text-center md:text-left">
          Welcome to PulseBeat
        </h2>

      </div>

      <div className="relative w-full md:w-[300px]">
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            navigate(`/search?q=${value}`);
          }}
          className="w-full bg-[#242424] text-white px-4 py-2 pl-4 md:pl-10 rounded-full outline-none text-sm md:text-base"
        />
      </div>

    </div>
  );
};

export default Navbar;