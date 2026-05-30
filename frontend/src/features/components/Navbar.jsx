import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const theme = {
    accent: "#ef4444",
    text: "text-red-500",
    border: "border-zinc-900",
    linkHover: "hover:text-red-400 hover:bg-red-950/20",
    button: "bg-red-600/10 border-red-500/80 text-red-400 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)] hover:bg-red-500 hover:text-black hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
  };

  const navLinks = [
    { name: "Home", href: "/hero" },
    { name: "Features", href: "/second" },
    { name: "Analytics", href: "#analytics" },
    { name: "Docs", href: "#docs" }
  ];

  return (
    <>
      {/* FIXED NAVIGATION BAR */}
      <nav className={`w-full bg-[#050507]/80 backdrop-blur-lg border-b ${theme.border} text-zinc-300 font-mono fixed top-0 left-0 z-50 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between relative">
          
          {/* Decorative Top Left Edge Line */}
          <div className="absolute top-0 left-6 w-12 h-[1px] bg-red-500/40" />

          {/* LOGO AREA */}
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3 flex items-center justify-center">
              <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 bg-red-500 rounded-full" />
            </div>
            <span className="text-sm font-black tracking-[0.25em] text-white uppercase">
              AFFECTRA<span className={theme.text}>_</span>
            </span>
            <span className="hidden sm:inline border border-zinc-800 text-[8px] px-1 py-0.2 rounded text-zinc-600 bg-zinc-950 font-bold select-none">
              SYS_LN_OK
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs px-4 py-2 rounded transition-all duration-300 ${theme.linkHover}`}
              >
                // {link.name.toUpperCase()}
              </a>
            ))}
          </div>

          {/* RIGHT SIDE BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-[9px] text-zinc-600 select-none">NODE_S25</span>
            <a
              href="/login"
              className={`py-1.5 px-4 rounded border text-xs font-bold tracking-wider transition-all duration-300 uppercase ${theme.button}`}
            >
              [ LAUNCH_APP ]
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>

        </div>

        {/* MOBILE CONTAINER DROPDOWN */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#0a0a0f] border-b ${theme.border} ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs p-2 rounded transition-all ${theme.linkHover}`}
                onClick={() => setIsOpen(false)}
              >
                // {link.name.toUpperCase()}
              </a>
            ))}
            <div className="w-full h-[1px] bg-zinc-900 my-1" />
            <a
              href="/login"
              className={`w-full text-center py-2.5 rounded border text-xs font-bold tracking-wider uppercase transition-all ${theme.button}`}
              onClick={() => setIsOpen(false)}
            >
              [ LAUNCH_APP ]
            </a>
          </div>
        </div>
      </nav>

      {/* TOP GAP COMPENSATION FOR FIXED POSITIONING */}
      <div className="h-16 w-full" />
    </>
  );
};

export default Navbar;