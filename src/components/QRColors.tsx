export default function QRColors({
  fgColor,
  bgColor,
  setFgColor,
  setBgColor,
}: {
  fgColor: string;
  bgColor: string;
  setFgColor: (val: string) => void;
  setBgColor: (val: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <label className="flex flex-col text-sm">
        Color fondo
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
      </label>
      <label className="flex flex-col text-sm">
        Color código
        <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
      </label>
    </div>
  );
}
