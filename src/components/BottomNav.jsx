import React from 'react';
import { Dumbbell, History, BookOpen } from 'lucide-react';

export default function BottomNav({ currentTab, setTab }) {
  const navItems = [
    { id: 'workout', label: 'Entraînement', icon: Dumbbell },
    { id: 'history', label: 'Historique', icon: History },
    { id: 'legend', label: 'Légende', icon: BookOpen }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            aria-label={item.label}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
