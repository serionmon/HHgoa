const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB max limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

// In-memory cache for decoded HTMLImageElements to prevent re-loading & flickering
const imageCache = new Map();

export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { 
      valid: false, 
      error: `File size exceeds 15MB limit. (Selected: ${(file.size / (1024 * 1024)).toFixed(1)}MB)` 
    };
  }

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  const isAllowedMime = ALLOWED_TYPES.includes(fileType);
  const isAllowedExt = /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(fileName);

  if (!isAllowedMime && !isAllowedExt) {
    return { 
      valid: false, 
      error: 'Unsupported file format. Please upload a JPG, PNG, or WebP photo.' 
    };
  }

  return { valid: true, error: null };
}

/**
 * Loads and caches an HTMLImageElement by src URL
 */
export function loadImage(src) {
  if (!src) return Promise.reject(new Error('No image source provided'));
  
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (err) => reject(new Error('Failed to load image into memory: ' + err));
    img.src = src;
  });
}
