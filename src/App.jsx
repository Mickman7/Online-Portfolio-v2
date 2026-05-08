import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { PROFILE, WINDOWS_CONFIG } from './data/Portfolio-data'
import DesktopIcon from './components/DesktopIcon';
import TaskBar from './components/TaskBar';
import Windows from './components/Windows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import IntroScene from './components/IntroScene';





const App = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowStates, setWindowStates] = useState({});
  const [zOrders, setZOrders] = useState({});
  const [maxZ, setMaxZ] = useState(100);
  const [time, setTime] = useState("");
  const [theme, setTheme] = useState("dark");
  const [showPortfolio, setShowPortfolio] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openWindow = useCallback(
    (id) => {
      setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setWindowStates((prev) => ({
        ...prev,
        [id]: prev[id] || { minimised: false, pos: getInitialPos(id) },
      }));
      setMaxZ((z) => {
        setZOrders((o) => ({ ...o, [id]: z + 1 }));
        return z + 1;
      });
    },
    []
  );

  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setWindowStates((prev) => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindowStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimised: true },
    }));
  }, []);

  const focusWindow = useCallback((id) => {
    setMaxZ((z) => {
      setZOrders((o) => ({ ...o, [id]: z + 1 }));
      return z + 1;
    });
  }, []);

  const taskbarClick = useCallback(
    (id) => {
      const st = windowStates[id];
      if (!st) return;
      if (st.minimised) {
        setWindowStates((prev) => ({ ...prev, [id]: { ...prev[id], minimised: false } }));
        focusWindow(id);
      } else {
        minimizeWindow(id);
      }
    },
    [windowStates, focusWindow, minimizeWindow]
  );

  
  return (
    <>
      <div
      className="w-full h-screen overflow-hidden relative select-none"
      style={{
        background: theme === "dark"
          ? "radial-gradient(ellipse at 30% 20%,rgb(38, 18, 77) 0%,rgb(25, 25, 54) 50%)"
          : "radial-gradient(ellipse at 30% 20%,rgb(221, 219, 209) 0%,rgb(226, 225, 214) 50%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        border: "20px solid #262625",
        boxSizing: "border-box"
      }}
    >
      {!showPortfolio ? (
        <IntroScene onEnter={() => setShowPortfolio(true)} />
      ) : (
        <div className="portfolio-content">
          {/* Your actual site content goes here */}
        </div>
      )}


      {/* Theme toggle */}
      <button
        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors cursor-pointer"
        style={{
          background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
          border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}`,
          color: theme === "dark" ? "#fff" : "#333",
        }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <FontAwesomeIcon icon={faSun} size="l"/>: <FontAwesomeIcon icon={faMoon} size="l"/>}
      </button>

      {/* Subtle star-field */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: theme === "dark"
            ? "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: theme === "dark" ? 0.3 : 0.2,
        }}
      />

      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(110,231,247,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          top: -200,
          left: -100,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: theme === "dark"
            ? "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
          bottom: 0,
          right: 100,
        }}
      />

      {/* Desktop icons */}
      <div className="absolute top-10 left-10 flex flex-col gap-2">
        {WINDOWS_CONFIG.map((cfg) => (
          <DesktopIcon key={cfg.id} cfg={cfg} onClick={openWindow} />
        ))}
      </div>

      {/* Greeting */}
      <div
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -60%)", textAlign: "center", pointerEvents: "none" }}
      >
        <p className={`text-6xl font-bold tracking-tight leading-none ${theme === "dark" ? "text-white/10" : "text-black/10"}`}>
          {`< Welcome To My Portfolio />`}
        </p>
        <p className={`text-sm mt-3 tracking-widest uppercase ${theme === "dark" ? "text-white/10" : "text-black/10"}`}>
          Click an icon to explore
        </p>
      </div>

      {/* Windows */}
      {openWindows.map((id) => {
        const cfg = WINDOWS_CONFIG.find((c) => c.id === id);
        const st = windowStates[id];
        if (!cfg || !st) return null;
        return (
          <Windows
            key={id}
            winCfg={cfg}
            state={st}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
            zIndex={zOrders[id] || 100}
          />
        );
      })}

      {/* Taskbar */}
      <TaskBar
        openWindows={openWindows}
        windowStates={windowStates}
        onTaskbarClick={taskbarClick}
        theme={theme}
      />
      </div>
    </>
  )
}



function getInitialPos(id) {
  const idx = WINDOWS_CONFIG.findIndex((c) => c.id === id);
  return {
    x: 120 + idx * 40,
    y: 80 + idx * 40,
  };
}

export default App
