import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { getRandomBuilderTitle } from '../utils/titleGenerator';

export default function DetailsForm({
  name,
  setName,
  stack,
  setStack,
  title,
  setTitle
}) {
  const handleGenerateRandomTitle = () => {
    const newTitle = getRandomBuilderTitle();
    setTitle(newTitle);
  };

  return (
    <div className="details-form" id="builder-credentials">
      <h3 className="section-credentials-heading">
        <User size={20} className="credentials-icon" /> 02. BUILDER PASS CREDENTIALS
      </h3>

      <div className="form-group">
        <label className="form-label" htmlFor="input-name">
          NAME / HANDLE
        </label>
        <input
          id="input-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rohit Sharma or @rohit_dev"
          maxLength={32}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-stack">
          STACK / PRIMARY ROLE
        </label>
        <input
          id="input-stack"
          type="text"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="e.g. MERN / Rust &amp; React / UI Designer"
          maxLength={36}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-title">
          BUILDER TITLE
        </label>
        <div className="title-generator-wrapper">
          <input
            id="input-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="⚡ THE CODE ARCHITECT"
            maxLength={40}
            className="form-input title-input"
          />
          <button
            type="button"
            className="btn-pill-shuffle"
            onClick={handleGenerateRandomTitle}
            title="Generate Random Title"
          >
            <Sparkles size={16} /> SHUFFLE
          </button>
        </div>
      </div>

      {/* Beach Shoreline Vector Illustration below form matching lower left reference */}
      <div className="left-form-beach-illustration">
        <svg viewBox="0 0 500 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="beach-svg">
          {/* Sailboat in ocean */}
          <path d="M280 90L295 60L310 90H280Z" fill="#FAF7F0" stroke="#0F5132" strokeWidth="2"/>
          <path d="M280 92L295 105H270L280 92Z" fill="#E8177D" stroke="#0F5132" strokeWidth="2"/>
          
          {/* Sand & Ocean Waves */}
          <path d="M0 120Q150 95 300 125T500 115V160H0V120Z" fill="#F5C518" opacity="0.4"/>
          <path d="M0 125Q120 110 250 130T500 120" stroke="#0F5132" strokeWidth="3.5" fill="none"/>
          <path d="M0 135Q180 120 350 140T500 130" stroke="#FAF7F0" strokeWidth="3" fill="none"/>

          {/* Beach Shack on right */}
          <g transform="translate(380, 85)">
            <rect x="0" y="20" width="60" height="35" fill="#FAF7F0" stroke="#0F5132" strokeWidth="2.5"/>
            <path d="M-5 20L30 2L65 20Z" fill="#E8177D" stroke="#0F5132" strokeWidth="2.5"/>
            <rect x="20" y="32" width="18" height="23" fill="#0F5132"/>
            <rect x="5" y="-12" width="50" height="13" fill="#F5C518" stroke="#0F5132" strokeWidth="2"/>
            <text x="30" y="-3" fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#0F5132" textAnchor="middle">GOA BEACH</text>
          </g>

          {/* Surfboard on left */}
          <g transform="translate(45, 95) rotate(-15)">
            <ellipse cx="0" cy="0" rx="14" ry="42" fill="#E8177D" stroke="#0F5132" strokeWidth="2.5"/>
            <rect x="-14" y="-6" width="28" height="12" fill="#F5C518" stroke="#0F5132" strokeWidth="2"/>
          </g>

          {/* Left Palm Tree */}
          <g transform="translate(15, 150)">
            <path d="M0 0Q25 -70 15 -130" stroke="#0F5132" strokeWidth="12" strokeLinecap="round" fill="none"/>
            {/* Leaves */}
            <path d="M15 -130Q60 -150 90 -125Q45 -115 15 -130" fill="#0F5132"/>
            <path d="M15 -130Q-30 -160 -70 -140Q-25 -120 15 -130" fill="#0F5132"/>
            <path d="M15 -130Q0 -175 25 -190Q25 -150 15 -130" fill="#0F5132"/>
          </g>
        </svg>
      </div>
    </div>
  );
}


