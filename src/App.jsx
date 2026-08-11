import React, { useState, useRef } from 'react';
import ModeSelector from './components/ModeSelector';
import UploadPanel from './components/UploadPanel';
import DetailsForm from './components/DetailsForm';
import BuilderPreview from './components/BuilderPreview';
import ActionButtons from './components/ActionButtons';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { generateBuilderId } from './utils/titleGenerator';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('idcard'); // 'idcard' (3:4) | 'pfp' (1:1)
  const [imageSrc, setImageSrc] = useState(null);

  // Stable Builder ID generated once per session
  const [builderId] = useState(() => generateBuilderId());

  // Transformations
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // Builder Details
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [title, setTitle] = useState('Builder');

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
    setTeamName('');
    setTitle('Builder');
    handleResetPosition();
  };

  // Download & Share validation criteria (Required: Photo, Name, Title. Team Name is optional)
  const isPhotoUploaded = !!imageSrc;
  const isNameFilled = !!(name && name.trim());
  const isTitleFilled = !!(title && title.trim());

  const isFormComplete = isPhotoUploaded && isNameFilled && isTitleFilled;

  const isDownloadEnabled = mode === 'idcard'
    ? isFormComplete
    : isPhotoUploaded;

  return (
    <div className="app-container">
      {/* Top Header Bar */}
      <div className="reference-top-header">
        <span className="top-studio-tag">2:47PM STUDIO</span>
        <span className="top-event-tag">HH GOA '26</span>
      </div>

      {/* Mode Selector Component (3:4 Builder ID Card ↔ 1:1 PFP Frame) */}
      <div className="app-mode-selector-container">
        <ModeSelector mode={mode} onModeChange={setMode} />
      </div>

      {/* Main Two-Column Layout */}
      <main className="builder-grid-container">
        {/* Top Left Hanging Palm Frond Illustration */}
        <div className="top-left-palm-frond" title="Goa Palms">
          <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0Q60 40 130 30" stroke="#0F5132" strokeWidth="3" fill="none"/>
            <path d="M0 0Q40 50 110 90" stroke="#0F5132" strokeWidth="3" fill="none"/>
            <path d="M0 0Q20 70 60 135" stroke="#0F5132" strokeWidth="3" fill="none"/>
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
              teamName={teamName}
              setTeamName={setTeamName}
              title={title}
              setTitle={setTitle}
            />
          )}
        </section>

        {/* RIGHT COLUMN: Live Graphic Preview & Actions */}
        <section className="right-preview-column" aria-label="Live Graphic Preview">
          <BuilderPreview
            canvasRef={canvasRef}
            mode={mode}
            imageSrc={imageSrc}
            zoom={zoom}
            panX={panX}
            panY={panY}
            name={name}
            teamName={teamName}
            title={title}
            builderId={builderId}
          />

          <ActionButtons
            canvasRef={canvasRef}
            mode={mode}
            onResetAll={handleResetAll}
            isDownloadEnabled={isDownloadEnabled}
          />
        </section>
      </main>

      {/* Unified Contact / Social Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
