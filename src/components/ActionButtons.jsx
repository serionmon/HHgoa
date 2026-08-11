import React, { useState } from 'react';
import { Download, Share2, Check, RefreshCcw } from 'lucide-react';

export default function ActionButtons({ canvasRef, mode, onResetAll, isDownloadEnabled = false }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    if (!isDownloadEnabled || !canvasRef.current) return;
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
        className={`btn-pill-primary-download ${!isDownloadEnabled ? 'disabled' : ''}`}
        onClick={handleDownload}
        disabled={!isDownloadEnabled}
        aria-label="Download Graphic"
        title={!isDownloadEnabled ? "Please fill in required fields to download" : "Download PNG Graphic"}
      >
        {downloaded ? (
          <>
            <Check size={20} /> SAVED TO DOWNLOADS!
          </>
        ) : (
          <>
            <Download size={20} /> DOWNLOAD
          </>
        )}
      </button>

      <div className="secondary-action-row">
        <button
          type="button"
          className="btn-pill-outline-pink"
          onClick={handleShareToX}
          aria-label="Share result on Twitter or X"
        >
          <Share2 size={18} /> SHARE ON X (#FRAMEINGOA)
        </button>

        <button
          type="button"
          className="btn-pill-outline-green"
          onClick={onResetAll}
          aria-label="Reset and create another graphic"
          title="Reset All"
        >
          <RefreshCcw size={16} /> RESET
        </button>
      </div>
    </div>
  );
}



