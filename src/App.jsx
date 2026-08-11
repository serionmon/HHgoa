import React, { useState, useRef } from 'react';
import ModeSelector from './components/ModeSelector';
import UploadPanel from './components/UploadPanel';
import DetailsForm from './components/DetailsForm';
import BuilderPreview from './components/BuilderPreview';
import ActionButtons from './components/ActionButtons';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('idcard'); // 'idcard' (3:4) | 'pfp' (1:1)
  const [imageSrc, setImageSrc] = useState(null);

  // Transformations
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // Builder Details
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [title, setTitle] = useState('⚡ THE CODE ARCHITECT');

  const canvasRef = useRef(null);

  const handleResetPosition = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleRemoveImage = () => {
    setImageSrc(null);
    handleResetPosition();
  };

  const handleResetAll = () => {
    setImageSrc(null);
    setName('');
    setStack('');
    setTitle('⚡ THE CODE ARCHITECT');
    handleResetPosition();
  };

  // Download validation criteria per requirement
  const isPhotoUploaded = !!imageSrc;
  const isNameFilled = !!(name && name.trim());
  const isStackFilled = !!(stack && stack.trim());
  const isTitleFilled = !!(title && title.trim());

  const isDownloadEnabled = mode === 'idcard'
    ? (isPhotoUploaded && isNameFilled && isStackFilled && isTitleFilled)
    : isPhotoUploaded;

  return (
    <div className="app-container">
      {/* Reference Top Minimal Ribbon */}
      <div className="reference-top-header">
        <span className="top-studio-tag">2:47PM STUDIO</span>
        <span className="top-event-tag">HH GOA '26</span>
      </div>

      {/* Mode Selector Component (3:4 Builder ID Card ↔ 1:1 PFP Frame) */}
      <div className="app-mode-selector-container">
        <ModeSelector mode={mode} onModeChange={setMode} />
      </div>

      {/* Main Two-Column Reference Layout */}
      <main className="builder-grid-container">
        {/* Top Left Hanging Palm Frond Vector Illustration */}
        <div className="top-left-palm-frond" title="Goa Palms">
          <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0Q60 40 130 30" stroke="#0F5132" strokeWidth="3" fill="none"/>
            <path d="M0 0Q40 50 110 90" stroke="#0F5132" strokeWidth="3" fill="none"/>
            <path d="M0 0Q20 70 60 135" stroke="#0F5132" strokeWidth="3" fill="none"/>
            {/* Frond Blades */}
            <path d="M30 18Q70 10 110 25Q60 30 30 18Z" fill="#0F5132"/>
            <path d="M25 35Q80 40 120 75Q65 65 25 35Z" fill="#0F5132"/>
            <path d="M15 50Q50 90 70 130Q40 85 15 50Z" fill="#0F5132"/>
          </svg>
        </div>

        {/* LEFT COLUMN: Upload & Form Controls */}
        <section className="left-controls-column" aria-label="Builder Form & Upload">
          <UploadPanel
            imageSrc={imageSrc}
            onImageSelected={setImageSrc}
            onRemoveImage={handleRemoveImage}
            zoom={zoom}
            setZoom={setZoom}
            panX={panX}
            setPanX={setPanX}
            panY={panY}
            setPanY={setPanY}
            onResetPosition={handleResetPosition}
          />

          {mode === 'idcard' && (
            <DetailsForm
              name={name}
              setName={setName}
              stack={stack}
              setStack={setStack}
              title={title}
              setTitle={setTitle}
            />
          )}
        </section>

        {/* RIGHT COLUMN: Live Builder Pass Preview & Action Dock */}
        <section className="right-preview-column" aria-label="Live Graphic Preview">
          <BuilderPreview
            canvasRef={canvasRef}
            mode={mode}
            imageSrc={imageSrc}
            zoom={zoom}
            panX={panX}
            panY={panY}
            name={name}
            stack={stack}
            title={title}
          />

          <ActionButtons
            canvasRef={canvasRef}
            mode={mode}
            onResetAll={handleResetAll}
            isDownloadEnabled={isDownloadEnabled}
          />
        </section>
      </main>

      {/* CONNECT WITH THE BUILDER Contact/Social Section */}
      <ContactSection />

      {/* Footer & Optional Footer CTA */}
      <Footer />
    </div>
  );
}




