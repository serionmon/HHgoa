import React, { useState } from 'react';
import { Download, Share2, Check, RefreshCcw } from 'lucide-react';

export default function ActionButtons({ canvasRef, mode, onResetAll }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const filename = mode === 'pfp' 
      ? 'HH_Goa_2026_PFP_Frame.png' 
      : 'HH_Goa_2026_Builder_ID_Card.png';

    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShareToX = () => {
    const text = encodeURIComponent(
      'Building, shipping, and framing my identity at Hacker House Goa 2026! 🚀🌴\n\n#FrameInGoa @HackerHouseGoa'
    );
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="action-buttons">
      <button
        type="button"
        className="btn-primary"
        onClick={handleDownload}
        aria-label="Download PNG Image"
      >
        {downloaded ? (
          <>
            <Check size={20} /> PNG Saved to Downloads!
          </>
        ) : (
          <>
            <Download size={20} /> Download PNG Image
          </>
        )}
      </button>

      <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
        <button
          type="button"
          className="btn-share"
          onClick={handleShareToX}
          style={{ flex: 2 }}
          aria-label="Share result on Twitter or X"
        >
          <Share2 size={18} /> Share on X (#FrameInGoa)
        </button>

        <button
          type="button"
          className="btn-secondary"
          onClick={onResetAll}
          style={{ flex: 1 }}
          aria-label="Reset and create another graphic"
          title="Create Another"
        >
          <RefreshCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
