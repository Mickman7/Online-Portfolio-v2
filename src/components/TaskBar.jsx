import React from 'react'
import { PROFILE, WINDOWS_CONFIG } from '../data/Portfolio-data'



const TaskBar = ({ openWindows, windowStates, onTaskbarClick, time }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2"
      style={{
        background: "rgba(10,10,20,0.7)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        height: 56,
        zIndex: 9999,
      }}
    >
      {/* Left: name */}
      <span className="text-white/30 text-xs font-medium tracking-wider">{PROFILE.name}</span>

      {/* Center: open windows */}
      <div className="flex items-center gap-2">
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
                background: isMin ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
                border: `1px solid ${isMin ? "rgba(255,255,255,0.06)" : cfg.color + "55"}`,
                color: isMin ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.85)",
              }}
            >
              <span style={{ color: cfg.color, display: "flex" }}>{cfg.icon && <span className="w-3.5 h-3.5 block">{cfg.icon}</span>}</span>
              {cfg.label}
              <span
                className="w-1.5 h-1.5 rounded-full ml-0.5"
                style={{ background: isMin ? "rgba(255,255,255,0.2)" : cfg.color }}
              />
            </button>
          );
        })}
        {openWindows.length === 0 && (
          <span className="text-white/20 text-xs">No open windows</span>
        )}
      </div>

      {/* Right: clock */}
      <span className="text-white/50 text-xs font-mono tabular-nums">{time}</span>
    </div>
  )
}

export default TaskBar