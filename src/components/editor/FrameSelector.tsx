import { FRAME_PRESETS } from "@editor/FrameGallery";

export default function FrameSelector({ onSelect }: { onSelect: (frameId: string) => void }) {
  return (
    <div className="flex gap-4 overflow-x-auto p-2">
      {FRAME_PRESETS.map((frame) => (
        <button
          key={frame.id}
          onClick={() => onSelect(frame.id)}
          className="border rounded p-1 hover:shadow"
        >
          {frame.file ? (
            <img src={frame.file} alt={frame.name} className="w-20 h-20 object-contain" />
          ) : (
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-xs">
              {frame.name}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
