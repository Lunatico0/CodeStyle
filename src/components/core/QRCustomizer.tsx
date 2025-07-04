import { useState, useRef } from "react";
import AccordionSection, { AccordionProvider } from "@editor/AccordionSection";
import QRPreview from "@components/preview/QRPreview";
import QRContent, { type QRType } from "@editor/QRContent";
import QRSizeAndRadius from "@components/editor/QRStyles.tsx";
import QRAppearance from "@components/editor/QRAppearance.tsx";
import QRLogoOptions from "@components/editor/QRLogoOptions.tsx";

export default function QRCustomizer() {
  const [qrValue, setQrValue] = useState("https://pittanapatricio.vercel.app");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dotsColor, setDotsColor] = useState("#111111");
  const [cornerSquareColor, setCornerSquareColor] = useState("#111111");
  const [cornerDotColor, setCornerDotColor] = useState("#111111");
  const [qrType, setQrType] = useState<QRType>("url");

  const [radius, setRadius] = useState(0);
  const [padding, setPadding] = useState(2);
  const [size, setSize] = useState(300);

  const [dotsType, setDotsType] = useState
    <"square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded">
    ("dots");
  const [cornerSquareType, setCornerSquareType] = useState
    <"square" | "dot" | "extra-rounded" | 'rounded' | 'dots' | 'classy' | 'classy-rounded'>
    ("extra-rounded");
  const [cornerDotType, setCornerDotType] = useState
    <"square" | "dot" | "rounded" | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'>
    ("extra-rounded");

  const [logoUrl, setLogoUrl] = useState<string | null>("/Logo-PPdevRound(negro).png");
  const [logoSize, setLogoSize] = useState(120);
  const [logoMargin, setLogoMargin] = useState(4);
  const [logoRadius, setLogoRadius] = useState(0);

  const [title, setTitle] = useState("QRStyles");
  const [showTitle, setShowTitle] = useState(true);
  const [titleColor, setTitleColor] = useState("#ffffff");
  const [bgTitleColor, setBgTitleColor] = useState("#1f2937");
  const [logoBackground, setLogoBackground] = useState("#ffffff");
  const [selectedFrame, setSelectedFrame] = useState<string | null>("editable");

  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-start gap-8 md:gap-12 w-full justify-between items-center">
      <QRPreview
        value={qrValue}
        bgColor={bgColor}
        radius={radius}
        padding={padding}
        logoUrl={logoUrl ?? undefined}
        logoSize={logoSize}
        logoMargin={logoMargin}
        logoRadius={logoRadius}
        dotsType={dotsType}
        cornerSquareType={cornerSquareType}
        cornerDotType={cornerDotType}
        title={showTitle ? title : undefined}
        titleColor={titleColor}
        bgTitleColor={bgTitleColor}
        selectedFrame={selectedFrame}
        dotsColor={dotsColor}
        cornerSquareColor={cornerSquareColor}
        cornerDotColor={cornerDotColor}
        logoBackground={logoBackground}
      />

      <div className="flex flex-col items-center gap-4">
        <AccordionProvider>
          {/* Contenido del QR */}
          <AccordionSection title="🔢 Contenido del QR">
            <QRContent
              qrType={qrType}
              setQrType={setQrType}
              onValueChange={setQrValue}
            />
          </AccordionSection>

          {/* 🎨 Colores */}
          <AccordionSection title="🎨 Estilos y Colores del QR">
            <QRAppearance
              bgColor={bgColor}
              setBgColor={setBgColor}
              dotsType={dotsType}
              setDotsType={setDotsType}
              dotsColor={dotsColor}
              setDotsColor={setDotsColor}
              cornerSquareType={cornerSquareType}
              setCornerSquareType={setCornerSquareType}
              cornerSquareColor={cornerSquareColor}
              setCornerSquareColor={setCornerSquareColor}
              cornerDotType={cornerDotType}
              setCornerDotType={setCornerDotType}
              cornerDotColor={cornerDotColor}
              setCornerDotColor={setCornerDotColor}
            />
          </AccordionSection>

          {/* 🖼️ Logo */}
          <AccordionSection title="🖼️ Logo Opcional">
            <QRLogoOptions
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
              logoSize={logoSize}
              setLogoSize={setLogoSize}
              logoMargin={logoMargin}
              setLogoMargin={setLogoMargin}
              logoRadius={logoRadius}
              setLogoRadius={setLogoRadius}
              logoBackground={logoBackground}
              setLogoBackground={setLogoBackground}
            />
          </AccordionSection>


          {/* 🧱 Tamaño y Bordes */}
          <AccordionSection title="🧱 Tamaño y Bordes">
            <QRSizeAndRadius
              size={size}
              setSize={setSize}
              radius={radius}
              setRadius={setRadius}
              padding={padding}
              setPadding={setPadding}
            />
          </AccordionSection>

          {/* 🏷️ Título */}
          <AccordionSection title="🏷️ Título Opcional">
            <h2>toggle mostrar, input título, color título y fondo</h2>
          </AccordionSection>

          {/* 🔢 Contenido */}
          <AccordionSection title="🔢 Contenido del Titulo">
            <h2>Titulo</h2>
          </AccordionSection>
        </AccordionProvider>
      </div>
    </div>
  );
}
