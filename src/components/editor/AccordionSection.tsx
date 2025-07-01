import { useState, useContext, createContext, ReactNode } from "react";

const AccordionContext = createContext<{
  openSection: string | null;
  setOpenSection: (title: string | null) => void;
}>({ openSection: null, setOpenSection: () => {} });

export function AccordionProvider({ children }: { children: ReactNode }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openSection, setOpenSection }}>
      {children}
    </AccordionContext.Provider>
  );
}

export default function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { openSection, setOpenSection } = useContext(AccordionContext);
  const isOpen = openSection === title;

  return (
    <div className="border rounded overflow-hidden">
      <button
        className="w-full text-left px-4 py-2 font-semibold bg-stone-100 dark:bg-stone-800 dark:text-white"
        onClick={() => setOpenSection(isOpen ? null : title)}
      >
        {title}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}
