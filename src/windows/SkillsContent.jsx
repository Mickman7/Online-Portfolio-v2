import React from 'react'
import { SKILLS } from '../data/Portfolio-data'



const SkillsContent = () => {
  return (
    <div className="p-6 space-y-5 h-full overflow-y-auto">
      {Object.entries(SKILLS).map(([category, skills]) => (
        <div key={category}>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">{category}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-3 py-1.5 rounded-xl text-white/70 transition-all duration-150 hover:text-white cursor-default"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkillsContent