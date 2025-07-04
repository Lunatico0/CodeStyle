import { HexColorPicker } from "react-colorful";
import ColorPickerPopover from "./ColorPickerPopover.tsx";

interface QRAppearanceProps {
  bgColor: string;
  dotsColor: string;
  cornerDotColor: string;
  cornerSquareColor: string;

  dotsType: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
  cornerSquareType: "square" | "dot" | "extra-rounded" | 'rounded' | 'dots' | 'classy' | 'classy-rounded';
  cornerDotType: "square" | "dot" | "rounded" | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';

  setBgColor: (val: string) => void;
  setDotsColor: (val: string) => void;
  setCornerSquareColor: (val: string) => void;
  setCornerDotColor: (val: string) => void;

  setDotsType: (val: any) => void;
  setCornerSquareType: (val: any) => void;
  setCornerDotType: (val: any) => void;
}

export default function QRAppearance({
  bgColor,
  dotsColor,
  cornerSquareColor,
  cornerDotColor,
  dotsType,
  cornerSquareType,
  cornerDotType,
  setBgColor,
  setDotsColor,
  setCornerSquareColor,
  setCornerDotColor,
  setDotsType,
  setCornerSquareType,
  setCornerDotType,
}: QRAppearanceProps) {
  const types = {
    dots: [
      "dots",
      "square",
      "rounded",
      "extra-rounded",
      "classy",
      "classy-rounded"
    ],
    square: [
      "dot",
      "square",
      'rounded',
      "extra-rounded",
      'dots',
      'classy',
      'classy-rounded'
    ],
    dot: [
      "dot",
      "square",
      "rounded",
      'extra-rounded',
      'dots',
      'classy',
      'classy-rounded',
    ],
  };

  const renderSelect = (label: string, value: string, setValue: (val: string) => void, options: string[]) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-gray-300 bg-brand-light rounded px-2 py-1 text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  const renderColor = (label: string, value: string, setValue: (val: string) => void) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      <HexColorPicker color={value} onChange={setValue} />
    </div>
  );
  {/* <input
        type="color"
        value={value}
        onChange={}
        className="w-full h-10 p-1 rounded border border-gray-300 bg-transparent"
      /> */}
  return (
    <div className="grid grid-cols-2 gap-4">
      <ColorPickerPopover
        label="🎨 Fondo del QR"
        color={bgColor}
        onChange={setBgColor}
      />

      {renderSelect("🔷 Tipo de Puntos", dotsType, setDotsType, types.dots)}

      <ColorPickerPopover
        label="Color de los puntos"
        color={dotsColor}
        onChange={setDotsColor}
      />

      {renderSelect("◼️ Esquinas Cuadradas", cornerSquareType, setCornerSquareType, types.square)}

      <ColorPickerPopover
        label="Esquinas"
        color={cornerSquareColor}
        onChange={setCornerSquareColor}
      />

      {renderSelect("🔹 Esquinas Interiores", cornerDotType, setCornerDotType, types.dot)}

      <ColorPickerPopover
        label="Puntos esquinas"
        color={cornerDotColor}
        onChange={setCornerDotColor}
      />
    </div>
  );
}
