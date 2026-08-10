import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, ZoomIn, Move, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { validateImageFile } from '../utils/imageValidator';

export default function UploadPanel({
  imageSrc,
  onImageSelected,
  onRemoveImage,
  zoom,
  setZoom,
  panX,
  setPanX,
  panY,
  setPanY,
  onResetPosition
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
    reader.onload = (e) => {
      onImageSelected(e.target.result);
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

  return (
    <div className="upload-panel">
      <h3 className="section-title">
        <ImageIcon size={20} /> 1. Upload & Position Photo
      </h3>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        accept="image/jpeg,image/png,image/webp,image/heic"
        style={{ display: 'none' }}
        id="photo-file-input"
        aria-label="Upload photo file"
      />

      {!imageSrc ? (
        <div
          className={`dropzone ${dragActive ? 'drag-active' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="Upload photo dropzone"
        >
          <UploadCloud className="dropzone-icon" />
          <p className="dropzone-text">
            <strong>Drop your photo here</strong> or click to browse
          </p>
          <span className="dropzone-hint">Supports JPG, PNG, WebP (Max 15MB)</span>
        </div>
      ) : (
        <div className="photo-controls">
          <div className="slider-group">
            <div className="slider-label">
              <span><ZoomIn size={14} /> Scale Zoom</span>
              <span>{zoom.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="slider-input"
              aria-label="Zoom scale"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span><Move size={14} /> Horizontal Pan</span>
              <span>{panX}px</span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="1"
              value={panX}
              onChange={(e) => setPanX(parseInt(e.target.value, 10))}
              className="slider-input"
              aria-label="Horizontal pan"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span><Move size={14} /> Vertical Pan</span>
              <span>{panY}px</span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="1"
              value={panY}
              onChange={(e) => setPanY(parseInt(e.target.value, 10))}
              className="slider-input"
              aria-label="Vertical pan"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onResetPosition}
              style={{ flex: 1 }}
            >
              <RefreshCw size={14} /> Reset Frame
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
              style={{ flex: 1 }}
            >
              Replace
            </button>

            <button
              type="button"
              className="btn-danger"
              onClick={onRemoveImage}
              aria-label="Remove photo"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div style={{ color: 'var(--accent-pink)', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
          <AlertCircle size={14} /> {errorMsg}
        </div>
      )}
    </div>
  );
}
