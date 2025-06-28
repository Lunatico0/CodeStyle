import { useState } from "react";

export default function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded overflow-hidden">
      <button
        className="w-full text-left px-4 py-2 font-semibold bg-stone-100 dark:bg-stone-800 dark:text-white"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}
