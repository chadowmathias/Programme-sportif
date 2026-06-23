import React from 'react';
import { X, Info, Zap, AlertTriangle } from 'lucide-react';

export default function LegendModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1500 }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Info size={22} style={{ color: 'var(--accent-lime)' }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-main)' }}>Légende des Intensités</h3>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        {/* Legend Content */}
        <div style={{ display: 'flex', flexContainer: 'column', flexDirection: 'column', gap: 16 }}>
          
          {/* RIR 1-2 */}
          <div className="legend-item">
            <h4 style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700 }}>
              <span className="badge badge-rir" style={{ fontSize: 10 }}>RIR 1-2</span>
              Reps in Reserve 1-2
            </h4>
            <p className="legend-desc">
              S'arrêter lorsqu'il te reste <strong>1 ou 2 répétitions possibles</strong> en réserve. Tu as encore de la marge, l'exécution reste propre et rapide.
            </p>
          </div>

          {/* RIR 1 */}
          <div className="legend-item">
            <h4 style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700 }}>
              <span className="badge badge-rir" style={{ fontSize: 10, borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>RIR 1</span>
              Reps in Reserve 1
            </h4>
            <p className="legend-desc">
              S'arrêter lorsqu'il te reste <strong>exactement 1 répétition possible</strong>. La dernière répétition est difficile et lente, mais réussie avec une bonne forme.
            </p>
          </div>

          {/* Échec */}
          <div className="legend-item">
            <h4 style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700 }}>
              <span className="badge badge-echec" style={{ fontSize: 10 }}>Échec</span>
              Échec Technique
            </h4>
            <p className="legend-desc">
              Pousser la série jusqu'à ce que la fatigue t'empêche de réaliser le mouvement complet avec une exécution parfaite. <strong>Ne pas tricher</strong> : dès que la posture se dégrade, la série s'arrête.
            </p>
          </div>

          {/* Drop Set */}
          <div className="legend-item">
            <h4 style={{ color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700 }}>
              <span className="badge badge-drop" style={{ fontSize: 10 }}>Drop Set</span>
              Série Dégressive
            </h4>
            <p className="legend-desc">
              Faire la série jusqu'à l'échec, puis <strong>réduire immédiatement le poids de 20% à 30%</strong> (par exemple, changer de plaque sur une machine ou prendre des haltères plus légers) et continuer directement sans repos jusqu'au nouvel échec.
            </p>
          </div>

          {/* Progressive Overload Tip */}
          <div className="card" style={{ borderLeft: '4px solid var(--accent-lime)', marginTop: 8, background: 'rgba(204, 255, 0, 0.02)', padding: 12 }}>
            <h5 style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={14} style={{ color: 'var(--accent-lime)' }} /> Surcharge progressive
            </h5>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Pour forcer le muscle à s'adapter, tente de battre le nombre de répétitions de la séance précédente sur chaque série.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
