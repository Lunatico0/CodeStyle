import { useState, useEffect } from "react";

type QRType = "url" | "text" | "email" | "wifi";
const QR_TYPES: QRType[] = ["url", "text", "email", "wifi"];

export default function QRForm({ onValue }: { onValue: (val: string) => void }) {
  const [type, setType] = useState<QRType>("url");
  const [form, setForm] = useState({
    url: "",
    text: "",
    email: { to: "", subject: "", body: "" },
    wifi: { ssid: "", password: "", type: "WPA", hidden: false },
  });

  useEffect(() => {
    let qr = "";
    const e = form.email;
    if (type === "url") qr = form.url;
    else if (type === "text") qr = form.text;
    else if (type === "wifi") {
      const w = form.wifi;
      qr = `WIFI:T:${w.type};S:${w.ssid};P:${w.password};${w.hidden ? "H:true;" : ""};`;
    }
    else qr = `mailto:${e.to}?subject=${encodeURIComponent(e.subject)}&body=${encodeURIComponent(e.body)}`;
    onValue(qr);
  }, [form, type]);

  const updateEmail = (key: keyof typeof form.email, val: string) => {
    setForm({ ...form, email: { ...form.email, [key]: val } });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {QR_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t as QRType)}
            className={`px-3 py-1 rounded border ${type === t ? "bg-stone-700 text-white" : "bg-white dark:bg-stone-800"}`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {type === "url" && (
        <InputField
          value={form.url}
          onChange={(val) => setForm({ ...form, url: val })} placeholder="https://..." />
      )}

      {type === "text" && (
        <textarea
          rows={3}
          value={form.text}
          placeholder="Texto para mostrar"
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="p-2 w-full border rounded dark:bg-stone-800"
        />
      )}

      {type === "email" && (
        <div className="space-y-2">
          <InputField
            type="email"
            value={form.email.to}
            onChange={(val) => updateEmail("to", val)}
            placeholder="Destino"
          />
          <InputField
            value={form.email.subject}
            onChange={(val) => updateEmail("subject", val)}
            placeholder="Asunto"
          />
          <textarea
            placeholder="Mensaje"
            rows={2}
            value={form.email.body}
            onChange={(e) => updateEmail("body", e.target.value)}
            className="p-2 w-full border rounded dark:bg-stone-800"
          />
        </div>
      )}

      {type === "wifi" && (
        <div className="space-y-2">
          <InputField
            value={form.wifi.ssid}
            onChange={(val) => setForm({ ...form, wifi: { ...form.wifi, ssid: val } })}
            placeholder="Nombre de la red (SSID)"
          />
          <InputField
            value={form.wifi.password}
            onChange={(val) => setForm({ ...form, wifi: { ...form.wifi, password: val } })}
            placeholder="Contraseña"
            type="text"
          />
          <div className="flex gap-2 items-center">
            <label className="text-sm">Tipo:</label>
            <select
              value={form.wifi.type}
              onChange={(e) => setForm({ ...form, wifi: { ...form.wifi, type: e.target.value } })}
              className="border rounded px-2 py-1 dark:bg-stone-800"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Sin contraseña</option>
            </select>
          </div>
          <label className="flex gap-2 text-sm items-center">
            <input
              type="checkbox"
              checked={form.wifi.hidden}
              onChange={(e) => setForm({ ...form, wifi: { ...form.wifi, hidden: e.target.checked } })}
            />
            Red oculta
          </label>
        </div>
      )}

    </div>
  );
}

function InputField({
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 w-full border rounded dark:bg-stone-800"
    />
  );
}
