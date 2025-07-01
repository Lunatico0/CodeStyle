import { useRef } from 'react';
import { FRAME_PRESETS } from './FrameGallery';

export default function QRFrame({
  onSelectFrame,
}: {
  onSelectFrame: (frameId: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onSelectFrame(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {FRAME_PRESETS.map((frame) => (
          <button
            key={frame.id}
            onClick={() => onSelectFrame(frame.id)}
            className="border p-1 rounded hover:shadow"
          >
            {frame.file ? (
              <img src={frame.file} alt={frame.name} className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center text-xs bg-gray-100">
                {frame.name}
              </div>
            )}
          </button>
        ))}
        <button onClick={() => onSelectFrame(null)} className="text-sm underline">
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
