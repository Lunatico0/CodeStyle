import ColorPickerPopover from "@utils/ColorPickerPopover";

interface QRStyleOptionsProps {
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

export default function QRStyleOptions({
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
}: QRStyleOptionsProps) {
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
