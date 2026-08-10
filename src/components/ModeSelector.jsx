import React from 'react';
import { Palmtree, ShieldCheck } from 'lucide-react';

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <div className="mode-selector-wrapper">
      <div className="mode-selector">
        <button
          className={`mode-button ${mode === 'idcard' ? 'active' : ''}`}
          onClick={() => onModeChange('idcard')}
          type="button"
        >
          <ShieldCheck size={18} /> Builder ID Card (3:4)
        </button>

        <button
          className={`mode-button ${mode === 'pfp' ? 'active' : ''}`}
          onClick={() => onModeChange('pfp')}
          type="button"
        >
          <Palmtree size={18} /> PFP Frame (1:1)
        </button>
      </div>
    </div>
  );
}
