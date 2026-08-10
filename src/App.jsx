import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import UploadPanel from './components/UploadPanel';
import DetailsForm from './components/DetailsForm';
import BuilderPreview from './components/BuilderPreview';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('idcard'); // 'pfp' | 'idcard'
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

  return (
    <div className="app-container">
      <Header />

      <ModeSelector mode={mode} onModeChange={setMode} />

      <main className="builder-layout">
        {/* Left Column: Form & Photo Controls */}
        <section className="controls-panel glass-panel" aria-label="Controls Panel">
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

        {/* Right Column: Live Canvas Preview & Actions */}
        <section className="controls-panel glass-panel" style={{ alignItems: 'center' }} aria-label="Live Graphic Preview Panel">
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

          <ActionButtons canvasRef={canvasRef} mode={mode} onResetAll={handleResetAll} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
