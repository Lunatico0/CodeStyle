// src/components/output/QRDownload.tsx

import { toPng, toJpeg } from 'html-to-image';
import { useState } from 'react';

interface QRDownloadProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function QRDownload({ targetRef }: QRDownloadProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('QRStyles-code');
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');

  const downloadQR = async () => {
    if (!targetRef.current) return;

    setLoading(true);
    try {
      let dataUrl = '';
      if (format === 'jpeg') {
        dataUrl = await toJpeg(targetRef.current, { quality: 0.95 });
      } else {
        dataUrl = await toPng(targetRef.current);
      }

      const link = document.createElement('a');
      link.download = `${fileName}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error al generar la imagen:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="p-2 border rounded dark:bg-stone-800"
          placeholder="Nombre del archivo"
        />
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as 'png' | 'jpeg')}
          className="p-2 border rounded dark:bg-stone-800"
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
        </select>
      </div>
      <button
        onClick={downloadQR}
        disabled={loading}
        className={`px-4 py-2 rounded transition text-white ${loading ? 'bg-stone-500' : 'bg-stone-700 hover:bg-stone-800'}`}
      >
        {loading ? 'Generando...' : `Descargar ${format.toUpperCase()}`}
      </button>
    </div>
  );
}
