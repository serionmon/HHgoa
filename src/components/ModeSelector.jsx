import React from 'react';
import { ShieldCheck, Palmtree, Users } from 'lucide-react';

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <div className="mode-selector-wrapper">
      <div className="mode-selector-label">✦ SELECT GRAPHIC FORMAT</div>
      <div className="mode-selector-segmented">
        <button
          className={`segmented-ticket-btn ${mode === 'idcard' ? 'active' : ''}`}
          onClick={() => onModeChange('idcard')}
          type="button"
          aria-pressed={mode === 'idcard'}
        >
          <div className="ticket-btn-content">
            <span className="ticket-title"><ShieldCheck size={18} /> BUILDER ID CARD</span>
            <span className="ticket-ratio-badge">3:4</span>
          </div>
        </button>

        <button
          className={`segmented-ticket-btn ${mode === 'pfp' ? 'active' : ''}`}
          onClick={() => onModeChange('pfp')}
          type="button"
          aria-pressed={mode === 'pfp'}
        >
          <div className="ticket-btn-content">
            <span className="ticket-title"><Palmtree size={18} /> PFP FRAME</span>
            <span className="ticket-ratio-badge">1:1</span>
          </div>
        </button>

        <button
          className={`segmented-ticket-btn ${mode === 'team' ? 'active' : ''}`}
          onClick={() => onModeChange('team')}
          type="button"
          aria-pressed={mode === 'team'}
        >
          <div className="ticket-btn-content">
            <span className="ticket-title"><Users size={18} /> TEAM FRAME</span>
            <span className="ticket-ratio-badge">16:9</span>
          </div>
        </button>
      </div>
    </div>
  );
}



