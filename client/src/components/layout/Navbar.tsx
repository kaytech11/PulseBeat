  import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  

  return (
    <div className="h-[70px] flex items-center justify-between px-6">

      <h2 className="text-lg font-semibold">
        Welcome to PulseBeat
      </h2>

      <div className="relative w-[300px]">
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" && search.trim()) {
          //     navigate(`/search?q=${search}`);
          //   }
          // }}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            navigate(`/search?q=${value}`);
          }}
          className="w-full bg-[#242424] text-white px-4 py-2 pl-10 rounded-full outline-none"
        />
      </div>

    </div>
  );
};

export default Navbar;