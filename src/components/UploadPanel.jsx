import React, { useRef, useState } from 'react';
import { UploadCloud, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
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
        <div className="dropzone-outer-wrapper">
          {/* Coconut Drink Vector Illustration at lower left */}
          <div className="coconut-drink-illustration" title="Goa Vibes">
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 28C12 44.5685 24.4315 58 40 58C55.5685 58 68 44.5685 68 28C68 25.5 67.5 23 66.5 21C64.5 17 60 16 56 16C50 16 45 19 40 19C35 19 30 16 24 16C20 16 15.5 17 13.5 21C12.5 23 12 25.5 12 28Z" fill="#0F5132" stroke="#073420" strokeWidth="2.5"/>
              <path d="M16 23C16 23 24 20 40 20C56 20 64 23 64 23" stroke="#F5F0DC" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Straws */}
              <path d="M28 22L18 4" stroke="#E8177D" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M36 21L42 2" stroke="#F5C518" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>

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
            <div className="dropzone-inner-border">
              <div className="dropzone-icon-wrapper">
                <UploadCloud className="dropzone-icon" />
              </div>
              <p className="dropzone-text">
                <strong>DRAG &amp; DROP YOUR PHOTO HERE</strong>
                <span>or click to browse from device</span>
              </p>
              <span className="dropzone-format-pill">JPG, PNG, WebP • MAX 15MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="photo-controls-card">
          <div className="photo-controls-header">
            <span className="photo-controls-title">✦ PHOTO POSITION</span>
          </div>

          <div className="slider-group">
            <div className="slider-label">
              <span>SCALE</span>
              <span className="slider-value">{zoom.toFixed(2)}×</span>
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
              <span>HORIZONTAL</span>
              <span className="slider-value">{panX}px</span>
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
              <span>VERTICAL</span>
              <span className="slider-value">{panY}px</span>
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

          <div className="photo-action-bar">
            <button
              type="button"
              className="btn-pill-secondary"
              onClick={onResetPosition}
            >
              <RefreshCw size={14} /> RESET FRAME
            </button>

            <button
              type="button"
              className="btn-pill-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              REPLACE PHOTO
            </button>

            <button
              type="button"
              className="btn-pill-danger"
              onClick={onRemoveImage}
              aria-label="Remove photo"
              title="Remove photo"
            >
              <Trash2 size={14} /> REMOVE
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="upload-error-banner">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}
    </div>
  );
}

