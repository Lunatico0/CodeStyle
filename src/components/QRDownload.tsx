import { toPng } from 'html-to-image';

interface QRDownloadProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function QRDownload({ targetRef }: QRDownloadProps) {
  const downloadQR = async () => {
    if (!targetRef.current) return;
    const dataUrl = await toPng(targetRef.current);
    const link = document.createElement('a');
    link.download = 'QRStyles-code.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <button
      onClick={downloadQR}
      className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition"
    >
      Descargar PNG
    </button>
  );
}
