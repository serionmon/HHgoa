import { loadImage } from './imageValidator';

let currentRenderId = 0;

/**
 * Premium Offscreen Double-Buffered Renderer with Render Race-Condition Prevention
 * 70% Deep Forest Green + Warm Cream | 20% Typography | 10% Pink & Yellow Accents
 */
export async function renderGraphic({
  canvas,
  mode = 'pfp', // 'pfp' | 'idcard'
  imageSrc = null,
  zoom = 1,
  panX = 0,
  panY = 0,
  name = 'ROHIT SHARMA',
  stack = 'FULL-STACK DEVELOPER',
  title = '⚡ THE CODE ARCHITECT'
}) {
  if (!canvas) return;

  // Increment render sequence ID to detect obsolete async renders
  const renderId = ++currentRenderId;

  const targetW = mode === 'pfp' ? 1080 : 1200;
  const targetH = mode === 'pfp' ? 1080 : 1600;

  // Offscreen double-buffering
  const offscreen = document.createElement('canvas');
  offscreen.width = targetW;
  offscreen.height = targetH;
  const offCtx = offscreen.getContext('2d');

  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      // ignore
    }
  }

  let preloadedImg = null;
  if (imageSrc) {
    try {
      preloadedImg = await loadImage(imageSrc);
    } catch (e) {
      console.warn('Could not preload image for canvas:', e);
    }
  }

  // Abort drawing if a newer render execution was triggered while awaiting fonts/image
  if (renderId !== currentRenderId) return;

  if (mode === 'pfp') {
    renderEditorialPfpFrame(offCtx, targetW, targetH, { img: preloadedImg, zoom, panX, panY });
  } else {
    renderEditorialBuilderIdCard(offCtx, targetW, targetH, { img: preloadedImg, zoom, panX, panY, name, stack, title });
  }

  // Abort if another render was initiated during buffer rendering
  if (renderId !== currentRenderId) return;

  // Single-frame atomic copy
  if (canvas.width !== targetW) canvas.width = targetW;
  if (canvas.height !== targetH) canvas.height = targetH;

  const visibleCtx = canvas.getContext('2d');
  visibleCtx.clearRect(0, 0, targetW, targetH);
  visibleCtx.drawImage(offscreen, 0, 0);
}

/**
 * Draws programmatic vector palm tree silhouettes
 */
function drawVectorPalms(ctx, width, height) {
  ctx.save();
  ctx.fillStyle = 'rgba(8, 44, 30, 0.45)';

  // Left Trunk & Canopy
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.quadraticCurveTo(80, height - 320, 130, height - 520);
  ctx.quadraticCurveTo(70, height - 320, 0, height - 120);
  ctx.fill();

  // Right Trunk & Canopy
  ctx.beginPath();
  ctx.moveTo(width, height);
  ctx.quadraticCurveTo(width - 90, height - 360, width - 150, height - 560);
  ctx.quadraticCurveTo(width - 70, height - 360, width, height - 130);
  ctx.fill();

  ctx.restore();
}

/**
 * Render 1:1 PFP Frame (1080x1080 px)
 */
function renderEditorialPfpFrame(ctx, width, height, { img, zoom, panX, panY }) {
  // 1. Deep Forest Green Base
  ctx.fillStyle = '#041c12';
  ctx.fillRect(0, 0, width, height);

  // Background Sunburst Rays
  ctx.save();
  const centerX = width / 2;
  const centerY = height / 2 - 30;
  ctx.fillStyle = 'rgba(255, 220, 0, 0.05)';
  const numRays = 16;
  for (let i = 0; i < numRays; i++) {
    const angle = (i * 2 * Math.PI) / numRays;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, width, angle, angle + Math.PI / (numRays * 2));
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  drawVectorPalms(ctx, width, height);

  // 2. Photo Mask & Draw
  const photoRadius = 360;
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const scale = Math.max((photoRadius * 2) / img.width, (photoRadius * 2) / img.height) * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const x = centerX - drawW / 2 + panX * 2;
    const y = centerY - drawH / 2 + panY * 2;

    ctx.drawImage(img, x, y, drawW, drawH);
    ctx.restore();
  } else {
    ctx.fillStyle = '#082c1e';
    ctx.beginPath();
    ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f7f3e8';
    ctx.font = 'bold 30px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ UPLOAD YOUR PHOTO ]', centerX, centerY);
  }

  // Circular Paper & Hot Pink Border Ring
  ctx.strokeStyle = '#f7f3e8';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#ff0055';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius + 12, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Top Banner — Warm Cream Paper Header
  ctx.fillStyle = '#f7f3e8';
  ctx.fillRect(0, 0, width, 120);
  ctx.fillStyle = '#041c12';
  ctx.fillRect(0, 115, width, 6);

  ctx.fillStyle = '#041c12';
  ctx.font = '900 48px "Syne", "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA', 50, 75);

  // Bright Yellow Year Badge
  ctx.fillStyle = '#ffdc00';
  ctx.fillRect(width - 240, 30, 180, 56);
  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 4;
  ctx.strokeRect(width - 240, 30, 180, 56);

  ctx.fillStyle = '#041c12';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('2026', width - 150, 66);

  // 4. Bottom Footer Banner — Hot Pink #FrameInGoa Bar
  ctx.fillStyle = '#ff0055';
  ctx.fillRect(0, height - 130, width, 130);
  ctx.fillStyle = '#041c12';
  ctx.fillRect(0, height - 130, width, 6);

  ctx.fillStyle = '#ffdc00';
  ctx.font = '900 52px "Syne", "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('#FrameInGoa', width / 2, height - 50);

  // Outer Dual-Tone Frame Border
  ctx.strokeStyle = '#ffdc00';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, width - 40, height - 40);
}

/**
 * Render 3:4 Builder ID Card (1200x1600 px)
 */
function renderEditorialBuilderIdCard(ctx, width, height, { img, zoom, panX, panY, name, stack, title }) {
  // 1. Deep Forest Green Base
  ctx.fillStyle = '#041c12';
  ctx.fillRect(0, 0, width, height);

  drawVectorPalms(ctx, width, height);

  // 2. Central Warm Cream Paper Pass Card
  const cardX = 90;
  const cardY = 90;
  const cardW = width - 180;
  const cardH = height - 180;

  // Paper Offset Shadow
  ctx.fillStyle = '#000000';
  ctx.fillRect(cardX + 16, cardY + 16, cardW, cardH);

  // Cream Paper Base
  ctx.fillStyle = '#f7f3e8';
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 8;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  // 3. Card Header Stamp & Typography
  ctx.fillStyle = '#ff0055';
  ctx.fillRect(cardX + 40, cardY + 40, 260, 44);
  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 3;
  ctx.strokeRect(cardX + 40, cardY + 40, 260, 44);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026', cardX + 170, cardY + 68);

  ctx.fillStyle = '#041c12';
  ctx.font = '900 52px "Syne", "Playfair Display", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('BUILDER PASS', cardX + 320, cardY + 80);

  // Decorative Separator
  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardY + 115);
  ctx.lineTo(cardX + cardW - 40, cardY + 115);
  ctx.stroke();

  // 4. Photo Container (Framed Paper Slot)
  const photoW = 580;
  const photoH = 580;
  const photoX = (width - photoW) / 2;
  const photoY = cardY + 150;

  // Photo Shadow
  ctx.fillStyle = '#041c12';
  ctx.fillRect(photoX + 10, photoY + 10, photoW, photoH);

  ctx.save();
  ctx.beginPath();
  ctx.rect(photoX, photoY, photoW, photoH);
  ctx.clip();

  if (img) {
    const scale = Math.max(photoW / img.width, photoH / img.height) * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const x = photoX + (photoW - drawW) / 2 + panX * 2;
    const y = photoY + (photoH - drawH) / 2 + panY * 2;
    ctx.drawImage(img, x, y, drawW, drawH);
  } else {
    ctx.fillStyle = '#efe8d4';
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.fillStyle = '#041c12';
    ctx.font = 'bold 26px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PHOTO', photoX + photoW / 2, photoY + photoH / 2);
  }
  ctx.restore();

  // Photo Frame Border
  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  // 5. User Details Section
  const detailsY = photoY + photoH + 50;

  // Bright Yellow Title Stamp Badge
  ctx.fillStyle = '#ffdc00';
  ctx.fillRect(cardX + 40, detailsY, cardW - 80, 60);
  ctx.strokeStyle = '#041c12';
  ctx.lineWidth = 4;
  ctx.strokeRect(cardX + 40, detailsY, cardW - 80, 60);

  ctx.fillStyle = '#041c12';
  ctx.font = '900 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText((title || '⚡ THE CODE ARCHITECT').toUpperCase(), width / 2, detailsY + 39);

  // User Name (Dramatic Syne / Playfair Display Editorial Headline)
  ctx.fillStyle = '#041c12';
  ctx.font = '900 58px "Syne", "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((name || 'ROHIT SHARMA').toUpperCase(), width / 2, detailsY + 160);

  // Stack / Role Field (Hot Pink)
  ctx.fillStyle = '#ff0055';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText((stack || 'FULL-STACK DEVELOPER').toUpperCase(), width / 2, detailsY + 215);

  // 6. Card Footer Bar — #FrameInGoa Hashtag & Stamp
  const footerY = cardY + cardH - 110;

  ctx.fillStyle = '#041c12';
  ctx.fillRect(cardX + 30, footerY - 30, cardW - 60, 4);

  ctx.fillStyle = '#ff0055';
  ctx.font = '900 42px "Syne", "Space Grotesk", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('#FrameInGoa', cardX + 40, footerY + 30);

  ctx.fillStyle = '#041c12';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('ID: HH2026-X99281', cardX + cardW - 40, footerY + 30);
}
