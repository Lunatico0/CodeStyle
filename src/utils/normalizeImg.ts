export interface NormalizedImageSize {
  width: number;
  height: number;
  scaleFactor: number;
  limited: boolean;
}

/**
 * Dada una URL de imagen y un tamaño máximo de ancho, calcula si necesita escalar
 * y devuelve el tamaño normalizado.
 */
export async function normalizeImg(
  url: string,
  maxWidth = 172,
  maxHeight = 172
): Promise<NormalizedImageSize> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;

      if (naturalHeight > maxHeight) {
        const scaleFactor = maxHeight / naturalHeight;
        resolve({
          width: scaleFactor * naturalWidth,
          height: maxHeight,
          scaleFactor,
          limited: true,
        });
      } else {
        resolve({
          width: naturalWidth,
          height: naturalHeight,
          scaleFactor: 1,
          limited: false,
        });
      }
    };

    img.onerror = (err) => reject(err);
  });
}
