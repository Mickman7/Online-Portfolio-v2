/**
 * IntroScene.jsx
 * ─────────────────────────────────────────────────────
 * 3D desk intro built with @react-three/fiber + @react-three/drei
 *
 * Install deps:
 *   npm install three @react-three/fiber @react-three/drei
 *
 * Usage in your App / portfolio:
 *   import IntroScene from './IntroScene'
 *   <IntroScene onEnter={() => setShowPortfolio(true)} />
 */
 
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
 
// ─── CONSTANTS ──────────────────────────────────────────────────────────────
 
const CAM_START = new THREE.Vector3(0, 2.8, 7.2);
const CAM_TARGET_POS = new THREE.Vector3(0, 1.72, 1.35); // just in front of screen face
const CAM_LOOK_AT = new THREE.Vector3(0, 1.72, 0);
const ZOOM_DURATION = 1.8; // seconds
 
// ─── CODE CONTENT ────────────────────────────────────────────────────────────
 
const CODE_LINES = [
  { tokens: [{ t: "import", c: "#c792ea" }, { t: " { useState, useEffect }", c: "#cdd3de" }, { t: " from", c: "#c792ea" }, { t: " 'react'", c: "#c3e88d" }, { t: ";", c: "#cdd3de" }] },
  { tokens: [] },
  { tokens: [{ t: "/**", c: "#546e7a" }] },
  { tokens: [{ t: " * Renders the main portfolio desktop.", c: "#546e7a" }] },
  { tokens: [{ t: " * Triggered once you step through the screen.", c: "#546e7a" }] },
  { tokens: [{ t: " */", c: "#546e7a" }] },
  { tokens: [{ t: "export default ", c: "#c792ea" }, { t: "function ", c: "#82aaff" }, { t: "EnterPortfolio", c: "#ffcb6b" }, { t: "() {", c: "#cdd3de" }] },
  { tokens: [{ t: "  const ", c: "#c792ea" }, { t: "[ready, setReady]", c: "#cdd3de" }, { t: " = ", c: "#89ddff" }, { t: "useState", c: "#82aaff" }, { t: "(", c: "#cdd3de" }, { t: "false", c: "#ff5874" }, { t: ");", c: "#cdd3de" }] },
  { tokens: [] },
  { tokens: [{ t: "  useEffect", c: "#82aaff" }, { t: "(() => {", c: "#cdd3de" }] },
  { tokens: [{ t: "    setReady", c: "#82aaff" }, { t: "(", c: "#cdd3de" }, { t: "true", c: "#ff5874" }, { t: ");", c: "#cdd3de" }] },
  { tokens: [{ t: "  }, []);", c: "#cdd3de" }] },
  { tokens: [] },
  { tokens: [{ t: "  return ready ", c: "#c792ea" }, { t: "? ", c: "#89ddff" }, { t: "<", c: "#89ddff" }, { t: "Portfolio", c: "#ffcb6b" }, { t: " />", c: "#89ddff" }, { t: " : ", c: "#89ddff" }, { t: "null", c: "#ff5874" }, { t: ";", c: "#cdd3de" }] },
  { tokens: [{ t: "}", c: "#cdd3de" }] },
];
 
// ─── CODE EDITOR PANEL (rendered as Html overlay on monitor) ─────────────────
 
function CodeEditor({ blinkOn }) {
  return (
    <div style={{
      width: 800,
      height: 400,
      background: "#0f1117",
      borderRadius: 6,
      overflow: "hidden",
      fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace",
      fontSize: 11.5,
      lineHeight: "18px",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.8)",
      display: "flex",
      flexDirection: "column",
      userSelect: "none",
    }}>
      {/* Editor chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#1a1d27", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ flex: 1, textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 10 }}>EnterPortfolio.jsx</span>
      </div>
 
      {/* Tab bar */}
      <div style={{ display: "flex", background: "#13151f", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{ padding: "4px 14px", borderBottom: "2px solid #82aaff", color: "#cdd3de", fontSize: 10 }}>EnterPortfolio.jsx</div>
        <div style={{ padding: "4px 14px", color: "rgba(255,255,255,0.2)", fontSize: 10 }}>styles.css</div>
      </div>
 
      {/* Code lines */}
      <div style={{ flex: 1, overflowY: "hidden", padding: "8px 0" }}>
        {CODE_LINES.map((line, i) => (
          <div key={i} style={{ display: "flex", paddingLeft: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.15)", minWidth: 22, textAlign: "right", paddingRight: 10, fontSize: 10 }}>{i + 1}</span>
            <span>
              {line.tokens.map((tok, j) => (
                <span key={j} style={{ color: tok.c }}>{tok.t}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
 
      {/* Prompt */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6px 12px", background: "#13151f", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9, color: blinkOn ? "#6ee7f7" : "transparent", transition: "color 0.1s", fontFamily: "sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ▶ Press any key to view portfolio
        </span>
      </div>
    </div>
  );
}
 
// ─── 3D DESK COMPONENTS ──────────────────────────────────────────────────────
 
function Desk() {
  return (
    <group>
      {/* Desktop surface */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.08, 3]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.6} metalness={0.05} />
      </mesh>
      {/* Wood grain suggestion — thin darker stripe */}
      <mesh position={[0, 0.041, 0]}>
        <boxGeometry args={[6, 0.002, 3]} />
        <meshStandardMaterial color="#4a2f1e" roughness={0.8} transparent opacity={0.4} />
      </mesh>
      {/* Legs */}
      {[[-2.6, -0.9, -1.1], [2.6, -0.9, -1.1], [-2.6, -0.9, 1.1], [2.6, -0.9, 1.1]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.1, 1.8, 0.1]} />
          <meshStandardMaterial color="#3a2416" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
 
function Monitor({ blinkOn }) {
    return (
      <group position={[0, 0.04, -0.6]} scale={1.5}> {/* Increase the scale to make the monitor larger */}
        {/* Monitor body / bezel */}
        <mesh castShadow position={[0, 1.38, 0]}>
          <boxGeometry args={[3.9, 2.475, 0.1425]} /> {/* Increased dimensions */}
          <meshStandardMaterial color="#1a1a1e" roughness={0.3} metalness={0.6} />
        </mesh>
  
        {/* Screen recess (slightly inset, darker) */}
        <mesh position={[0, 1.38, 0.0735]}>
          <boxGeometry args={[3.57, 2.19, 0.015]} /> {/* Adjusted dimensions */}
          <meshStandardMaterial color="#f0efe9" roughness={1} />
        </mesh>
  
        {/* Html screen content — sits on screen face */}
        <Html
          position={[0, 1.38, 0.08]}
          transform
          occlude
          style={{ pointerEvents: "none" }}
          distanceFactor={1.72}
          center
        >
          <CodeEditor blinkOn={blinkOn} />
        </Html>
  
        {/* Screen subtle glow */}
        <mesh position={[0, 1.38, 0.07]}>
          <planeGeometry args={[3.54, 2.15]} /> {/* Adjusted dimensions */}
          <meshBasicMaterial color="#1a2a4a" transparent opacity={0.08} />
        </mesh>
  
        {/* Thin edge lighting on screen face */}
        <mesh position={[0, 1.38, 0.071]}>
          <planeGeometry args={[3.56, 2.17]} /> {/* Adjusted dimensions */}
          <meshBasicMaterial color="#6ee7f7" transparent opacity={0.015} />
        </mesh>
  
        {/* Camera dot */}
        <mesh position={[0, 2.165, 0.0735]}>
          <sphereGeometry args={[0.027, 8, 8]} /> {/* Adjusted size */}
          <meshStandardMaterial color="#222" />
        </mesh>
  
        {/* Stand neck */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.15, 1.65, 0.15]} /> {/* Adjusted dimensions */}
          <meshStandardMaterial color="#252528" roughness={0.4} metalness={0.7} />
        </mesh>
  
        {/* Stand base */}
        <mesh position={[0, 0.06, 0.18]} castShadow receiveShadow>
          <boxGeometry args={[1.08, 0.06, 0.57]} /> {/* Adjusted dimensions */}
          <meshStandardMaterial color="#1e1e20" roughness={0.3} metalness={0.8} />
        </mesh>
  
    
      </group>
    );
  }
 
function Keyboard() {
  const rows = [10, 9, 9, 8];
  const rowOffsets = [-0.02, -0.01, 0, 0.01];
  return (
    <group position={[0, 0.055, 0.78]} rotation={[-0.04, 0, 0]}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[1.65, 0.038, 0.52]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Key rows */}
      {rows.map((count, ri) => {
        const rowZ = -0.16 + ri * 0.12;
        return Array.from({ length: count }).map((_, ki) => {
          const x = -((count - 1) / 2) * 0.155 + ki * 0.155 + rowOffsets[ri];
          return (
            <mesh key={`${ri}-${ki}`} position={[x, 0.028, rowZ]} castShadow>
              <boxGeometry args={[0.13, 0.02, 0.1]} />
              <meshStandardMaterial color="#2a2a30" roughness={0.5} metalness={0.3} />
            </mesh>
          );
        });
      })}
      {/* Space bar */}
      <mesh position={[0, 0.028, 0.18]} castShadow>
        <boxGeometry args={[0.82, 0.02, 0.1]} />
        <meshStandardMaterial color="#2a2a30" roughness={0.5} metalness={0.3} />
      </mesh>
     
    </group>
  );
}
 
function Mouse() {
  return (
    <group position={[1.3, 0.042, 0.65]}>
      {/* Body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.075, 0.18, 6, 12]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.35} metalness={0.55} />
      </mesh>
      {/* Left/right button split */}
      <mesh position={[0, 0.065, -0.055]}>
        <boxGeometry args={[0.003, 0.04, 0.14]} />
        <meshBasicMaterial color="#111" />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.082, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.04, 10]} />
        <meshStandardMaterial color="#333" roughness={0.6} />
      </mesh>
      {/* DPI dot */}
      <mesh position={[0, 0.075, 0.04]}>
        <circleGeometry args={[0.008, 8]} />
        <meshBasicMaterial color="#ff5874" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
 
function MousePad() {
  return (
    <mesh position={[1.4, 0.042, 0.7]} receiveShadow>
      <boxGeometry args={[0.7, 0.006, 0.52]} />
      <meshStandardMaterial color="#111118" roughness={0.9} />
    </mesh>
  );
}
 
function CoffeeMug() {
  return (
    <group position={[-1.55, 0.16, 0.3]}>
      {/* Mug body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.095, 0.08, 0.22, 20]} />
        <meshStandardMaterial color="#2a1f3d" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.115, 0, 0]}>
        <torusGeometry args={[0.055, 0.014, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#2a1f3d" roughness={0.5} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.102, 0]}>
        <meshStandardMaterial color="#2c1a0e" roughness={0.8} />
      </mesh>
    </group>
  );
}
 
function Plant() {
  return (
    <group position={[-1.3, 0.04, -0.55]} scale={0.9}>
      {/* Pot */}
      <mesh castShadow>
        <cylinderGeometry args={[0.07, 0.055, 0.13, 12]} />
        <meshStandardMaterial color="#8b5a3a" roughness={0.7} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.065, 0]}>
        <cylinderGeometry args={[0.068, 0.068, 0.01, 12]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 0.055;
        return (
          <mesh key={i} position={[Math.sin(rad) * r, 0.11 + (i % 2) * 0.02, Math.cos(rad) * r]} rotation={[0.4, rad, 0.2]} castShadow>
            <sphereGeometry args={[0.038, 6, 6]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#2d7a44" : "#3dbc60"} roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}
  

 
// ─── CAMERA CONTROLLER ────────────────────────────────────────────────────────
 
function CameraRig({ triggered, onZoomComplete }) {
  const { camera } = useThree();
  const progress = useRef(0);
  const completed = useRef(false);
 
  useEffect(() => {
    camera.position.copy(CAM_START);
    camera.lookAt(CAM_LOOK_AT);
  }, [camera]);
 
  useFrame((_, delta) => {
    if (!triggered || completed.current) return;
 
    progress.current = Math.min(progress.current + delta / ZOOM_DURATION, 1);
 
    // Ease in-out cubic
    const t = progress.current < 0.5
      ? 4 * progress.current ** 3
      : 1 - (-2 * progress.current + 2) ** 3 / 2;
 
    camera.position.lerpVectors(CAM_START, CAM_TARGET_POS, t);
 
    // FOV narrows as we zoom in for dramatic effect
    camera.fov = THREE.MathUtils.lerp(52, 12, t);
    camera.updateProjectionMatrix();
 
    camera.lookAt(CAM_LOOK_AT);
 
    if (progress.current >= 1 && !completed.current) {
      completed.current = true;
      setTimeout(onZoomComplete, 120);
    }
  });
 
  return null;
}
 
// ─── SCENE LIGHTING ───────────────────────────────────────────────────────────
 
function SceneLighting() {
  return (
    <>
      {/* Key light — overhead warm */}
      <directionalLight
        position={[2, 6, 3]}
        intensity={1.8}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      {/* Monitor screen fill — cool blue */}
      <pointLight position={[0, 1.4, 0.8]} intensity={0.9} color="#6ee7f7" distance={3} />
      {/* Keyboard RGB glow */}
      <pointLight position={[0, 0.2, 0.9]} intensity={0.4} color="#a78bfa" distance={1.5} />
      {/* Ambient */}
      <ambientLight intensity={0.35} color="#b0c4de" />
      {/* Rim light from behind */}
      <directionalLight position={[-3, 4, -4]} intensity={0.5} color="#fbbf24" />
    </>
  );
}
 
// ─── FULL 3D SCENE (inside Canvas) ───────────────────────────────────────────
 
function Scene({ triggered, onZoomComplete }) {
  const [blinkOn, setBlinkOn] = useState(true);
 
  useEffect(() => {
    const id = setInterval(() => setBlinkOn(b => !b), 600);
    return () => clearInterval(id);
  }, []);
 
  return (
    <>
      <PerspectiveCamera makeDefault fov={52} near={0.01} far={100} />
      <CameraRig triggered={triggered} onZoomComplete={onZoomComplete} />
      <SceneLighting />
 
      {/* Floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.94, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f0f0" roughness={0.9} />
      </mesh>
 
      {/* Back wall */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#d1c0a1" roughness={1} />
      </mesh>
 
 
      <group position={[0, -0.04, 0]}>
        <Desk />
        <Monitor blinkOn={blinkOn} />
        <Keyboard />
        <Mouse />
        <MousePad />
        <CoffeeMug />
        <Plant />
      </group>
 
     
    </>
  );
}
 
 

// ─── MAIN INTRO SCENE ────────────────────────────────────────────────────────
 
/**
 * @param {Object}   props
 * @param {Function} props.onEnter  — called once the camera zoom finishes
 */
export default function IntroScene({ onEnter }) {
  const [triggered, setTriggered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [gone, setGone] = useState(false);
  const hasTriggered = useRef(false);
 
  const handleEnter = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setTriggered(true);
  }, []);
 
  const handleZoomComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setGone(true);
      onEnter?.();
    }, 600);
  }, [onEnter]);
 
  useEffect(() => {
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [handleEnter]);
 
  if (gone) return null;
 
  return (
    <div
      onClick={handleEnter}
      style={{
        position: "fixed", inset: 0, zIndex: 1000, cursor: triggered ? "default" : "pointer",
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut ? "opacity 0.55s ease" : "none",
        background: "#fafaf7",
      }}
    >
      {/* Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene triggered={triggered} onZoomComplete={handleZoomComplete} />
        </Suspense>
      </Canvas>
 
      {/* Vignette overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
      }} />
 
      {/* Corner HUD — top left */}
      <div style={{
        position: "absolute", top: 24, left: 28,
        fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(110,231,247,0.5)",
        letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.8,
        pointerEvents: "none",
      }}>
        <div>System Ready</div>
        <div style={{ color: "rgba(255,255,255,0.2)" }}>v2.0.0 · 2026</div>
      </div>
 
      {/* Corner HUD — top right */}
      <div style={{
        position: "absolute", top: 24, right: 28, textAlign: "right",
        fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(110,231,247,0.5)",
        letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1.8,
        pointerEvents: "none",
      }}>
        <LiveClock />
      </div>
 
      {/* Bottom prompt */}
      {!triggered && (
        <BottomPrompt />
      )}
 
      {/* Zoom progress bar */}
      {triggered && (
        <ZoomProgressBar duration={ZOOM_DURATION} />
      )}
    </div>
  );
}
 
// ─── HUD HELPERS ─────────────────────────────────────────────────────────────
 
function LiveClock() {
  const [t, setT] = useState(() => new Date().toLocaleTimeString());
  useEffect(() => {
    const id = setInterval(() => setT(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(id);
  }, []);
  return <div>{t}</div>;
}
 
function BottomPrompt() {
  const [vis, setVis] = useState(false);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t1 = setTimeout(() => setVis(true), 800);
    const t2 = setInterval(() => setBlink(b => !b), 650);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);
  return (
    <div style={{
      position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      opacity: vis ? 1 : 0, transition: "opacity 0.9s ease",
      pointerEvents: "none",
    }}>
      {/* Animated mouse icon */}
      <div style={{ width: 22, height: 34, border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 11, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 5 }}>
        <div style={{ width: 2, height: 7, background: "rgba(255,255,255,0.5)", borderRadius: 1, animation: "scrollDot 1.4s ease-in-out infinite" }} />
        <style>{`
          @keyframes scrollDot {
            0%,100%{transform:translateY(0);opacity:1}
            60%{transform:translateY(5px);opacity:0.3}
          }
        `}</style>
      </div>
      <span style={{
        fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.22em",
        textTransform: "uppercase", color: blink ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)",
        transition: "color 0.15s",
      }}>
        Click or press any key to enter
      </span>
    </div>
  );
}
 
function ZoomProgressBar({ duration }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = requestAnimationFrame(function tick() {
      const elapsed = (performance.now() - start) / 1000;
      setW(Math.min(elapsed / duration, 1));
      if (elapsed < duration) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [duration]);
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.05)" }}>
      <div style={{ height: "100%", width: `${w * 100}%`, background: "linear-gradient(90deg,#6ee7f7,#a78bfa)", transition: "width 0.1s linear", boxShadow: "0 0 8px rgba(110,231,247,0.6)" }} />
    </div>
  );
}
 