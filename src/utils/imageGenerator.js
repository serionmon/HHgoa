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
  teamName = '',
  title = 'Builder',
  builderId = 'HHG-717-1026'
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
    renderEditorialBuilderIdCard(offCtx, targetW, targetH, { img: preloadedImg, zoom, panX, panY, name, teamName, title, builderId });
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
 * Render 1:1 PFP Frame Collectible Badge (1080x1080 px)
 * Palette: Forest Green (#0F5132), Paper Cream (#F5F0DC), Hot Pink (#E8177D), Yellow (#F5C518)
 */
function renderEditorialPfpFrame(ctx, width, height, { img, zoom, panX, panY }) {
  const centerX = width / 2;
  const centerY = height / 2 - 10;
  const photoRadius = 330; // ~62% of canvas width

  // 1. Forest Green Outer Frame Base (#0F5132)
  ctx.fillStyle = '#0F5132';
  ctx.fillRect(0, 0, width, height);

  // 2. Layered Screen-Print Border Effect
  // Shadow Offset
  ctx.fillStyle = '#073420';
  ctx.fillRect(26, 26, width - 52, height - 52);

  // Outer Thick Cream Border Frame (#F5F0DC)
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 28;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Dark Inner Border Line
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Yellow Offset Accent Border (#F5C518)
  ctx.strokeStyle = '#F5C518';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(44, 44, width - 88, height - 88);

  // Pink Thin Accent Line (#E8177D)
  ctx.strokeStyle = '#E8177D';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // 3. Tropical Background Artwork (Behind Photo)
  // Setting Sun behind photo cutout
  ctx.save();
  ctx.fillStyle = '#F5C518';
  ctx.beginPath();
  ctx.arc(centerX, centerY + 180, 160, Math.PI, 0);
  ctx.fill();

  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Sun Rays
  ctx.strokeStyle = '#E8177D';
  ctx.lineWidth = 3;
  for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.28) {
    const rx1 = centerX + Math.cos(a) * 165;
    const ry1 = (centerY + 180) + Math.sin(a) * 165;
    const rx2 = centerX + Math.cos(a) * 210;
    const ry2 = (centerY + 180) + Math.sin(a) * 210;
    ctx.beginPath();
    ctx.moveTo(rx1, ry1);
    ctx.lineTo(rx2, ry2);
    ctx.stroke();
  }
  ctx.restore();

  // Flying Birds
  ctx.save();
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 3;
  drawBird(ctx, 160, 200, 18);
  drawBird(ctx, 195, 185, 12);
  drawBird(ctx, width - 180, 205, 16);
  drawBird(ctx, width - 145, 190, 10);
  ctx.restore();

  // Corner Palm Fronds framing top corners
  drawTopCornerPalmFronds(ctx, width);

  // Bottom Palm Trees framing left & right sides
  drawPalmTree(ctx, 40, height - 110, 0.85, -1);
  drawPalmTree(ctx, width - 40, height - 110, 0.85, 1);

  // 4. Hacker Decorative Micro-Elements (Corner/Side Details)
  ctx.save();
  ctx.font = '900 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F5C518';
  ctx.textAlign = 'left';
  ctx.fillText('</>', 70, 80);
  ctx.fillText('01', 115, 80);

  ctx.fillStyle = '#E8177D';
  ctx.textAlign = 'right';
  ctx.fillText('{ }', width - 115, 80);
  ctx.fillText('BUILD', width - 70, 80);

  ctx.fillStyle = '#F5F0DC';
  ctx.textAlign = 'left';
  ctx.fillText('SHIP', 68, 530);

  ctx.textAlign = 'right';
  ctx.fillText('GOA', width - 68, 530);
  ctx.restore();

  // 5. Signature "GOA SUN + CODE" Emblem (Positioned on top-right of photo ring)
  drawGoaSunCodeEmblem(ctx, centerX + photoRadius - 20, centerY - photoRadius + 60);

  // 6. Hero Photo Cutout & Multi-Layered Rings
  // Photo Shadow
  ctx.fillStyle = '#073420';
  ctx.beginPath();
  ctx.arc(centerX + 8, centerY + 8, photoRadius, 0, Math.PI * 2);
  ctx.fill();

  // Photo Content or Custom Integrated Placeholder
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
    // Custom Badge Placeholder when no image is uploaded
    ctx.fillStyle = '#073420';
    ctx.beginPath();
    ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
    ctx.fill();

    // Camera Icon Vector
    ctx.save();
    ctx.strokeStyle = '#F5C518';
    ctx.fillStyle = '#0F5132';
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(centerX - 40, centerY - 45, 80, 55, 10);
    } else {
      ctx.rect(centerX - 40, centerY - 45, 80, 55);
    }
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY - 18, 16, 0, Math.PI * 2);
    ctx.strokeStyle = '#F5C518';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#E8177D';
    ctx.beginPath();
    ctx.arc(centerX + 24, centerY - 32, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F5F0DC';
    ctx.font = '900 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('YOUR PHOTO', centerX, centerY + 36);

    ctx.fillStyle = '#F5C518';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText('CLICK OR DRAG TO UPLOAD', centerX, centerY + 65);
    ctx.restore();
  }

  // Multi-layered Ring Framing around Photo
  // Outer Cream Ring (#F5F0DC)
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Dark Inner Border Ring (#0F5132)
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius - 7, 0, Math.PI * 2);
  ctx.stroke();

  // Hot Pink Accent Outer Ring (#E8177D)
  ctx.strokeStyle = '#E8177D';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius + 12, 0, Math.PI * 2);
  ctx.stroke();

  // Yellow Tick-Mark Outer Ring (#F5C518)
  ctx.strokeStyle = '#F5C518';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, photoRadius + 22, 0, Math.PI * 2);
  ctx.stroke();

  // Decorative Notch Ticks around photo ring (8 cardinal/ordinal points)
  ctx.save();
  ctx.fillStyle = '#F5C518';
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI) / 4;
    const tx = centerX + Math.cos(ang) * (photoRadius + 22);
    const ty = centerY + Math.sin(ang) * (photoRadius + 22);
    ctx.beginPath();
    ctx.arc(tx, ty, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0F5132';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();

  // 7. Top Header Plaque ("HACKER HOUSE GOA • 2026")
  const headerW = 560;
  const headerH = 85;
  const headerX = (width - headerW) / 2;
  const headerY = 55;

  // Header Plaque Shadow
  ctx.fillStyle = '#073420';
  ctx.fillRect(headerX + 6, headerY + 6, headerW, headerH);

  // Header Plaque Base
  ctx.fillStyle = '#F5F0DC';
  ctx.fillRect(headerX, headerY, headerW, headerH);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 4.5;
  ctx.strokeRect(headerX, headerY, headerW, headerH);

  // Main Header Serif Typography
  ctx.fillStyle = '#0F5132';
  ctx.font = '900 42px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE', width / 2, headerY + 44);

  // Subtitle Monospace
  ctx.fillStyle = '#E8177D';
  ctx.font = '900 18px "JetBrains Mono", monospace';
  ctx.fillText('GOA • 2026', width / 2, headerY + 70);

  // Top Left Stamp Badge ("HHG 26")
  ctx.fillStyle = '#E8177D';
  ctx.fillRect(headerX - 55, headerY + 12, 105, 38);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3;
  ctx.strokeRect(headerX - 55, headerY + 12, 105, 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HHG 26', headerX - 2, headerY + 37);

  // Top Right Stamp Badge ("BUILDER")
  ctx.fillStyle = '#F5C518';
  ctx.fillRect(headerX + headerW - 50, headerY + 12, 110, 38);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3;
  ctx.strokeRect(headerX + headerW - 50, headerY + 12, 110, 38);

  ctx.fillStyle = '#0F5132';
  ctx.font = '900 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER', headerX + headerW + 5, headerY + 37);

  // 8. Bottom Layered Badge Block ("BUILD • SHIP • GOA" & "#FrameInGoa")
  const badgeW = width - 180;
  const badgeH = 120;
  const badgeX = (width - badgeW) / 2;
  const badgeY = height - 165;

  // Bottom Badge Shadow
  ctx.fillStyle = '#073420';
  ctx.fillRect(badgeX + 8, badgeY + 8, badgeW, badgeH);

  // Bottom Hot Pink Base
  ctx.fillStyle = '#E8177D';
  ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 5;
  ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

  // Inner Cream Border Line inside Badge
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(badgeX + 6, badgeY + 6, badgeW - 12, badgeH - 12);

  // Top Strip: "BUILD • SHIP • GOA"
  ctx.fillStyle = '#F5C518';
  ctx.font = '900 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILD • SHIP • GOA', width / 2, badgeY + 38);

  // Main Hashtag Typography: "#FrameInGoa"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 52px "Cinzel", "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('#FrameInGoa', width / 2, badgeY + 95);

  // Bottom Right Yellow Badge Stamp: "BUILDER 2026"
  ctx.fillStyle = '#F5C518';
  ctx.fillRect(badgeX + badgeW - 145, badgeY + badgeH - 26, 140, 32);
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3;
  ctx.strokeRect(badgeX + badgeW - 145, badgeY + badgeH - 26, 140, 32);

  ctx.fillStyle = '#0F5132';
  ctx.font = '900 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER 2026', badgeX + badgeW - 75, badgeY + badgeH - 5);
}

/**
 * Draws top corner palm leaf fronds
 */
function drawTopCornerPalmFronds(ctx, width) {
  ctx.save();
  ctx.fillStyle = '#0F5132';
  ctx.strokeStyle = '#F5F0DC';
  ctx.lineWidth = 2.5;

  // Left Top Corner Frond
  ctx.save();
  ctx.translate(50, 50);
  ctx.rotate(0.6);
  for (let i = 0; i < 4; i++) {
    ctx.rotate(0.35);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(50, -12, 90, 8);
    ctx.quadraticCurveTo(40, 6, 0, 0);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  // Right Top Corner Frond
  ctx.save();
  ctx.translate(width - 50, 50);
  ctx.rotate(-0.6);
  for (let i = 0; i < 4; i++) {
    ctx.rotate(-0.35);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-50, -12, -90, 8);
    ctx.quadraticCurveTo(-40, 6, 0, 0);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  ctx.restore();
}

/**
 * Draws signature "GOA SUN + CODE" emblem badge
 */
function drawGoaSunCodeEmblem(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);

  // Outer Yellow Sun Disc (#F5C518)
  ctx.fillStyle = '#F5C518';
  ctx.beginPath();
  ctx.arc(0, 0, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0F5132';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Hot Pink Inner Ring (#E8177D)
  ctx.strokeStyle = '#E8177D';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI * 2);
  ctx.stroke();

  // Center Code Symbol "< />"
  ctx.fillStyle = '#0F5132';
  ctx.font = '900 18px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('</>', 0, 6);

  ctx.restore();
}

/**
 * Render 3:4 Builder ID Card (1200x1600 px) matching Reference Image
 */
function renderEditorialBuilderIdCard(ctx, width, height, { img, zoom, panX, panY, name = '', teamName = '', title = '', builderId = 'HHG-717-1026' }) {
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
  const displayTitle = (title && title.trim()) ? title.trim().toUpperCase() : 'BUILDER';
  if (displayTitle.length > 26) {
    ctx.font = '900 18px "JetBrains Mono", monospace';
  } else if (displayTitle.length > 20) {
    ctx.font = '900 20px "JetBrains Mono", monospace';
  } else {
    ctx.font = '900 24px "JetBrains Mono", monospace';
  }
  ctx.textAlign = 'center';
  ctx.fillText(displayTitle, width / 2, detailsY + 36);

  // USER NAME — EXACTLY WHAT THE USER ENTERED
  ctx.fillStyle = '#0F5132';
  const displayName = (name && name.trim()) ? name.trim().toUpperCase() : 'YOUR NAME';
  if (displayName.length > 22) {
    ctx.font = '900 38px "Cinzel", "Playfair Display", serif';
  } else if (displayName.length > 15) {
    ctx.font = '900 48px "Cinzel", "Playfair Display", serif';
  } else {
    ctx.font = '900 64px "Cinzel", "Playfair Display", serif';
  }
  ctx.textAlign = 'center';
  ctx.fillText(displayName, width / 2, detailsY + 155);

  // Team Name Field (Hot Pink) — DISPLAY ENTERED TEAM NAME OR SOLO BUILDER IF EMPTY
  ctx.fillStyle = '#E8177D';
  const displayTeam = (teamName && teamName.trim()) 
    ? (teamName.trim().toUpperCase().startsWith('TEAM') ? teamName.trim().toUpperCase() : `TEAM: ${teamName.trim().toUpperCase()}`)
    : 'SOLO BUILDER';
  if (displayTeam.length > 26) {
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
  } else if (displayTeam.length > 20) {
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
  } else {
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
  }
  ctx.textAlign = 'center';
  ctx.fillText(displayTeam, width / 2, detailsY + 210);

  // 6. Card Footer Bar — Hot Pink Corner Wave Block & Stable ID
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
  const displayId = builderId || 'HHG-717-1026';
  ctx.fillText(`ID: ${displayId}`, cardX + cardW - 40, cardY + cardH - 30);
}




