import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MusicPlayer from "../components/layout/MusicPlayer";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">

      <aside className="hidden md:flex w-64 flex-shrink-0 bg-[#0f0f0f] border-r border-gray-900">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col h-screen">

        <header className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1a1a] to-transparent backdrop-blur-md">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#121212] to-black">
          {children}
        </main>

        <footer className="sticky bottom-0 z-20 bg-[#121212] border-t border-gray-800">
          <MusicPlayer />
        </footer>

      </div>
    </div>
  );
};

export default MainLayout;