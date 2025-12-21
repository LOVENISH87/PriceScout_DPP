import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/animate-ui/components/animate/tooltip";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { token, user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 bg-none border-0 py-2`}>
      {/* ${isScrolled ? 'bg-transparent backdrop-blur-xl border-b border-white py-2' : 'bg-transparent py-2'}` */}
      <div className="mx-auto flex items-center justify-between px-8 lg:px-12 max-w-[1900px]">
        {/* Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-2xl font-bold tracking-tighter text-white">
            PriceScout<span className="text-blue-500">.</span>
          </span>
        </Link>


        {/* Action Panel */}
        <div className="flex items-center gap-6">


          {token ? (
            <TooltipProvider>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/profile"
                      className="bg-grey-400 hover:bg-blue-400 text-white p-3 hover:scale-105 rounded-xl transition-all ease-in-out duration-120 border border-blue-300 active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User Settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={logout}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 hover:scale-110 rounded-xl transition-all border border-red-500/20 active:scale-90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Terminate Session</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-white/10"
            >
              Access Portal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
