import React from 'react'
import { PROFILE, WINDOWS_CONFIG } from '../data/Portfolio-data'



const TaskBar = ({ openWindows, windowStates, onTaskbarClick, theme }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 grid grid-cols-3 items-center px-6 py-2"
      style={{
        background: theme === "dark" ? "rgba(24, 24, 47, 0.7)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
        height: 56,
        zIndex: 9999,
      }}
    >
      {/* Left: name */}
      <span className={`text-xs font-medium tracking-wider text-left ${theme === "dark" ? "text-white/30" : "text-black/40"}`}>{PROFILE.name}.dev</span>

      {/* Center: open windows */}
      <div className="flex items-center justify-center gap-2">
        {WINDOWS_CONFIG.map((cfg) => {
          const isOpen = openWindows.includes(cfg.id);
          const isMin = windowStates[cfg.id]?.minimised;
          if (!isOpen) return null;
          return (
            <button
              key={cfg.id}
              onClick={() => onTaskbarClick(cfg.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all duration-150"
              style={{
                background: isMin ? (theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)") : (theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"),
                border: `1px solid ${isMin ? (theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)") : cfg.color + "55"}`,
                color: isMin ? (theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)") : (theme === "dark" ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.75)"),
              }}
            >
              <span style={{ color: cfg.color, display: "flex" }}>{cfg.icon && <span className="w-3.5 h-3.5 block">{cfg.icon}</span>}</span>
              {cfg.label}
              <span
                className="w-1.5 h-1.5 rounded-full ml-0.5"
                style={{ background: isMin ? (theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)") : cfg.color }}
              />
            </button>
          );
        })}
        {openWindows.length === 0 && (
          <span className={`text-xs ${theme === "dark" ? "text-white/20" : "text-black/30"}`}>No open windows</span>
        )}
      </div>

      {/* Right: copyright */}
      <span className={`text-xs font-medium tracking-wider text-right ${theme === "dark" ? "text-white/50" : "text-black/50"}`}>© Copyright 2026. All rights are reserved.</span>
    </div>
  )
}

export default TaskBar