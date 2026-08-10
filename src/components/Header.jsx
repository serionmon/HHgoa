import React from 'react';
import { Palmtree, Zap, Sun, Waves } from 'lucide-react';

export default function Header() {
  return (
    <header className="header animate-fade-in">
      <div className="header-decor-ribbon">HH GOA 2026</div>

      <div className="header-badges">
        <span className="stamp-badge">
          <Palmtree size={14} /> HACKER HOUSE GOA
        </span>
        <span className="stamp-badge stamp-badge-pink">
          <Zap size={14} /> BUILDER IDENTITY
        </span>
        <span className="stamp-badge" style={{ background: '#ffffff' }}>
          <Sun size={14} color="#ff0055" /> GOA, INDIA
        </span>
      </div>

      <h1 className="header-title">
        MAKE YOUR MARK. <span>HH GOA '26</span>
      </h1>

      <p className="header-subtitle">
        Create your official Hacker House Goa 2026 Builder ID Card or PFP Frame. 100% client-side, zero signup, instant PNG export with <strong style={{ color: 'var(--accent-pink)' }}>#FrameInGoa</strong>.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', color: 'var(--text-muted-paper)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          <Waves size={14} /> OCEAN VIBES
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          ⚡ 100% CLIENT SIDE
        </span>
      </div>
    </header>
  );
}
