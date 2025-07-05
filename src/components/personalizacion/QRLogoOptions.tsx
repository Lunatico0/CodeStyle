import type { ChangeEvent } from "react";

interface QRLogoOptionsProps {
  logoUrl: string | null;
  logoSize: number;
  logoMargin: number;
  setLogoUrl: (url: string | null) => void;
  setLogoSize: (val: number) => void;
  setLogoMargin: (val: number) => void;
}

export default function QRLogoOptions({
  logoUrl,
  logoSize,
  logoMargin,
  setLogoUrl,
  setLogoSize,
  setLogoMargin,
}: QRLogoOptionsProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5 text-brand-text">
      {/* 📂 Subir Logo */}
      <div>
        <label className="block text-sm font-semibold mb-1">Subir logo (PNG/JPG/SVG)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm file:bg-brand-default file:text-white file:px-3 file:py-1 file:rounded file:border file:border-secondary/70 hover:file:bg-brand-light/70 transition-all duration-300"
        />
        {logoUrl && (
          <div className="mt-2">
            <img src={logoUrl} alt="Logo" className="h-16 rounded shadow border border-brand-default bg-brand-light" />
            <button
              onClick={() => setLogoUrl(null)}
              className="text-xs text-red-500 underline mt-1 hover:text-red-400"
            >
              Eliminar logo
            </button>
          </div>
        )}
      </div>

      {/* 📏 Tamaño del logo */}
      <div>
        <label className="block text-sm font-medium text-brand-text">
          Tamaño del logo: <span className="font-semibold">{logoSize}px</span>
        </label>
        <input
          type="range"
          min={20}
          max={240}
          step={4}
          value={logoSize}
          onChange={(e) => setLogoSize(parseInt(e.target.value))}
          className="w-full accent-brand-light"
        />
      </div>

      {/* 📦 Margen del logo */}
      <div>
        <label className="block text-sm font-medium text-brand-text">
          Margen del logo: <span className="font-semibold">{logoMargin}px</span>
        </label>
        <input
          type="range"
          min={0}
          max={20}
          step={1}
          value={logoMargin}
          onChange={(e) => setLogoMargin(parseInt(e.target.value))}
          className="w-full accent-brand-light"
        />
      </div>
    </div>
  );
}
