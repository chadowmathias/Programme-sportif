import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Trash2, 
  Clock, 
  Dumbbell, 
  Check, 
  History, 
  Sparkles, 
  MessageSquare, 
  Info, 
  Award,
  BookOpen,
  Zap
} from 'lucide-react';

import { WORKOUT_PROGRAM, WEEKDAYS } from './data/program';
import { 
  getWorkoutHistory, 
  saveWorkoutSession, 
  getLatestExerciseSession,
  saveActiveSessionDraft,
  getActiveSessionDraft,
  clearActiveSessionDraft
} from './utils/storage';

import BottomNav from './components/BottomNav';
import TimerWidget from './components/TimerWidget';
import HistoryModal from './components/HistoryModal';
import LegendModal from './components/LegendModal';

export default function App() {
  const [tab, setTab] = useState('workout'); // 'workout', 'history', 'legend'
  const [selectedDay, setSelectedDay] = useState(null); // null = Home, 1-7 = Workout detail
  const [exerciseLogs, setExerciseLogs] = useState({}); // Logs for active workout (reps and comments only)
  const [history, setHistory] = useState([]);
  
  // Timer States
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Modal States
  const [activeHistoryExercise, setActiveHistoryExercise] = useState(null);
  const [isLegendModalOpen, setIsLegendModalOpen] = useState(false);
  
  // Celebration Toast
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedWorkoutName, setCompletedWorkoutName] = useState('');
  const [confetti, setConfetti] = useState([]);

  // Get current day of week (1: Mon, ..., 7: Sun)
  const currentDayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();

  // Load history on mount
  useEffect(() => {
    setHistory(getWorkoutHistory());
  }, []);

  // When selectedDay changes, initialize or load draft
  useEffect(() => {
    if (selectedDay !== null) {
      const dayProgram = WORKOUT_PROGRAM[selectedDay];
      if (dayProgram && !dayProgram.restDay) {
        const draft = getActiveSessionDraft(selectedDay);
        if (draft) {
          setExerciseLogs(draft);
        } else {
          // Initialize empty logs for all exercises (reps and completed status only)
          const initialLogs = {};
          dayProgram.exercises.forEach(ex => {
            const latest = getLatestExerciseSession(ex.name);
            const setsArray = [];
            for (let i = 0; i < ex.sets; i++) {
              setsArray.push({
                reps: '',
                completed: false,
                placeholderReps: latest && latest.sets[i] ? latest.sets[i].reps : ''
              });
            }
            initialLogs[ex.id] = {
              name: ex.name,
              sets: setsArray,
              notes: ''
            };
          });
          setExerciseLogs(initialLogs);
        }
      }
    }
  }, [selectedDay]);

  // Auto-save draft when log details change
  useEffect(() => {
    if (selectedDay !== null && Object.keys(exerciseLogs).length > 0) {
      saveActiveSessionDraft(selectedDay, exerciseLogs);
    }
  }, [exerciseLogs, selectedDay]);

  // Handle set detail changes (reps)
  const handleSetChange = (exId, setIndex, field, value) => {
    setExerciseLogs(prev => {
      const updatedLogs = { ...prev };
      const updatedSets = [...updatedLogs[exId].sets];
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        [field]: value
      };
      updatedLogs[exId] = {
        ...updatedLogs[exId],
        sets: updatedSets
      };
      return updatedLogs;
    });
  };

  // Handle note change
  const handleNoteChange = (exId, value) => {
    setExerciseLogs(prev => {
      const updatedLogs = { ...prev };
      updatedLogs[exId] = {
        ...updatedLogs[exId],
        notes: value
      };
      return updatedLogs;
    });
  };

  // Toggle set completed checkbox
  const handleToggleSetCompleted = (exId, setIndex, targetRestStr, targetRestSec) => {
    setExerciseLogs(prev => {
      const updatedLogs = { ...prev };
      const updatedSets = [...updatedLogs[exId].sets];
      const isCompleting = !updatedSets[setIndex].completed;
      
      updatedSets[setIndex] = {
        ...updatedSets[setIndex],
        completed: isCompleting
      };
      updatedLogs[exId] = {
        ...updatedLogs[exId],
        sets: updatedSets
      };

      // Trigger rest timer only if marking as completed and rest is valid
      if (isCompleting && targetRestSec > 0) {
        setTimeRemaining(targetRestSec);
        setTargetTime(targetRestSec);
        setIsTimerActive(true);
      }

      return updatedLogs;
    });
  };

  // Validate and Save Workout
  const handleSaveWorkout = () => {
    const dayProgram = WORKOUT_PROGRAM[selectedDay];
    let hasCompletedSets = false;
    const formattedExercises = {};

    Object.keys(exerciseLogs).forEach(exId => {
      const exLog = exerciseLogs[exId];
      const completedSets = exLog.sets.filter(s => s.completed && s.reps !== '');
      
      if (completedSets.length > 0) {
        hasCompletedSets = true;
        formattedExercises[exLog.name] = {
          sets: completedSets.map(s => ({
            reps: parseInt(s.reps, 10),
            completed: true
          })),
          notes: exLog.notes
        };
      }
    });

    if (!hasCompletedSets) {
      alert("Erreur: Remplissez et cochez au moins une série (répétitions) pour enregistrer.");
      return;
    }

    const session = {
      date: new Date().toISOString(),
      dayIndex: selectedDay,
      dayName: dayProgram.name,
      exercises: formattedExercises
    };

    const success = saveWorkoutSession(session);
    if (success) {
      clearActiveSessionDraft(selectedDay);
      setHistory(getWorkoutHistory());
      setCompletedWorkoutName(dayProgram.name);
      
      // Generate 80 colorful confetti particles
      const particles = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 8 + 6,
        color: ['#ccff00', '#00f0ff', '#ff5500', '#a855f7', '#ef4444'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 1.5,
        duration: Math.random() * 2 + 1.5,
        angle: Math.random() * 360,
        drift: `${Math.random() * 30 - 15}vw`
      }));
      setConfetti(particles);
      
      setShowCelebration(true);
      setSelectedDay(null);
      
      // Auto-hide celebration toast and clear particles after 5s
      setTimeout(() => {
        setShowCelebration(false);
        setConfetti([]);
      }, 5000);
    }
  };

  // Delete all history
  const handleDeleteHistory = () => {
    if (window.confirm("Es-tu sûr de vouloir effacer tout ton historique ? Cette action est irréversible.")) {
      localStorage.removeItem("ppl_arnold_workout_history_v2");
      setHistory([]);
    }
  };

  // Helper to format date
  const formatFrenchDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate training streak
  const calculateStreak = () => {
    if (history.length === 0) return 0;
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentWorkouts = history.filter(h => new Date(h.date) >= oneWeekAgo);
    return recentWorkouts.length;
  };

  return (
    <div className="mobile-wrapper">
      {/* Confetti particles overlay */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-particle"
          style={{
            left: `${c.x}%`,
            backgroundColor: c.color,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            transform: `rotate(${c.angle}deg)`,
            '--drift': c.drift
          }}
        />
      ))}

      {/* Rest Timer floating widget */}
      <TimerWidget 
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        isTimerActive={isTimerActive}
        setIsTimerActive={setIsTimerActive}
        targetTime={targetTime}
      />

      {/* Main content container */}
      <div className="screen-container">
        
        {/* CELEBRATION TOAST */}
        {showCelebration && (
          <div className="card fade-in" style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            zIndex: 500,
            background: 'linear-gradient(135deg, var(--accent-lime), #8aff00)',
            color: 'var(--text-dark)',
            border: 'none',
            boxShadow: '0 10px 30px rgba(204, 255, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 16,
            borderRadius: 'var(--radius-lg)'
          }}>
            <Award size={32} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: 800, fontSize: 16 }}>Félicitations ! 🎉</h4>
              <p style={{ fontSize: 13, fontWeight: 500 }}>Séance <strong>{completedWorkoutName}</strong> validée et enregistrée.</p>
            </div>
          </div>
        )}

        {/* WORKOUT TAB */}
        {tab === 'workout' && (
          <>
            {/* Dashboard / Day selector */}
            {selectedDay === null ? (
              <div className="fade-in">
                <div className="header">
                  <div>
                    <h1 className="header-title">PPL x Arnold</h1>
                    <p className="header-subtitle">Visualiseur &amp; Surcharge Progressive</p>
                  </div>
                  <Zap size={24} style={{ color: 'var(--accent-lime)' }} />
                </div>

                {/* Quick stats */}
                <div className="stats-row">
                  <div className="stat-box">
                    <div className="stat-value">{history.length}</div>
                    <div className="stat-label">Séances totales</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-value">{calculateStreak()}</div>
                    <div className="stat-label">Entraînements / 7j</div>
                  </div>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: 'var(--text-main)' }}>
                  Programme de la semaine
                </h3>

                {/* Weekly Grid */}
                <div className="grid-days">
                  {WEEKDAYS.map((day) => {
                    const isToday = day.id === currentDayOfWeek;
                    const programDay = WORKOUT_PROGRAM[day.id];
                    
                    return (
                      <div 
                        key={day.id}
                        onClick={() => setSelectedDay(day.id)}
                        className={`day-card card-hover ${isToday ? 'day-card-active' : ''}`}
                      >
                        <div>
                          <div className="day-number">Jour {day.id} {isToday && "• Aujourd'hui"}</div>
                          <div className="day-name">{day.name}</div>
                        </div>
                        <div>
                          {programDay.restDay ? (
                            <span className="day-workout day-workout-repos">Repos</span>
                          ) : (
                            <span className="day-workout">{programDay.exercises.length} Exos</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Workout Detail view */
              <div className="fade-in">
                {/* Header detail */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button className="btn-icon" onClick={() => setSelectedDay(null)} aria-label="Retour">
                      <ChevronLeft size={24} />
                    </button>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5 }}>
                        Jour {selectedDay} : {WORKOUT_PROGRAM[selectedDay].name}
                      </h2>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {WORKOUT_PROGRAM[selectedDay].description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Dedicated Legend Button on active session */}
                  {!WORKOUT_PROGRAM[selectedDay].restDay && (
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setIsLegendModalOpen(true)}
                      style={{ padding: '6px 12px', fontSize: 12, gap: 4, borderRadius: 'var(--radius-sm)' }}
                    >
                      <Info size={14} style={{ color: 'var(--accent-lime)' }} />
                      <span>Légende</span>
                    </button>
                  )}
                </div>

                {/* If Rest Day */}
                {WORKOUT_PROGRAM[selectedDay].restDay ? (
                  <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Sparkles size={48} style={{ color: 'var(--accent-lime)', marginBottom: 16, margin: '0 auto 16px auto' }} />
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Récupération Active</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                      Aujourd'hui est un jour de repos. Profites-en pour bien récupérer, t'étirer et t'hydrater. La croissance musculaire se produit pendant le repos !
                    </p>
                    <button className="btn btn-secondary" onClick={() => setSelectedDay(null)}>
                      Retour au programme
                    </button>
                  </div>
                ) : (
                  /* Active exercise log list (reps only, no weights) */
                  <div>
                    {WORKOUT_PROGRAM[selectedDay].exercises.map((ex) => {
                      const log = exerciseLogs[ex.id] || { sets: [], notes: '' };
                      
                      return (
                        <div key={ex.id} className="card">
                          
                          {/* Exercise Header */}
                          <div className="exercise-header">
                            <div>
                              <h4 className="exercise-title">{ex.name}</h4>
                              <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                                <span className={`badge ${
                                  ex.intensity.includes('RIR') ? 'badge-rir' : 
                                  ex.intensity.includes('Échec') ? 'badge-echec' : 'badge-drop'
                                }`}>
                                  {ex.intensity}
                                </span>
                                <span className="badge badge-repos">
                                  <Clock size={10} style={{ marginRight: 4 }} /> {ex.rest}
                                </span>
                                {ex.superset && (
                                  <span className="superset-badge">{ex.superset}</span>
                                )}
                              </div>
                            </div>
                            
                            {/* History button for specific exercise */}
                            <button 
                              className="btn-secondary btn"
                              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', fontSize: 12, gap: 4 }}
                              onClick={() => setActiveHistoryExercise(ex.name)}
                            >
                              <History size={13} />
                              <span>Logs</span>
                            </button>
                          </div>

                          {ex.note && (
                            <div className="exercise-instruction-note">
                              <strong>Note :</strong> {ex.note}
                            </div>
                          )}

                          {/* Sets Input Grid - Reps only */}
                          <table className="logbook-table">
                            <thead>
                              <tr>
                                <th className="logbook-th" style={{ width: '60px' }}>Série</th>
                                <th className="logbook-th">Répétitions</th>
                                <th className="logbook-th" style={{ width: '60px' }}>Fait</th>
                              </tr>
                            </thead>
                            <tbody>
                              {log.sets.map((set, setIdx) => {
                                const isCompleted = set.completed;
                                return (
                                  <tr key={setIdx} className={`set-row ${isCompleted ? 'set-row-completed' : ''}`}>
                                    {/* Set Index */}
                                    <td className="set-cell">
                                      <div className={`set-index ${isCompleted ? 'set-index-completed' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 700 }}>S{setIdx + 1}</span>
                                        {setIdx === ex.sets - 1 && ex.intensity.toLowerCase().includes("drop set") && (
                                          <span style={{ fontSize: '8px', color: 'var(--accent-purple)', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.2px' }}>
                                            Drop
                                          </span>
                                        )}
                                        {setIdx === ex.sets - 1 && ex.intensity.toLowerCase().includes("échec") && (
                                          <span style={{ fontSize: '8px', color: 'var(--accent-red)', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px', letterSpacing: '0.2px' }}>
                                            Échec
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    
                                    {/* Reps Input */}
                                    <td className="set-cell">
                                      <input
                                        type="number"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        placeholder={set.placeholderReps || ex.reps}
                                        value={set.reps}
                                        onChange={(e) => handleSetChange(ex.id, setIdx, 'reps', e.target.value)}
                                        className="logbook-input"
                                        style={{ width: '100px', fontSize: '16px' }}
                                        disabled={isCompleted}
                                      />
                                    </td>
                                    
                                    {/* Checkbox button */}
                                    <td className="set-cell">
                                      <button
                                        onClick={() => handleToggleSetCompleted(ex.id, setIdx, ex.rest, ex.targetRestSeconds)}
                                        className={`check-btn ${isCompleted ? 'check-btn-checked' : ''}`}
                                        aria-label={`Série ${setIdx + 1} faite`}
                                      >
                                        <Check size={18} strokeWidth={3} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>

                          {/* Exercise Observations Notes */}
                          <textarea
                            placeholder="Notes, sensations, marge de progression..."
                            value={log.notes}
                            onChange={(e) => handleNoteChange(ex.id, e.target.value)}
                            rows="2"
                            className="notes-input"
                          />
                        </div>
                      );
                    })}

                    {/* Bottom Save Action */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 40 }}>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => {
                          if (window.confirm("Es-tu sûr de vouloir abandonner cette séance ? Les données en cours seront effacées.")) {
                            clearActiveSessionDraft(selectedDay);
                            setSelectedDay(null);
                          }
                        }}
                        style={{ flex: 1 }}
                      >
                        Abandonner
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={handleSaveWorkout}
                        style={{ flex: 2 }}
                      >
                        Terminer la séance
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* HISTORY TAB */}
        {tab === 'history' && (
          <div className="fade-in">
            <div className="header">
              <div>
                <h1 className="header-title">Journal de Bord</h1>
                <p className="header-subtitle">Historique de tes performances</p>
              </div>
              {history.length > 0 && (
                <button 
                  className="btn-icon" 
                  onClick={handleDeleteHistory}
                  style={{ color: 'var(--accent-red)' }}
                  aria-label="Effacer tout l'historique"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                <History size={40} style={{ color: '#27272a', marginBottom: 12, margin: '0 auto 12px auto' }} />
                <p style={{ fontSize: 14, marginBottom: 4 }}>Aucune séance enregistrée pour le moment.</p>
                <p style={{ fontSize: 12 }}>Va dans l'onglet Entraînement et valide ta séance du jour !</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {history.map((session, index) => (
                  <div key={index} className="card">
                    {/* History Card Header */}
                    <div className="history-header">
                      <span className="history-date">{formatFrenchDate(session.date)}</span>
                      <span className="history-name">{session.dayName}</span>
                    </div>

                    {/* Exercise List in session */}
                    <div>
                      {Object.keys(session.exercises).map((exName) => {
                        const exData = session.exercises[exName];
                        return (
                          <div key={exName} className="history-exercise-row">
                            <div className="history-exercise-name">{exName}</div>
                            
                            {/* Sets list (reps only) */}
                            <div className="history-sets-list">
                              {exData.sets.map((set, setIdx) => (
                                <div key={setIdx} className="history-set-pill">
                                  S{setIdx + 1}: {set.reps} reps
                                </div>
                              ))}
                            </div>

                            {/* Set notes */}
                            {exData.notes && (
                              <div style={{ 
                                display: 'flex', 
                                gap: 6, 
                                margin: '6px 0 10px 0', 
                                fontSize: 11, 
                                color: 'var(--text-muted)',
                                fontStyle: 'italic'
                              }}>
                                <MessageSquare size={11} style={{ marginTop: 2, flexShrink: 0 }} />
                                <span>{exData.notes}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LEGEND TAB */}
        {tab === 'legend' && (
          <div className="fade-in">
            <div className="header">
              <div>
                <h1 className="header-title">Légende</h1>
                <p className="header-subtitle">Comprendre les intensités d'effort</p>
              </div>
              <BookOpen size={24} style={{ color: 'var(--accent-lime)' }} />
            </div>

            <div className="card">
              {/* RIR 1-2 Definition */}
              <div className="legend-item">
                <h3 className="legend-title" style={{ color: 'var(--accent-cyan)' }}>
                  <span className="badge badge-rir" style={{ fontSize: 10 }}>RIR 1-2</span>
                  Reps in Reserve 1-2
                </h3>
                <p className="legend-desc">
                  Indique que tu t'arrêtes alors qu'il te reste 1 ou 2 répétitions possibles en réserve. Utile pour accumuler du volume d'entraînement avec une exécution parfaite.
                </p>
              </div>

              {/* RIR 1 Definition */}
              <div className="legend-item">
                <h3 className="legend-title" style={{ color: 'var(--accent-cyan)' }}>
                  <span className="badge badge-rir" style={{ fontSize: 10 }}>RIR 1</span>
                  Reps in Reserve 1
                </h3>
                <p className="legend-desc">
                  Indique que tu t'arrêtes à 1 seule répétition de l'échec musculaire. L'effort est très intense et exigeant.
                </p>
              </div>

              {/* Failure Definition */}
              <div className="legend-item">
                <h3 className="legend-title" style={{ color: 'var(--accent-red)' }}>
                  <span className="badge badge-echec" style={{ fontSize: 10 }}>Échec</span>
                  Échec Musculaire Technique
                </h3>
                <p className="legend-desc">
                  Signifie effectuer des répétitions jusqu'à ce que tu sois incapable de faire le mouvement complet avec une technique propre. La série s'arrête dès que le geste se dégrade.
                </p>
              </div>

              {/* Drop Set Definition */}
              <div className="legend-item">
                <h3 className="legend-title" style={{ color: 'var(--accent-purple)' }}>
                  <span className="badge badge-drop" style={{ fontSize: 10 }}>Drop Set</span>
                  Série Dégressive
                </h3>
                <p className="legend-desc">
                  Faire une série normale jusqu'à l'échec, puis <strong>diminuer immédiatement la charge de 20% à 30%</strong> et recommencer immédiatement à pousser jusqu'au nouvel échec technique, sans temps de repos.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Navigation menu docked at the bottom */}
      <BottomNav currentTab={tab} setTab={(t) => { setTab(t); setSelectedDay(null); }} />

      {/* History modal for individual exercises */}
      <HistoryModal
        exerciseName={activeHistoryExercise}
        isOpen={activeHistoryExercise !== null}
        onClose={() => setActiveHistoryExercise(null)}
      />

      {/* Quick Legend Modal accessible during session */}
      <LegendModal 
        isOpen={isLegendModalOpen}
        onClose={() => setIsLegendModalOpen(false)}
      />
    </div>
  );
}
