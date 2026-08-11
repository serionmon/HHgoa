import { loadImage } from './imageValidator';

let currentRenderId = 0;

/**
 * Premium Offscreen Double-Buffered Renderer matching Reference Image
 * Palette: Forest Green (#0F5132), Paper Cream (#F5F0DC), Hot Pink (#E8177D), Yellow (#F5C518)
 */
export async function renderGraphic({
  canvas,
  mode = 'idcard', // 'idcard' | 'pfp'
  imageSrc = null,
  zoom = 1,
  panX = 0,
  panY = 0,
  name = '',
  stack = '',
  title = '⚡ THE CODE ARCHITECT'
}) {
  if (!canvas) return;

  const renderId = ++currentRenderId;

  const targetW = mode === 'pfp' ? 1080 : 1200;
  const targetH = mode === 'pfp' ? 1080 : 1600;

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

  if (renderId !== currentRenderId) return;

  if (mode === 'pfp') {
    renderEditorialPfpFrame(offCtx, targetW, targetH, { img: preloadedImg, zoom, panX, panY });
  } else {
    renderEditorialBuilderIdCard(offCtx, targetW, targetH, { img: preloadedImg, zoom, panX, panY, name, stack, title });
  }

  if (renderId !== currentRenderId) return;

  if (canvas.width !== targetW) canvas.width = targetW;
  if (canvas.height !== targetH) canvas.height = targetH;

  const visibleCtx = canvas.getContext('2d');
  visibleCtx.clearRect(0, 0, targetW, targetH);
  visibleCtx.drawImage(offscreen, 0, 0);
}

/**
 * Draws tropical Goa beach environment matching exact reference artwork
 */
function drawReferenceGoaBeachEnvironment(ctx, cardX, cardY, cardW, cardH) {
  // 1. Top-Right Hanging Palm Frond Leaves
  ctx.save();
  const frondX = cardX + cardW - 30;
  const frondY = cardY + 30;
  ctx.strokeStyle = '#0F5132';
  ctx.fillStyle = '#0F5132';
  ctx.lineWidth = 3.5;

  const frondAngles = [0.8, 1.2, 1.65, 2.1];
  frondAngles.forEach(ang => {
    ctx.save();
    ctx.translate(frondX, frondY);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(60, -15, 110, 10);
    ctx.quadraticCurveTo(50, 8, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
  ctx.restore();

  // 2. Flying Birds in Sky left & right of photo slot
  ctx.save();
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3;
  drawBird(ctx, cardX + 130, cardY + 220, 20);
  drawBird(ctx, cardX + 165, cardY + 205, 14);
  drawBird(ctx, cardX + 190, cardY + 225, 10);

  drawBird(ctx, cardX + cardW - 140, cardY + 230, 18);
  drawBird(ctx, cardX + cardW - 110, cardY + 215, 13);
  ctx.restore();

  // 3. Lower Shoreline, Waves & Setting Sun
  ctx.save();
  const shoreY = cardY + cardH - 260;

  // Setting Sun on Horizon (#E8177D)
  ctx.fillStyle = '#E8177D';
  ctx.beginPath();
  ctx.arc(cardX + cardW / 2 + 60, shoreY + 30, 50, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Sun Rays
  ctx.strokeStyle = '#E8177D';
  ctx.lineWidth = 3;
  for (let a = Math.PI + 0.2; a < Math.PI * 2 - 0.2; a += 0.35) {
    const rx1 = cardX + cardW / 2 + 60 + Math.cos(a) * 56;
    const ry1 = shoreY + 30 + Math.sin(a) * 56;
    const rx2 = cardX + cardW / 2 + 60 + Math.cos(a) * 72;
    const ry2 = shoreY + 30 + Math.sin(a) * 72;
    ctx.beginPath();
    ctx.moveTo(rx1, ry1);
    ctx.lineTo(rx2, ry2);
    ctx.stroke();
  }

  // Sandy Beach Base (#F5C518)
  ctx.fillStyle = '#F5C518';
  ctx.beginPath();
  ctx.moveTo(cardX + 4, shoreY + 45);
  ctx.quadraticCurveTo(cardX + cardW / 2, shoreY + 15, cardX + cardW - 4, shoreY + 55);
  ctx.lineTo(cardX + cardW - 4, cardY + cardH - 4);
  ctx.lineTo(cardX + 4, cardY + cardH - 4);
  ctx.closePath();
  ctx.fill();

  // Ocean Waves Layer (#0F5132)
  ctx.fillStyle = '#0F5132';
  ctx.beginPath();
  ctx.moveTo(cardX + 4, shoreY + 5);
  ctx.quadraticCurveTo(cardX + cardW / 3, shoreY + 35, cardX + cardW / 2, shoreY + 15);
  ctx.quadraticCurveTo(cardX + (cardW * 3) / 4, shoreY - 8, cardX + cardW - 4, shoreY + 25);
  ctx.lineTo(cardX + cardW - 4, shoreY + 55);
  ctx.quadraticCurveTo(cardX + cardW / 2, shoreY + 15, cardX + 4, shoreY + 45);
  ctx.closePath();
  ctx.fill();

  // Wave Crest Lines (#F5F0DC)
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 4, shoreY + 7);
  ctx.quadraticCurveTo(cardX + cardW / 3, shoreY + 37, cardX + cardW / 2, shoreY + 17);
  ctx.quadraticCurveTo(cardX + (cardW * 3) / 4, shoreY - 6, cardX + cardW - 4, shoreY + 27);
  ctx.stroke();

  // Stilted Beach Shack on right horizon
  drawStiltedBeachShack(ctx, cardX + cardW - 200, shoreY - 20);

  // Palm Trees framing left & right sides
  drawPalmTree(ctx, cardX + 35, cardY + cardH - 45, 0.95, -1);
  drawPalmTree(ctx, cardX + 110, cardY + cardH - 30, 0.75, -1);

  drawPalmTree(ctx, cardX + cardW - 35, cardY + cardH - 45, 0.95, 1);
  drawPalmTree(ctx, cardX + cardW - 110, cardY + cardH - 30, 0.75, 1);

  ctx.restore();
}

/**
 * Draws vector bird silhouette
 */
function drawBird(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.quadraticCurveTo(x - size / 2, y - size / 2, x, y);
  ctx.quadraticCurveTo(x + size / 2, y - size / 2, x + size, y);
  ctx.stroke();
}

/**
 * Draws beach shack on stilts over horizon
 */
function drawStiltedBeachShack(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);

  // Stilts
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(10, 45); ctx.lineTo(10, 75);
  ctx.moveTo(30, 45); ctx.lineTo(30, 75);
  ctx.moveTo(50, 45); ctx.lineTo(50, 75);
  ctx.moveTo(70, 45); ctx.lineTo(70, 75);
  ctx.stroke();

  // Shack Structure
  ctx.fillStyle = '#F5F0DC';
  ctx.fillRect(0, 10, 80, 35);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 10, 80, 35);

  // Roof (#E8177D)
  ctx.fillStyle = '#E8177D';
  ctx.beginPath();
  ctx.moveTo(-10, 10);
  ctx.lineTo(40, -15);
  ctx.lineTo(90, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Windows
  ctx.fillStyle = '#0F5132';
  ctx.fillRect(15, 20, 18, 18);
  ctx.fillRect(48, 20, 18, 18);

  ctx.restore();
}

/**
 * Draws retro palm tree
 */
function drawPalmTree(ctx, x, y, scale = 1, flipX = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX * scale, scale);

  // Curved Trunk
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(flipX * 36, -140, flipX * 18, -280);
  ctx.stroke();

  // Trunk Rings
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 3;
  for (let i = 1; i <= 7; i++) {
    const ty = -i * 36;
    ctx.beginPath();
    ctx.moveTo(flipX * (i * 3), ty);
    ctx.lineTo(flipX * (i * 3 + 10), ty - 7);
    ctx.stroke();
  }

  const topX = flipX * 18;
  const topY = -280;

  // Fronds
  ctx.fillStyle = '#0F5132';
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3.5;

  const angles = [-2.4, -1.8, -1.1, -0.4, 0.3, 0.9];
  angles.forEach(ang => {
    ctx.save();
    ctx.translate(topX, topY);
    ctx.rotate(ang);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(55, -18, 105, 12);
    ctx.quadraticCurveTo(45, 8, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

/**
 * Render 1:1 PFP Frame (1080x1080 px)
 */
function renderEditorialPfpFrame(ctx, width, height, { img, zoom, panX, panY }) {
  ctx.fillStyle = '#0F5132';
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  const centerX = width / 2;
  const centerY = height / 2 - 30;
  ctx.fillStyle = 'rgba(245, 197, 24, 0.06)';
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

  drawPalmTree(ctx, 20, height - 30, 0.95, -1);
  drawPalmTree(ctx, width - 20, height - 30, 0.95, 1);

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
    ctx.fillStyle = '#073420';
    ctx.beginPath();
    ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F5F0DC';
    ctx.font = 'bold 30px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('[ UPLOAD YOUR PHOTO ]', centerX, centerY);
  }

  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#E8177D';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius + 12, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#F5F0DC';
  ctx.fillRect(0, 0, width, 120);
  ctx.fillStyle = '#0F5132';
  ctx.fillRect(0, 115, width, 6);

  ctx.fillStyle = '#0F5132';
  ctx.font = '900 48px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'left';
  ctx.fillText('HACKER HOUSE GOA', 50, 75);

  ctx.fillStyle = '#F5C518';
  ctx.fillRect(width - 240, 30, 180, 56);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 4;
  ctx.strokeRect(width - 240, 30, 180, 56);

  ctx.fillStyle = '#0F5132';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('2026', width - 150, 66);

  ctx.fillStyle = '#E8177D';
  ctx.fillRect(0, height - 130, width, 130);
  ctx.fillStyle = '#0F5132';
  ctx.fillRect(0, height - 130, width, 6);

  ctx.fillStyle = '#F5C518';
  ctx.font = '900 52px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('#FrameInGoa', width / 2, height - 50);

  ctx.strokeStyle = '#F5C518';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 6;
  ctx.strokeRect(20, 20, width - 40, height - 40);
}

/**
 * Render 3:4 Builder ID Card (1200x1600 px) matching Reference Image
 */
function renderEditorialBuilderIdCard(ctx, width, height, { img, zoom, panX, panY, name = '', stack = '', title = '' }) {
  // 1. Forest Green Outer Frame Base (#0F5132)
  ctx.fillStyle = '#0F5132';
  ctx.fillRect(0, 0, width, height);

  // Outer White Frame Border
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 16;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 6;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  // 2. Central Warm Cream Paper Pass Card (#F5F0DC)
  const cardX = 90;
  const cardY = 90;
  const cardW = width - 180;
  const cardH = height - 180;

  // Paper Offset Shadow
  ctx.fillStyle = '#073420';
  ctx.fillRect(cardX + 16, cardY + 16, cardW, cardH);

  // Cream Paper Base
  ctx.fillStyle = '#F5F0DC';
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 7;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  // Render Goa Beach Artwork inside Card Canvas
  drawReferenceGoaBeachEnvironment(ctx, cardX, cardY, cardW, cardH);

  // 3. Card Header Stamp & Typography
  // Hot Pink Stamp Badge
  ctx.fillStyle = '#E8177D';
  ctx.fillRect(cardX + 40, cardY + 40, 160, 48);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(cardX + 40, cardY + 40, 160, 48);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA', cardX + 120, cardY + 71);

  // BUILDER PASS Title
  ctx.fillStyle = '#0F5132';
  ctx.font = '900 52px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'left';
  ctx.fillText('BUILDER PASS', cardX + 230, cardY + 78);

  // Top Separator Line
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardY + 115);
  ctx.lineTo(cardX + cardW - 40, cardY + 115);
  ctx.stroke();

  // 4. Photo Container (Framed Square Slot)
  const photoW = 560;
  const photoH = 560;
  const photoX = (width - photoW) / 2;
  const photoY = cardY + 145;

  // Photo Shadow
  ctx.fillStyle = '#0F5132';
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
    ctx.fillStyle = '#ECE5C9';
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.fillStyle = '#0F5132';
    ctx.font = 'bold 26px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PHOTO', photoX + photoW / 2, photoY + photoH / 2);
  }
  ctx.restore();

  // Photo Frame Border
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  // 5. User Details Section
  const detailsY = photoY + photoH + 35;

  // Yellow Title Strip Badge
  ctx.fillStyle = '#F5C518';
  ctx.fillRect(cardX + 60, detailsY, cardW - 120, 54);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 4;
  ctx.strokeRect(cardX + 60, detailsY, cardW - 120, 54);

  ctx.fillStyle = '#0F5132';
  ctx.font = '900 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  const displayTitle = (title && title.trim()) ? title.trim().toUpperCase() : '⚡ THE CODE ARCHITECT';
  ctx.fillText(displayTitle, width / 2, detailsY + 36);

  // USER NAME — DYNAMICALLY DISPLAY USER'S FIRST NAME (ROHIT SHARMA -> ROHIT)
  ctx.fillStyle = '#0F5132';
  ctx.font = '900 64px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'center';
  let displayName = 'ROHIT';
  if (name && name.trim()) {
    const trimmed = name.trim().replace(/^@/, '');
    const parts = trimmed.split(/\s+/);
    displayName = parts[0].toUpperCase();
  }
  ctx.fillText(displayName, width / 2, detailsY + 155);

  // Stack / Primary Role Field (Hot Pink)
  ctx.fillStyle = '#E8177D';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  const displayStack = (stack && stack.trim()) ? stack.trim().toUpperCase() : 'FULL-STACK DEVELOPER';
  ctx.fillText(displayStack, width / 2, detailsY + 210);

  // 6. Card Footer Bar — Hot Pink Corner Wave Block & ID
  const footerY = cardY + cardH - 70;

  // Hot Pink Wave Corner Block at Bottom-Left (#E8177D)
  ctx.fillStyle = '#E8177D';
  ctx.beginPath();
  ctx.moveTo(cardX + 4, footerY - 50);
  ctx.quadraticCurveTo(cardX + 220, footerY - 40, cardX + 320, cardY + cardH - 4);
  ctx.lineTo(cardX + 4, cardY + cardH - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'left';
  ctx.fillText('#FRAMEINGOA', cardX + 30, cardY + cardH - 30);

  ctx.fillStyle = '#0F5132';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('ID: HH2026-XY9281', cardX + cardW - 40, cardY + cardH - 30);
}




