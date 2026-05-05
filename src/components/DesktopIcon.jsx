import React from 'react'
import { useState } from 'react'


const DesktopIcon = ({ cfg, onClick }) => {
    const [pressed, setPressed] = useState(false);

  return (
    <button
      className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-150 select-none group"
      style={{
        background: pressed ? "rgba(255,255,255,0.08)" : "transparent",
      }}
      onClick={() => onClick(cfg.id)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: cfg.color,
          boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 16px ${cfg.glowColor}`,
        }}
      >
        {cfg.icon}
      </div>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-md"
        style={{
          color: "rgba(255,255,255,0.85)",
          textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        {cfg.label}
      </span>
    </button>
  )
}

export default DesktopIcon