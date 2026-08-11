import React, { useState } from 'react';
import { Download, Share2, Check, RefreshCcw, AlertCircle } from 'lucide-react';

export default function ActionButtons({
  canvasRef,
  mode,
  onResetAll,
  isDownloadEnabled = false
}) {
  const [downloaded, setDownloaded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

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

  const openXWebIntent = (shareText) => {
    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareToX = () => {
    if (!isDownloadEnabled || !canvasRef.current) return;

    const shareText = "Building under the sun 🌴\nMy Hacker House Goa 2026 Builder Identity.\n#FrameInGoa";
    const canvas = canvasRef.current;

    setIsSharing(true);

    if (typeof navigator !== 'undefined' && navigator.canShare && canvas.toBlob) {
      canvas.toBlob(async (blob) => {
        setIsSharing(false);
        if (blob) {
          try {
            const file = new File([blob], 'HH_Goa_2026_Builder_Identity.png', { type: 'image/png' });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: 'Hacker House Goa 2026',
                text: shareText
              });
              return;
            }
          } catch (err) {
            if (err.name === 'AbortError') {
              return; // User dismissed share sheet
            }
            console.warn('Native file share error, using web intent fallback:', err);
          }
        }
        openXWebIntent(shareText);
      }, 'image/png');
    } else {
      setIsSharing(false);
      openXWebIntent(shareText);
    }
  };

  return (
    <div className="action-buttons">
      {!isDownloadEnabled && (
        <div className="validation-warning-message">
          <AlertCircle size={16} /> Add your photo and complete your details.
        </div>
      )}

      <button
        type="button"
        className={`btn-pill-primary-download ${!isDownloadEnabled ? 'disabled' : ''}`}
        onClick={handleDownload}
        disabled={!isDownloadEnabled}
        aria-label="Download Graphic"
        title={!isDownloadEnabled ? "Add your photo and complete your details." : "Download PNG Graphic"}
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
          className={`btn-pill-outline-pink ${!isDownloadEnabled ? 'disabled' : ''}`}
          onClick={handleShareToX}
          disabled={!isDownloadEnabled}
          aria-label="Share result on X"
          title={!isDownloadEnabled ? "Add your photo and complete your details." : "Share on X"}
        >
          <Share2 size={18} /> {isSharing ? 'PREPARING...' : 'SHARE ON X (#FRAMEINGOA)'}
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
