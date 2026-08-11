import React from 'react';
import { Palmtree, Waves, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="hero-header">
      {/* Top Navbar Ribbon */}
      <div className="hero-nav">
        <div className="studio-tag">
          2:47PM <span>STUDIO</span>
        </div>
        <div className="nav-actions">
          <span className="nav-link">HH GOA '26</span>
          <a href="#generator-section" className="nav-apply-btn">
            BUILD NOW
          </a>
        </div>
      </div>

      {/* Main Title Stack matching hhgoa.com */}
      <div className="hero-title-container">
        <h1 className="hero-main-title">
          HACKER <span className="hindi-badge">गोवा</span> HOUSE
        </h1>
        <div className="hero-meta-bar">
          <span>GOA, INDIA</span>
          <span className="dot">•</span>
          <span>28 - 31 OCT 2026</span>
          <span className="dot">•</span>
          <span>BUILDER IDENTITY GENERATOR</span>
        </div>
      </div>

      {/* Subtitle description */}
      <p className="hero-subtitle">
        Frame your build &amp; ship your identity at Hacker House Goa 2026. 100% client-side, zero signup, instant PNG export with <strong style={{ color: 'var(--accent-yellow)' }}>#FrameInGoa</strong>.
      </p>

      {/* Feature Badges */}
      <div className="hero-badges">
        <span className="stamp-badge stamp-badge-pink">
          <Palmtree size={14} /> HACKER HOUSE GOA
        </span>
        <span className="stamp-badge">
          <Sparkles size={14} /> BUILDER PASS 2026
        </span>
        <span className="stamp-badge stamp-badge-green">
          <Waves size={14} /> 100% CLIENT SIDE
        </span>
      </div>
    </header>
  );
}

