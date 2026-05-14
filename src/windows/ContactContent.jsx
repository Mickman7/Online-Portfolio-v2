import React from 'react'
import { CONTACT } from '../data/Portfolio-data'



const ContactContent = () => {
  return (
    <div className="p-6 space-y-5 h-full overflow-y-auto">
      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}
      >
        <p className="text-[#34d399] text-xs font-medium mb-1">Availability</p>
        <p className="text-white/80 text-sm">{CONTACT.availability}</p>
        <p className="text-white/40 text-xs mt-1">{CONTACT.preferredRole}</p>
      </div>

      <p className="pb-2 text-white/50 text-sm leading-relaxed whitespace-pre-line">{CONTACT.message}</p>

      <a
        href={`mailto:${CONTACT.email}`}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #6ee7f7 0%, #a78bfa 100%)",
          color: "#0a0a14",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Send a Message
      </a>
    </div>
  )
}

export default ContactContent