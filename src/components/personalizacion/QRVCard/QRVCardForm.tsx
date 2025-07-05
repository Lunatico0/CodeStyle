import type { VCardFormType } from "@/types/vCardFormType";

interface Props {
  form: VCardFormType;
  setForm: (form: VCardFormType) => void;
  visibleFields: string[];
}

export default function QRVCardForm({ form, setForm, visibleFields }: Props) {
  const inputClass = "w-full text-sm px-2 py-1 border border-stone-300 rounded-md focus:outline-none";

  const renderInput = (key: keyof VCardFormType, label: string) => (
    <input
      key={key}
      value={form[key]}
      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      placeholder={label}
      className={inputClass}
    />
  );

  return (
    <div className="space-y-2">
      {renderInput("firstname", "Nombre")}
      {renderInput("lastname", "Apellido")}
      {renderInput("mobileNumber", "Teléfono móvil")}

      {visibleFields.map((key) =>
        renderInput(key as keyof VCardFormType, key.charAt(0).toUpperCase() + key.slice(1))
      )}
    </div>
  );
}
