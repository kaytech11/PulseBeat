// import { useState } from "react";
// import Sidebar from "../components/layout/Sidebar";
// import Navbar from "../components/layout/Navbar";
// import MusicPlayer from "../components/layout/MusicPlayer";

// interface Props {
//   children: React.ReactNode;
// }

// const MainLayout = ({ children }: Props) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-black text-white overflow-hidden">

//       {/* Desktop Sidebar */}
//       <aside className="hidden lg:flex w-64 flex-shrink-0 bg-[#0f0f0f] border-r border-gray-900">
//         <Sidebar />
//       </aside>

//       {/* Mobile Sidebar */}
//       {mobileMenuOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//             onClick={() => setMobileMenuOpen(false)}
//           />

//           {/* Sidebar */}
//           <aside className="fixed top-0 left-0 h-full w-64 z-50 lg:hidden">
//             <Sidebar onClose={() => setMobileMenuOpen(false)} />
//           </aside>
//         </>
//       )}

//       <div className="flex flex-1 flex-col min-w-0 h-screen">

//         <header className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1a1a] to-transparent backdrop-blur-md">
//           <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
//         </header>

//         <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 bg-gradient-to-b from-[#121212] to-black">
//           {children}
//         </main>

//         <footer className="sticky bottom-0 z-20 bg-[#121212] border-t border-gray-800">
//           <MusicPlayer />
//         </footer>

//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import MusicPlayer from "../components/layout/MusicPlayer";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#090909] text-white overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0f0f0f] border-r border-[#202020] z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] z-50 lg:hidden">
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </aside>
        </>
      )}

      {/* Main Application Area */}
      <div className="h-full w-full lg:pl-64 flex flex-col bg-[#090909]">

        {/* Navbar */}
        <header className="flex-shrink-0 z-20 bg-[#090909] border-b border-white/[0.04]">
          <Navbar
            onMenuClick={() => setMobileMenuOpen(true)}
          />
        </header>

        {/* Page Content */}
        <main
          className="
            flex-1
            min-h-0
            overflow-y-auto
            bg-[#090909]
            px-4
            py-5
            sm:px-6
            sm:py-6
            lg:bg-gradient-to-b
            lg:from-[#121212]
            lg:to-[#090909]
            pb-32
            lg:pb-6
          "
        >
          {children}
        </main>

        {/* Music Player */}
        <footer className="flex-shrink-0 z-30 bg-[#111111] border-t border-white/[0.06]">
          <MusicPlayer />
        </footer>

      </div>
    </div>
  );
};

export default MainLayout;