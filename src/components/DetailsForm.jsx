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
    <div className="details-form">
      <h3 className="section-title">
        <User size={20} /> 2. Builder Pass Credentials
      </h3>

      <div className="form-group">
        <label className="form-label" htmlFor="input-name">
          Name / Handle
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
          Stack / Primary Role
        </label>
        <input
          id="input-stack"
          type="text"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          placeholder="e.g. MERN / Rust & React / UI Designer"
          maxLength={36}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-title">
          Builder Title
        </label>
        <div className="title-generator-wrapper">
          <input
            id="input-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="⚡ THE CODE ARCHITECT"
            maxLength={40}
            className="form-input"
          />
          <button
            type="button"
            className="btn-generate-title"
            onClick={handleGenerateRandomTitle}
            title="Generate Random Title"
          >
            <Sparkles size={16} /> Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}
