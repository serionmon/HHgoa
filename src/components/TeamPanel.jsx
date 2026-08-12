import React, { useRef, useState } from 'react';
import { UploadCloud, Trash2, RefreshCw, UserPlus, Users, AlertCircle } from 'lucide-react';
import { validateImageFile } from '../utils/imageValidator';

function TeammateItem({
  builder,
  index,
  totalBuilders,
  onUpdate,
  onRemove
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const validation = validateImageFile(file);

    if (!validation.valid) {
      setErrorMsg(validation.error);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onerror = () => {
      setErrorMsg('Failed to read image file. Please try another photo.');
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.onload = (e) => {
      onUpdate(builder.id, { imageSrc: e.target.result });
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="team-builder-card">
      <div className="team-builder-card-header">
        <span className="team-builder-number-badge">
          ✦ BUILDER 0{index + 1}
        </span>

        {totalBuilders > 2 && (
          <button
            type="button"
            className="btn-remove-teammate"
            onClick={() => onRemove(builder.id)}
            aria-label={`Remove Teammate ${builder.name ? builder.name : index + 1}`}
            title={`Remove Teammate ${index + 1}`}
          >
            <Trash2 size={14} /> REMOVE
          </button>
        )}
      </div>

      <div className="team-builder-card-body">
        {/* Hidden File Input per Teammate */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          accept="image/jpeg,image/png,image/webp,image/heic"
          style={{ display: 'none' }}
          id={`team-photo-input-${builder.id}`}
          aria-label={`Upload photo for teammate ${index + 1}`}
        />

        {/* Photo Upload or Position Sliders */}
        {!builder.imageSrc ? (
          <div className="team-dropzone-wrapper">
            <div
              className={`team-dropzone ${dragActive ? 'drag-active' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label={`Upload photo for teammate ${index + 1}`}
            >
              <UploadCloud className="team-dropzone-icon" />
              <div className="team-dropzone-text">
                <strong>UPLOAD PHOTO</strong>
                <span>JPG, PNG, WebP (MAX 15MB)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="team-photo-controls">
            <div className="team-photo-preview-bar">
              <div className="team-photo-thumb">
                <img src={builder.imageSrc} alt={`Teammate ${index + 1}`} />
              </div>
              <div className="team-photo-actions">
                <button
                  type="button"
                  className="btn-pill-secondary btn-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  REPLACE
                </button>
                <button
                  type="button"
                  className="btn-pill-secondary btn-sm"
                  onClick={() => onUpdate(builder.id, { zoom: 1, panX: 0, panY: 0 })}
                  title="Reset Position"
                >
                  <RefreshCw size={12} /> RESET
                </button>
                <button
                  type="button"
                  className="btn-pill-danger btn-sm"
                  onClick={() => onUpdate(builder.id, { imageSrc: null, zoom: 1, panX: 0, panY: 0 })}
                  title="Remove Photo"
                  aria-label={`Remove photo for teammate ${index + 1}`}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            {/* Position Sliders (Compact) */}
            <div className="team-sliders-grid">
              <div className="slider-group compact">
                <div className="slider-label">
                  <span>SCALE</span>
                  <span className="slider-value">{builder.zoom.toFixed(2)}×</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={builder.zoom}
                  onChange={(e) => onUpdate(builder.id, { zoom: parseFloat(e.target.value) })}
                  className="slider-input"
                  aria-label={`Scale teammate ${index + 1} photo`}
                />
              </div>

              <div className="slider-group compact">
                <div className="slider-label">
                  <span>PAN X</span>
                  <span className="slider-value">{builder.panX}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="1"
                  value={builder.panX}
                  onChange={(e) => onUpdate(builder.id, { panX: parseInt(e.target.value, 10) })}
                  className="slider-input"
                  aria-label={`Pan horizontal teammate ${index + 1} photo`}
                />
              </div>

              <div className="slider-group compact">
                <div className="slider-label">
                  <span>PAN Y</span>
                  <span className="slider-value">{builder.panY}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="1"
                  value={builder.panY}
                  onChange={(e) => onUpdate(builder.id, { panY: parseInt(e.target.value, 10) })}
                  className="slider-input"
                  aria-label={`Pan vertical teammate ${index + 1} photo`}
                />
              </div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="upload-error-banner compact">
            <AlertCircle size={14} /> {errorMsg}
          </div>
        )}

        {/* Input Details */}
        <div className="team-inputs-row">
          <div className="form-group flex-1">
            <label className="form-label" htmlFor={`team-name-${builder.id}`}>
              NAME / HANDLE
            </label>
            <input
              id={`team-name-${builder.id}`}
              type="text"
              value={builder.name}
              onChange={(e) => onUpdate(builder.id, { name: e.target.value })}
              placeholder="e.g. Rohit"
              maxLength={25}
              className="form-input"
            />
          </div>

          <div className="form-group flex-1">
            <label className="form-label" htmlFor={`team-role-${builder.id}`}>
              STACK / ROLE
            </label>
            <input
              id={`team-role-${builder.id}`}
              type="text"
              value={builder.role}
              onChange={(e) => onUpdate(builder.id, { role: e.target.value })}
              placeholder="e.g. AI/ML • React"
              maxLength={30}
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamPanel({
  builders,
  onAddBuilder,
  onRemoveBuilder,
  onUpdateBuilder
}) {
  const maxReached = builders.length >= 6;

  return (
    <div className="team-panel" id="team-credentials">
      <div className="team-panel-header">
        <h3 className="section-credentials-heading">
          <Users size={20} className="credentials-icon" /> 02. TEAM SQUAD BUILDER
        </h3>
        <span className="team-count-badge">
          {builders.length} / 6 BUILDERS
        </span>
      </div>

      <div className="team-builders-list">
        {builders.map((builder, index) => (
          <TeammateItem
            key={builder.id}
            builder={builder}
            index={index}
            totalBuilders={builders.length}
            onUpdate={onUpdateBuilder}
            onRemove={onRemoveBuilder}
          />
        ))}
      </div>

      <div className="team-actions-footer">
        <button
          type="button"
          className={`btn-add-builder ${maxReached ? 'disabled' : ''}`}
          onClick={onAddBuilder}
          disabled={maxReached}
          aria-label="Add Teammate"
        >
          <UserPlus size={18} /> + ADD BUILDER
        </button>

        {maxReached ? (
          <span className="team-max-notice">
            Maximum 6 builders per combined frame reached.
          </span>
        ) : (
          <span className="team-add-hint">
            Add up to 6 teammates inside one combined frame!
          </span>
        )}
      </div>
    </div>
  );
}
