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
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getFilename = () => {
    if (mode === 'team') return 'HH_Goa_2026_Team_Frame.png';
    if (mode === 'pfp') return 'HH_Goa_2026_PFP_Frame.png';
    return 'HH_Goa_2026_Builder_ID_Card.png';
  };

  const getWarningMessage = () => {
    if (mode === 'team') return 'Add at least 2 builders with photos and names to download.';
    return 'Add your photo and complete your details.';
  };

  const handleDownload = () => {
    if (!isDownloadEnabled || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = getFilename();
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setDownloaded(false), 3000);
  };

  const openXWebIntent = (shareText) => {
    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareToX = () => {
    if (!isDownloadEnabled || !canvasRef.current) return;

    const shareText = mode === 'team'
      ? "Building together under the sun 🌴\nOur Hacker House Goa 2026 Team Frame.\n#FrameInGoa"
      : "Building under the sun 🌴\nMy Hacker House Goa 2026 Builder Identity.\n#FrameInGoa";
    const canvas = canvasRef.current;

    setIsSharing(true);

    if (typeof navigator !== 'undefined' && navigator.canShare && canvas.toBlob) {
      canvas.toBlob(async (blob) => {
        setIsSharing(false);
        if (blob) {
          try {
            const file = new File([blob], getFilename(), { type: 'image/png' });
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

  const warningMsg = getWarningMessage();

  return (
    <div className="action-buttons">
      {!isDownloadEnabled && (
        <div className="validation-warning-message">
          <AlertCircle size={16} /> {warningMsg}
        </div>
      )}

      <button
        type="button"
        className={`btn-pill-primary-download ${!isDownloadEnabled ? 'disabled' : ''}`}
        onClick={handleDownload}
        disabled={!isDownloadEnabled}
        aria-label="Download Graphic"
        title={!isDownloadEnabled ? warningMsg : "Download PNG Graphic"}
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
          title={!isDownloadEnabled ? warningMsg : "Share on X"}
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

