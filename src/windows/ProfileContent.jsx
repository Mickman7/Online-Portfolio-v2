import React from 'react'
import { PROFILE } from '../data/Portfolio-data'


const ProfileContent = () => {
  return (
    <div className="p-6 space-y-6 text-sm h-full overflow-y-auto">
      <div className="flex items-center gap-5">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #6ee7f7 0%, #a78bfa 100%)",
            color: "#0a0a14",
          }}
        >
          {PROFILE.avatar}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{PROFILE.name}</h2>
          <p className="text-[#6ee7f7] text-xs mt-0.5">{PROFILE.title}</p>
          <p className="text-white/40 text-xs mt-1">📍 {PROFILE.location}</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="text-white/60 leading-relaxed whitespace-pre-line">{PROFILE.bio}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Email", val: PROFILE.email },
          { label: "GitHub", val: PROFILE.github },
          { label: "LinkedIn", val: PROFILE.linkedin },
        ].map(({ label, val }) => (
          <div key={label} className="col-span-2 bg-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-white/30 text-xs w-16 flex-shrink-0">{label}</span>
            <span className="text-white/80 text-xs">{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileContent