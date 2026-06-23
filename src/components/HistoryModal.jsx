import React from 'react';
import { X, Calendar, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { getExerciseHistory } from '../utils/storage';

export default function HistoryModal({ exerciseName, isOpen, onClose }) {
  if (!isOpen) return null;

  const historyLogs = getExerciseHistory(exerciseName);

  // Format date to local French format (e.g., "24 juin 2026")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate progressive overload indicators (Reps progression)
  const calculateProgression = () => {
    if (historyLogs.length < 2) return null;
    
    // History is newest first
    const newestSession = historyLogs[0];
    const oldestSession = historyLogs[historyLogs.length - 1];
    
    // Get max reps achieved in a single set for newest vs oldest
    const getMaxReps = (session) => {
      const repsArray = session.sets.map(s => parseInt(s.reps, 10) || 0);
      return Math.max(...repsArray, 0);
    };

    const newestMax = getMaxReps(newestSession);
    const oldestMax = getMaxReps(oldestSession);
    const difference = newestMax - oldestMax;

    return {
      oldestMax,
      newestMax,
      difference,
      isProgression: difference > 0,
      isStable: difference === 0
    };
  };

  const progression = calculateProgression();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-main)' }}>Historique</h3>
            <p style={{ color: 'var(--accent-lime)', fontSize: 13, fontWeight: 600 }}>{exerciseName}</p>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Progression Overview Card */}
        {progression && (
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(204, 255, 0, 0.03)', borderColor: 'rgba(204, 255, 0, 0.15)', marginBottom: 20 }}>
            <div style={{ background: 'rgba(204, 255, 0, 0.1)', padding: 10, borderRadius: '50%', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Progression Globale</p>
              <h4 style={{ fontSize: 16, fontWeight: 700 }}>
                {progression.isProgression ? (
                  <span style={{ color: 'var(--accent-lime)' }}>+{progression.difference} rep{progression.difference > 1 ? 's' : ''} max !</span>
                ) : progression.isStable ? (
                  <span style={{ color: 'var(--accent-cyan)' }}>Répétitions stables ({progression.newestMax} reps)</span>
                ) : (
                  <span style={{ color: 'var(--accent-orange)' }}>Dernier max : {progression.newestMax} reps (Initial : {progression.oldestMax} reps)</span>
                )}
              </h4>
            </div>
          </div>
        )}

        {/* List of Sessions */}
        {historyLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <Award size={40} style={{ marginBottom: 12, color: '#3f3f46' }} />
            <p style={{ fontSize: 14, marginBottom: 4 }}>Aucun historique pour le moment.</p>
            <p style={{ fontSize: 12 }}>Tes performances s'afficheront ici après avoir validé ta première séance.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {historyLogs.map((log, index) => (
              <div key={index} className="card" style={{ padding: 14, marginBottom: 0 }}>
                {/* Session Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 12 }}>
                    <Calendar size={14} />
                    <span>{formatDate(log.date)}</span>
                  </div>
                  <span className="badge badge-rir" style={{ fontSize: 10 }}>
                    {log.dayName}
                  </span>
                </div>

                {/* Sets Grid */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: log.notes ? 10 : 0 }}>
                  {log.sets.map((set, setIdx) => (
                    <div key={setIdx} className="history-set-pill">
                      <strong style={{ color: 'var(--accent-lime)' }}>S{setIdx + 1}</strong>: {set.reps} reps
                    </div>
                  ))}
                </div>

                {/* Session Notes */}
                {log.notes && (
                  <div style={{ display: 'flex', gap: 6, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: 12, color: 'var(--text-muted)' }}>
                    <MessageSquare size={13} style={{ flexShrink: 0, marginTop: 2, color: 'var(--accent-cyan)' }} />
                    <p style={{ fontStyle: 'italic', wordBreak: 'break-word' }}>{log.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
