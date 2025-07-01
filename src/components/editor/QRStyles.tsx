export default function QRStyles({
  radius,
  setRadius,
}: {
  radius: number;
  setRadius: (r: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-md font-medium">Bordes redondeados</label>
        <span className="text-sm">{radius}px</span>
      </div>

      <input
        type="range"
        min={0}
        max={120}
        step={1}
        value={radius}
        onChange={(e) => setRadius(parseInt(e.target.value))}
        className="w-full"
      />

      <div className="flex justify-between text-xs text-stone-500 px-1">
        <span>0px</span>
        <span>60px</span>
        <span>120px</span>
      </div>
    </div>
  );
}
