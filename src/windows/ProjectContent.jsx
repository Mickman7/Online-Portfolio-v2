import React from 'react'
import { PROJECTS } from '../data/Portfolio-data'



const ProjectContent = () => {
  return (
    <div className="p-6 space-y-4 h-full overflow-y-auto">
      {PROJECTS.map((p) => (
        <div
          key={p.name}
          className="rounded-2xl p-4 space-y-2 group cursor-pointer transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">{p.name}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background:
                  p.status === "Live"
                    ? "rgba(52,211,153,0.15)"
                    : p.status === "Open Source"
                    ? "rgba(110,231,247,0.15)"
                    : "rgba(251,191,36,0.15)",
                color:
                  p.status === "Live"
                    ? "#34d399"
                    : p.status === "Open Source"
                    ? "#6ee7f7"
                    : "#fbbf24",
              }}
            >
              {p.status}
            </span>
          </div>
          <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectContent