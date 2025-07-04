interface QRSizeAndRadiusProps {
  size: number;
  setSize: (val: number) => void;
  radius: number;
  setRadius: (val: number) => void;
  padding: number;
  setPadding: (val: number) => void;
}

export default function QRSizeAndRadius({
  size,
  setSize,
  radius,
  setRadius,
  padding,
  setPadding,
}: QRSizeAndRadiusProps) {
  const sliderClass = "w-full accent-brand-light";

  return (
    <div className="space-y-6">
      {/* 📏 Tamaño */}
      <div>
        <label className="block font-medium text-sm mb-1">
          📐 Tamaño (px): {size}
        </label>
        <input
          type="range"
          min={100}
          max={600}
          step={10}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className={sliderClass}
        />
        <div className="flex justify-between text-xs text-brand-default">
          <span>100</span>
          <span>350</span>
          <span>600</span>
        </div>
      </div>

      {/* 🧱 Padding */}
      <div>
        <label className="block font-medium text-sm mb-1">
          🧱 Padding (espaciado interno)
        </label>
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={
            [0, 2, 19, 35, 52].indexOf(padding) !== -1
              ? [0, 2, 19, 35, 52].indexOf(padding)
              : 0
          }
          onChange={(e) => {
            const value = parseInt(e.target.value);
            const steps = [0, 2, 19, 35, 52];
            setPadding(steps[value]);
          }}
          className={sliderClass}
        />
        <div className="flex justify-between text-xs text-brand-default mt-1">
          <span>Nivel 0</span>
          <span>Nivel 1</span>
          <span>Nivel 2</span>
          <span>Nivel 3</span>
          <span>Nivel 4</span>
        </div>
      </div>



      {/* 🔲 Bordes redondeados */}
      <div>
        <label className="block font-medium text-sm mb-1">
          🔲 Bordes redondeados: {radius}px
        </label>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className={sliderClass}
        />
        <div className="flex justify-between text-xs text-brand-default">
          <span>0px</span>
          <span>25px</span>
          <span>50px</span>
        </div>
      </div>
    </div>
  );
}
