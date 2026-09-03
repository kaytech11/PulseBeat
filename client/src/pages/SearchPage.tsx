import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SongCard from "../components/SongCard";
import { searchSongs } from "../services/search.service";

const SearchPage = () => {
  // const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const query =
    searchParams.get("q") || "";
  const {
    data = [],
    isLoading,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchSongs(query),
    enabled: query.trim().length > 0,
  });

  return (

    <div className="p-6 sm:p-6 text-white">

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
        Search
      </h1>

      <input
        type="text"
        placeholder="Search songs or artists..."
        value={query}
        // onChange={(e) => setSearchParams(e.target.value)}
        onChange={(e) =>
          setSearchParams({
            q: e.target.value,
          })
        }
        className="
            w-full
            bg-[#242424]
            text-white
            px-4 sm:px-5
            py-3 sm:py-4
            rounded-full
            outline-none
            border
            border-[#333]
            focus:border-green-500
            mb-6 sm:mb-8
          "
      />

      {isLoading && (
       <p className="text-gray-400 text-sm sm:text-base">
          Searching...
        </p>
      )}

      {!query && (
        <div className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
          Start typing to search for songs or artists
        </div>
      )}

     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {data.map((song: any) => (
          <SongCard
            key={song.id}
            song={song}
          />
        ))}
      </div>

    </div>

  );
};

export default SearchPage;