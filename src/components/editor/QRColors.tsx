function ColorInput({
  label,
  value,
  onChange,
  type = "color",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: "color" | "text";
}) {
  return (
    <label className="flex flex-col text-sm gap-1">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={type === "text" ? "border rounded px-2 py-1" : ""}
      />
    </label>
  );
}

export default function QRColors({
  fgColor,
  bgColor,
  titleColor,
  title,
  setFgColor,
  setTitleColor,
  setBgColor,
  setTitle,
}: {
  fgColor: string;
  bgColor: string;
  titleColor: string;
  title: string;
  setFgColor: (val: string) => void;
  setTitleColor: (val: string) => void;
  setBgColor: (val: string) => void;
  setTitle: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ColorInput label="Texto del Marco" type="text" value={title} onChange={setTitle} />

      <div className="flex gap-2">
        <ColorInput label="Color fondo" value={bgColor} onChange={setBgColor} />
        <ColorInput label="Color código" value={fgColor} onChange={setFgColor}/>
        <ColorInput label="Color título" value={titleColor} onChange={setTitleColor} />
      </div>
    </div>
  );
}
