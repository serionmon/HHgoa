import React, { useEffect } from 'react';
import { renderGraphic } from '../utils/imageGenerator';

export default function BuilderPreview({
  canvasRef,
  mode,
  imageSrc,
  zoom,
  panX,
  panY,
  name,
  teamName,
  title,
  builderId,
  builders = []
}) {
  useEffect(() => {
    renderGraphic({
      canvas: canvasRef.current,
      mode,
      imageSrc,
      zoom,
      panX,
      panY,
      name,
      teamName,
      title,
      builderId,
      builders
    }).catch(err => console.error('Canvas render error:', err));
  }, [mode, imageSrc, zoom, panX, panY, name, teamName, title, builderId, builders, canvasRef]);

  const modeClass = mode === 'team' ? 'mode-team' : (mode === 'pfp' ? 'mode-pfp' : 'mode-idcard');

  return (
    <div className="preview-container">
      <div className="preview-header-sticker">
        ✦ LIVE GRAPHIC PREVIEW
      </div>

      <div className={`canvas-wrapper ${modeClass}`}>
        <canvas ref={canvasRef} className="preview-canvas" />
      </div>
    </div>
  );
}

