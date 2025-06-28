import { useState } from "react";

type QRType = "url" | "text" | "email";

export default function QRForm({ onValue }: { onValue: (val: string) => void }) {
  const [type, setType] = useState<QRType>("url");
  const [form, setForm] = useState({
    url: "",
    text: "",
    email: { to: "", subject: "", body: "" },
  });

  const updateValue = () => {
    let qr = "";
    switch (type) {
      case "url":
        qr = form.url;
        break;
      case "text":
        qr = form.text;
        break;
      case "email":
        const e = form.email;
        qr = `mailto:${e.to}?subject=${encodeURIComponent(e.subject)}&body=${encodeURIComponent(e.body)}`;
        break;
    }
    onValue(qr);
  };

  return (
    <div className="space-y-4">
      {/* Type selector */}
      <div className="flex gap-2">
        {["url", "text", "email"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t as QRType);
              updateValue();
            }}
            className={`px-3 py-1 rounded border ${type === t ? "bg-stone-700 text-white" : "bg-white dark:bg-stone-800"}`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Formulario dinámico */}
      {type === "url" && (
        <input
          type="text"
          placeholder="https://..."
          value={form.url}
          onChange={(e) => {
            setForm({ ...form, url: e.target.value });
            onValue(e.target.value);
          }}
          className="p-2 w-full border rounded dark:bg-stone-800"
        />
      )}

      {type === "text" && (
        <textarea
          rows={3}
          placeholder="Texto para mostrar"
          value={form.text}
          onChange={(e) => {
            setForm({ ...form, text: e.target.value });
            onValue(e.target.value);
          }}
          className="p-2 w-full border rounded dark:bg-stone-800"
        />
      )}

      {type === "email" && (
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Destino"
            value={form.email.to}
            onChange={(e) => {
              const updated = { ...form.email, to: e.target.value };
              setForm({ ...form, email: updated });
              updateValue();
            }}
            className="p-2 w-full border rounded dark:bg-stone-800"
          />
          <input
            placeholder="Asunto"
            value={form.email.subject}
            onChange={(e) => {
              const updated = { ...form.email, subject: e.target.value };
              setForm({ ...form, email: updated });
              updateValue();
            }}
            className="p-2 w-full border rounded dark:bg-stone-800"
          />
          <textarea
            placeholder="Mensaje"
            rows={2}
            value={form.email.body}
            onChange={(e) => {
              const updated = { ...form.email, body: e.target.value };
              setForm({ ...form, email: updated });
              updateValue();
            }}
            className="p-2 w-full border rounded dark:bg-stone-800"
          />
        </div>
      )}
    </div>
  );
}
