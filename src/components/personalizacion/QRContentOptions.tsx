import { useEffect, useState } from "react";
import QRVCardForm from "./QRVCard/QRVCardForm";
import QRVCardSelector from "./QRVCard/QRVCardSelector";
import { buildVCard } from "./QRVCard/QRVCardFunctions";
import type { QRFormType } from "@/types/qrFormTypes";

export type QRType = "text" | "url" | "email" | "wifi" | "vCard";

interface QRContentOptionsProps {
  qrType: QRType;
  setQrType: (type: QRType) => void;
  onValueChange: (value: string) => void;
  form: QRFormType;
  setForm: React.Dispatch<React.SetStateAction<QRFormType>>;
}

export default function QRContentOptions({
  qrType,
  setQrType,
  onValueChange,
  form,
  setForm
}: QRContentOptionsProps) {

  const [visibleFields, setVisibleFields] = useState<string[]>([]);

  function ensureMinimumQRLength(content: string, minLength = 12): string {
    return content.length >= minLength
      ? content
      : content.padEnd(minLength, " ");
  }

  useEffect(() => {
    let content = "";

    switch (qrType) {
      case "url":
        content = form.url;
        break;
      case "text":
        content = form.text;
        break;
      case "email":
        const e = form.email;
        content = `mailto:${e.to}?subject=${encodeURIComponent(e.subject)}&body=${encodeURIComponent(e.body)}`;
        break;
      case "wifi":
        const w = form.wifi;
        content = `WIFI:T:${w.type};S:${w.ssid};P:${w.password};${w.hidden ? "H:true;" : ""};`;
        break;
      case "vCard":
        content = buildVCard(form.vCard);
        break;
    }

    onValueChange(ensureMinimumQRLength(content.trim()));
  }, [form, qrType, visibleFields]);

  const inputClass = "w-full text-sm px-2 py-1 border border-stone-300 rounded-md focus:outline-none";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["url", "text", "email", "wifi", "vCard"] as QRType[]).map((type) => (
          <button
            key={type}
            onClick={() => setQrType(type)}
            className={`px-3 py-1 rounded border hover:bg-brand-light/70 ${qrType === type ? "bg-brand-light text-white" : "bg-brand-dark dark:bg-stone-800"}`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {qrType === "text" && (
        <textarea
          rows={3}
          placeholder="Texto a mostrar"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className={inputClass}
        />
      )}

      {qrType === "url" && (
        <input
          type="url"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          placeholder="https://..."
          className={inputClass}
        />
      )}

      {qrType === "email" && (
        <>
          <input
            type="email"
            value={form.email.to}
            onChange={(e) => setForm({ ...form, email: { ...form.email, to: e.target.value } })}
            placeholder="Para (email)"
            className={inputClass}
          />
          <input
            value={form.email.subject}
            onChange={(e) => setForm({ ...form, email: { ...form.email, subject: e.target.value } })}
            placeholder="Asunto"
            className={inputClass}
          />
          <textarea
            rows={2}
            value={form.email.body}
            onChange={(e) => setForm({ ...form, email: { ...form.email, body: e.target.value } })}
            placeholder="Mensaje"
            className={inputClass}
          />
        </>
      )}

      {qrType === "wifi" && (
        <>
          <input
            value={form.wifi.ssid}
            onChange={(e) => setForm({ ...form, wifi: { ...form.wifi, ssid: e.target.value } })}
            placeholder="SSID"
            className={inputClass}
          />
          <input
            value={form.wifi.password}
            onChange={(e) => setForm({ ...form, wifi: { ...form.wifi, password: e.target.value } })}
            placeholder="Contraseña"
            className={inputClass}
          />
          <select
            value={form.wifi.type}
            onChange={(e) => setForm({ ...form, wifi: { ...form.wifi, type: e.target.value } })}
            className={inputClass}
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Sin contraseña</option>
          </select>
          <label className="text-sm flex gap-2 items-center">
            <input
              type="checkbox"
              checked={form.wifi.hidden}
              onChange={(e) => setForm({ ...form, wifi: { ...form.wifi, hidden: e.target.checked } })}
            />
            Red oculta
          </label>
        </>
      )}

      {qrType === "vCard" && (
        <>
          <QRVCardForm
            form={form.vCard}
            setForm={(vCard) => setForm({ ...form, vCard })}
            visibleFields={visibleFields}
          />
          <QRVCardSelector visibleFields={visibleFields} setVisibleFields={setVisibleFields} />
        </>
      )}
    </div>
  );
}
