const fields = [
  { key: "company", label: "Empresa" },
  { key: "job", label: "Puesto" },
  { key: "phoneNumber", label: "Teléfono laboral" },
  { key: "faxNumber", label: "Fax" },
  { key: "website", label: "Sitio web" },
  { key: "street", label: "Calle" },
  { key: "city", label: "Ciudad" },
  { key: "state", label: "Provincia/Estado" },
  { key: "zip", label: "Código Postal" },
  { key: "country", label: "País" },
];

interface Props {
  visibleFields: string[];
  setVisibleFields: (fields: string[]) => void;
}

export default function QRVCardSelector({ visibleFields, setVisibleFields }: Props) {
  const toggleField = (field: string) => {
    setVisibleFields(
      visibleFields.includes(field)
        ? visibleFields.filter(f => f !== field)
        : [...visibleFields, field]
    );
  };

  return (
    <>
      <p className="font-medium text-nowrap">Campos adicionales:</p>
      <div className="space-y-1 text-sm grid grid-cols-3 gap-x-4">
        {fields.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibleFields.includes(key)}
              onChange={() => toggleField(key)}
            />
            {label}
          </label>
        ))}
      </div>
    </>
  );
}
