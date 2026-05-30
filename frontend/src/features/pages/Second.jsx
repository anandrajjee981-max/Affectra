import React from 'react';

const Second = () => {
  const theme = {
    accent: "#ef4444",
    text: "text-red-500",
    border: "border-zinc-900",
    hoverBorder: "group-hover:border-red-500/50",
    cardBg: "bg-[#09090d]/90",
  };

  const featureNodes = [
    {
      id: "MODE_01",
      title: "Adaptive UI Experience",
      desc: "The website colors, buttons, and layouts change instantly in real-time based on your facial expressions.",
      tag: "ADAPTIVE_UI"
    },
    {
      id: "MODE_02",
      title: "Live Emotion Analytics",
      desc: "Your webcam analyzes your expressions instantly and shows a live mood score on your screen without saving any data.",
      tag: "LIVE_ANALYTICS"
    },
    {
      id: "MODE_03",
      title: "AI Meme Generation",
      desc: "Make a funny, sad, or shocked face, and the AI will immediately generate a custom meme that matches your exact vibe.",
      tag: "AI_MEME_GEN"
    },
    {
      id: "MODE_04",
      title: "Mood Personalization",
      desc: "If you look tired or bored, the system automatically adjusts the content and interface to give you exactly what you need.",
      tag: "PERSONALIZATION"
    },
    {
      id: "MODE_05",
      title: "Engagement Tracking",
      desc: "Smart tracking that safely measures how focused you are, showing when you are enjoying the content or losing interest.",
      tag: "ENGAGEMENT"
    },
    {
      id: "MODE_06",
      title: "Interactive AI Reactions",
      desc: "The platform reacts back to you. Smile at the camera, and on-screen elements or AI characters will smile right back.",
      tag: "AI_REACTION"
    }
  ];

  return (
    <div className="relative w-full bg-[#050507] text-zinc-300 font-mono py-24 px-6 overflow-hidden border-t border-zinc-900">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none opacity-60" />

      <div className="w-full max-w-6xl mx-auto z-10 relative">
        
        {/* Simple & Clear Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-b border-zinc-900 pb-10 mb-16">
          <div className="md:col-span-7">
            <span className={`text-[10px] font-bold tracking-[0.4em] ${theme.text} uppercase block mb-2`}>
              // AFFECTRA_CORE_SYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              Normal Apps track dots, <br />
              We track <span className={theme.text}>Vibes.</span>
            </h2>
          </div>
          
          <div className="md:col-span-5 md:border-l border-zinc-800 md:pl-6">
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Forget basic face detection. <span className="text-red-400 font-mono">Affectra</span> tracks your webcam expressions in real-time to shape, adapt, and personalize your entire web experience based on your current mood.
            </p>
          </div>
        </div>

        {/* 6 Grid Features Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureNodes.map((node) => (
            <div 
              key={node.id}
              className={`group relative ${theme.cardBg} border ${theme.border} ${theme.hoverBorder} p-5 rounded transition-all duration-500 flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.5)]`}
            >
              {/* Corner Tech Brackets */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-800 group-hover:border-red-500/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-800 group-hover:border-red-500/60 transition-colors" />

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-zinc-900/60 pb-2">
                  <span className="text-[9px] text-zinc-600 font-bold tracking-widest">{node.id}</span>
                  <span className="text-[9px] text-red-500/80 bg-red-950/20 px-1.5 py-0.5 rounded border border-red-900/30 font-bold">{node.tag}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-black tracking-wide text-zinc-100 uppercase group-hover:text-red-400 transition-colors duration-300">
                    {node.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>

              {/* Status footer for cyber look */}
              <div className="mt-6 pt-2 border-t border-zinc-950 flex justify-between items-center text-[9px] text-zinc-600 font-bold">
                <span>SYSTEM_READY</span>
                <span className="text-zinc-500">LIVE_FEED_OK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Console Bar */}
        <div className="w-full bg-zinc-950 border border-zinc-900 rounded p-3 mt-12 flex items-center justify-between text-[10px] text-zinc-600">
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 bg-red-500 rounded-full animate-pulse" />
            <span>ALL MODULES READY TO SCAN</span>
          </div>
          <span className="hidden sm:block">AFFECTRA_v2.1 // MOOD_ENGINE_ONLINE</span>
        </div>

      </div>
    </div>
  );
};

export default Second;