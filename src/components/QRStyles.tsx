import { useState } from "react";

export default function QRStyle({ radius, setRadius }: {
  radius: number;
  setRadius: (r: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-md font-medium">Bordes redondeados</label>
        <span className="text-sm">{radius}px</span>
      </div>
      <div className="flex gap-4 items-center justify-between">
        <input
          type="range"
          min={0}
          step={1}
          max={120}
          value={radius}
          onChange={(e) => setRadius(+e.target.value)}
          className="w-full mx-4"
        />
      </div>
    </div>
  );
}
