import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { createPortal } from "react-dom";

interface ColorPickerPopoverProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export default function ColorPickerPopover({
  label,
  color,
  onChange,
}: ColorPickerPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !buttonRef.current?.contains(e.target as Node) &&
        !pickerRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recalcular posición del picker en pantalla
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 6, left: rect.left });
    }
  }, [isOpen]);

  return (
    <div className="relative w-full space-y-1">
      <label className="block text-sm font-medium text-brand-light">{label}</label>

      <div className="flex items-center gap-2">
        {/* 🎨 Botón para abrir el picker */}
        <button
          ref={buttonRef}
          type="button"
          className="w-8 h-8 rounded-full border border-secondary/70 shadow"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {/* Hex input */}
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 text-sm px-2 py-1 border border-stone-300 rounded-md focus:outline-none"
        />
      </div>

      {/* 🎨 Color Picker en portal */}
      {isOpen &&
        createPortal(
          <div
            ref={pickerRef}
            className="absolute z-[9999] border border-secondary/70 rounded-lg shadow-md bg-transparent"
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <HexColorPicker color={color} onChange={onChange} />
          </div>,
          document.body
        )}
    </div>
  );
}
