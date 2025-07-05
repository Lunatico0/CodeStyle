import { useState, useContext, createContext, type ReactNode } from "react";

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
    <div className="w-[320px] md:w-[400px] max-w-full border border-stone-600 rounded-xl bg-brand-dark/80 shadow-md transition-all duration-300 overflow-hidden">
      <button
        onClick={() => setOpenSection(isOpen ? null : title)}
        className="w-full flex justify-between items-center px-4 py-3 text-left bg-stone-800 text-stone-100 hover:bg-brand-light transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 text-sm text-brand-text/70">{children}</div>
      )}
    </div>
  );
}
