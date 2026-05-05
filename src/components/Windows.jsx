import React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'
import ProfileContent from '../windows/ProfileContent';
import ProjectContent from '../windows/ProjectContent';
import SkillsContent from '../windows/SkillsContent';
import ContactContent from '../windows/ContactContent';


const CONTENT_MAP = {
    profile: ProfileContent,
    projects: ProjectContent,
    skills: SkillsContent,
    contact: ContactContent,
  };

const SIZE_MAP = {
    profile: { w: 420, h: 500 },
    projects: { w: 500, h: 520 },
    skills: { w: 440, h: 460 },
    contact: { w: 400, h: 400 },
};


const Windows = ({ winCfg, state, onClose, onMinimize, onFocus, zIndex }) => {

    const { id, label, color, glowColor } = winCfg;
    const ContentComponent = CONTENT_MAP[id];
    const size = SIZE_MAP[id];

    const posRef = useRef(state.pos);
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const windowRef = useRef(null);

    const [pos, setPos] = useState(state.pos);

    const onMouseDown = useCallback(
        (e) => {
        if (e.target.closest("[data-nodrag]")) return;
        onFocus(id);
        dragging.current = true;
        offset.current = {
            x: e.clientX - posRef.current.x,
            y: e.clientY - posRef.current.y,
        };
        e.preventDefault();
        },
        [id, onFocus]
    );

    useEffect(() => {
        const onMouseMove = (e) => {
        if (!dragging.current) return;
        const nx = e.clientX - offset.current.x;
        const ny = e.clientY - offset.current.y;
        posRef.current = { x: nx, y: ny };
        setPos({ x: nx, y: ny });
        };
        const onMouseUp = () => {
        dragging.current = false;
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    if (state.minimised) return null;

  return (
    <div
      ref={windowRef}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex,
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        background: "rgba(14,14,28,0.85)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.08), 0 0 40px ${glowColor}`,
        overflow: "hidden",
        userSelect: dragging.current ? "none" : "auto",
      }}
      onClick={() => onFocus(id)}
    >
      {/* Title bar */}
      <div
        onMouseDown={onMouseDown}
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0 cursor-grab active:cursor-grabbing"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5" data-nodrag>
          <button
            onClick={() => onClose(id)}
            className="w-3 h-3 rounded-full flex items-center justify-center group transition-all"
            style={{ background: "#ff5f57" }}
            title="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/60 leading-none">✕</span>
          </button>
          <button
            onClick={() => onMinimize(id)}
            className="w-3 h-3 rounded-full flex items-center justify-center group transition-all"
            style={{ background: "#febc2e" }}
            title="Minimise"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/60 leading-none">−</span>
          </button>
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
        </div>

        <div className="flex-1 text-center">
          <span className="text-white/60 text-xs font-medium">{label}</span>
        </div>

        {/* Accent dot */}
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ContentComponent />
      </div>
    </div>
  )
}

export default Windows