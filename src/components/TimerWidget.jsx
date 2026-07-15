import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Plus, Bell, X, RotateCcw } from 'lucide-react';

export default function TimerWidget({ timeRemaining, setTimeRemaining, isTimerActive, setIsTimerActive, targetTime }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Haptic feedback utility
  const triggerHaptic = (pattern = 10) => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        console.warn("Haptic feedback error:", e);
      }
    }
  };

  // Play a premium crystal bell sound when timer completes
  const playCompletionSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioCtx = new AudioContextClass();
      
      const playBellTone = (frequency, gainVal, duration) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      };

      // Synthesize beautiful metallic bell sound with harmonic overtones
      playBellTone(880, 0.25, 1.5);   // Fundamental note (A5)
      playBellTone(1320, 0.15, 1.2);  // Perfect fifth (E6)
      playBellTone(1760, 0.10, 0.8);  // Octave (A6)
      playBellTone(2200, 0.05, 0.5);  // Major third overtone (C#7)
    } catch (e) {
      console.warn("AudioContext failed to play:", e);
    }
  };

  // Timer Tick logic
  useEffect(() => {
    if (isTimerActive && isPlaying && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerActive(false);
            playCompletionSound();
            triggerHaptic([200, 100, 200, 100, 300]); // 3-pulse premium vibration
            setIsFullscreen(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, isPlaying, timeRemaining]);

  // If timer is disabled externally, clean interval
  useEffect(() => {
    if (!isTimerActive) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isTimerActive]);

  if (!isTimerActive) return null;

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    triggerHaptic(15);
    setIsPlaying(!isPlaying);
  };

  const handleAdd30Sec = (e) => {
    e.stopPropagation();
    triggerHaptic(15);
    setTimeRemaining((prev) => prev + 30);
  };

  const handleRemove30Sec = (e) => {
    e.stopPropagation();
    triggerHaptic(15);
    setTimeRemaining((prev) => Math.max(0, prev - 30));
  };

  const handleStop = (e) => {
    e.stopPropagation();
    triggerHaptic(25);
    setIsTimerActive(false);
    setIsFullscreen(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const percentProgress = targetTime > 0 ? ((targetTime - timeRemaining) / targetTime) * 100 : 0;
  const strokeDashoffset = 565.48 - (565.48 * percentProgress) / 100;

  return (
    <>
      {/* Floating Mini Widget */}
      {!isFullscreen && (
        <div className="timer-widget" onClick={() => setIsFullscreen(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bell size={13} className="fade-in" style={{ animation: 'bounce 1s infinite alternate', flexShrink: 0 }} />
            <span>{formatTime(timeRemaining)}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: '4px' }}>
            {/* Quick -30s */}
            <button 
              onClick={handleRemove30Sec} 
              className="btn-icon" 
              style={{ width: 22, height: 22, padding: 0, fontSize: 10, fontWeight: 900, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', border: '1px solid rgba(255,85,0,0.15)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="-30s"
            >
              -30
            </button>
            
            {/* Play/Pause */}
            <button 
              onClick={handleTogglePlay} 
              className="btn-icon" 
              style={{ width: 22, height: 22, padding: 0, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', border: '1px solid rgba(255,85,0,0.15)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
            </button>

            {/* Quick +30s */}
            <button 
              onClick={handleAdd30Sec} 
              className="btn-icon" 
              style={{ width: 22, height: 22, padding: 0, fontSize: 10, fontWeight: 900, background: 'rgba(255,255,255,0.06)', borderRadius: '4px', border: '1px solid rgba(255,85,0,0.15)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="+30s"
            >
              +30
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Rest Timer Overlay */}
      {isFullscreen && (
        <div className="timer-fullscreen">
          <button className="btn-icon" onClick={() => setIsFullscreen(false)} style={{ position: 'absolute', top: 'calc(20px + env(safe-area-inset-top))', right: 20, zIndex: 1010 }}>
            <X size={24} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, marginBottom: 4 }}>
              Temps de Récupération
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              Détendez vos muscles et respirez profondément.
            </p>
          </div>

          {/* Circular Countdown Progress */}
          <div className="timer-circle timer-circle-glow">
            {/* SVG circle track and fill */}
            <svg width="220" height="220" style={{ position: 'absolute', transform: 'rotate(-90deg)', top: -14, left: -14 }}>
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke="rgba(255, 85, 0, 0.05)"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke="var(--accent-orange)"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="565.48"
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>

            <span className="timer-time">{formatTime(timeRemaining)}</span>
            <span className="timer-label">{isPlaying ? 'Repos en cours' : 'Rest en pause'}</span>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 20px' }}>
            {/* Stop / Skip */}
            <button className="btn btn-secondary" onClick={handleStop} style={{ borderRadius: '50%', width: 56, height: 56, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Square size={20} fill="var(--text-main)" />
            </button>

            {/* Remove 30s */}
            <button className="btn btn-secondary" onClick={handleRemove30Sec} style={{ borderRadius: '50%', width: 56, height: 56, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>-30</span>
              <span style={{ fontSize: 8, textTransform: 'uppercase', fontWeight: 600, opacity: 0.8, marginTop: -2 }}>sec</span>
            </button>

            {/* Play / Pause */}
            <button className="btn btn-primary" onClick={handleTogglePlay} style={{ borderRadius: '50%', width: 72, height: 72, padding: 0, backgroundColor: 'var(--accent-orange)', boxShadow: '0 0 20px rgba(255, 85, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isPlaying ? <Pause size={28} fill="var(--text-dark)" /> : <Play size={28} fill="var(--text-dark)" />}
            </button>

            {/* Add 30s */}
            <button className="btn btn-secondary" onClick={handleAdd30Sec} style={{ borderRadius: '50%', width: 56, height: 56, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>+30</span>
              <span style={{ fontSize: 8, textTransform: 'uppercase', fontWeight: 600, opacity: 0.8, marginTop: -2 }}>sec</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
