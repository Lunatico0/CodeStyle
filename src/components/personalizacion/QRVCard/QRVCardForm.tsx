import type { VCardFormType } from "@types/vCardFormType";

interface Props {
  form: VCardFormType;
  setForm: (form: VCardFormType) => void;
  visibleFields: string[];
}

export default function QRVCardForm({ form, setForm, visibleFields }: Props) {
  const inputClass = "p-2 w-full border rounded dark:bg-stone-800";

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
