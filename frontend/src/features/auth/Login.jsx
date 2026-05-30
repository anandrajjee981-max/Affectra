import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useauth } from './hooks/useauth';

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setidentifier] = useState("");
  const [password, setpassword] = useState("");
  
  const theme = {
    accent: "#ef4444",
    text: "text-red-500",
    border: "border-zinc-900",
    focusBorder: "focus:border-red-500/50",
    button: "bg-red-600/10 border-red-500/80 text-red-400 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)] hover:bg-red-500 hover:text-black hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]",
  };

  const { handlelogin } = useauth();

  async function submithandle(e) {
    e.preventDefault();
    const res = await handlelogin(identifier, password);
    if (res) {
      navigate('/show1');
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#050507] text-zinc-200 font-mono overflow-hidden px-6">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Small Tech Details */}
      <div className="absolute top-4 left-4 text-[9px] text-zinc-700 select-none">SECURE_AUTH_GATE // GATE_01</div>
      <div className="absolute bottom-4 right-4 text-[9px] text-zinc-700 select-none">AFFECTRA_SECURITY_v2.5</div>

      {/* Login Box Container */}
      <div className="w-full max-w-md bg-[#0a0a0f] border border-zinc-900 rounded p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-10">
        
        {/* Corner Tech Brackets */}
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600/80 transform -translate-x-[1px] -translate-y-[1px]`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600/80 transform translate-x-[1px] -translate-y-[1px]`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600/80 transform -translate-x-[1px] translate-y-[1px]`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600/80 transform translate-x-[1px] translate-y-[1px]`} />

        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-zinc-900 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-red-500/80">Identify Required</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">SYSTEM_LOGIN</h2>
        </div>

        {/* Form - Added autoComplete="off" */}
        <form className="space-y-5" onSubmit={submithandle} autoComplete="off">
          
          {/* Username / Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              [01] Username / Email
            </label>
            <input 
              type="text" 
              name="identifier" 
              value={identifier}
              autoComplete="one-time-code"
              onChange={(e) => {
                setidentifier(e.target.value);
              }}
              placeholder="Enter username or email"
              className={`w-full bg-[#050507] border ${theme.border} ${theme.focusBorder} rounded p-3 text-xs text-zinc-300 placeholder-zinc-700 outline-none transition-colors font-mono`}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">[02] Password</label>
            <input 
              type="password"  
              name="password" 
              value={password} 
              autoComplete="new-password"
              onChange={(e)=>{
                setpassword(e.target.value);
              }}
              placeholder="••••••••"
              className={`w-full bg-[#050507] border ${theme.border} ${theme.focusBorder} rounded p-3 text-xs text-zinc-300 placeholder-zinc-700 outline-none transition-colors font-mono`}
            />
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className={`w-full py-3 rounded font-bold tracking-widest text-xs transition-all duration-300 uppercase border ${theme.button} mt-2`}
          >
            [ EXECUTE_LOGIN ]
          </button>
        </form>

        {/* Redirect Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-500">
          <span>New to the system?</span>
          <h3 onClick={()=>{
            navigate('/register');
          }}
          className="text-red-400 hover:text-red-300 underline font-bold transition-colors cursor-pointer">
            Create an Account →
          </h3>
        </div>

      </div>
    </div>
  );
};

export default Login;