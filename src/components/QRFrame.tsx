import { useRef } from 'react';
import frame1 from '@assets/frames/frame1.svg';
import frame2 from '@assets/frames/frame2.svg';

export default function QRFrame({
  setFrameUrl,
}: {
  setFrameUrl: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const predefinedFrames = [
    { name: "Marco 1", src: typeof frame1 === 'string' ? frame1 : (frame1 as unknown as { default: string }).default ?? (frame1 as any).src },
    { name: "Marco 2", src: typeof frame2 === 'string' ? frame2 : (frame2 as unknown as { default: string }).default ?? (frame2 as any).src },
  ];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFrameUrl(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {predefinedFrames.map((frame) => (
          <button
            key={frame.name}
            onClick={() => setFrameUrl(frame.src)}
            className="border p-1 rounded hover:shadow"
          >
            <img src={frame.src} alt={frame.name} className="w-16 h-16 object-contain" />
          </button>
        ))}
        <button onClick={() => setFrameUrl(null)} className="text-sm underline">
          Quitar marco
        </button>
      </div>

      <label className="text-sm font-medium block">Marco personalizado</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/svg+xml"
        onChange={handleFile}
        className="text-sm"
      />
    </div>
  );
}
