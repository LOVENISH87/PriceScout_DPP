import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#05060a]/90 backdrop-blur-sm transition-all duration-300">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]"></div>

      <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-6 lg:px-10">
        {/* Minimal Text Logo */}
        <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-1">
          <span>PriceScout<span className="text-cyan-400">.</span></span>
        </div>

        {/* Circular Menu Button */}
        <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-black transition-all group-hover:w-3.5"></span>
            <span className="h-0.5 w-5 bg-black"></span>
            <span className="h-0.5 w-5 bg-black transition-all group-hover:w-3.5"></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
