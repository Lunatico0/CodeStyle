import { useState, useRef, useEffect } from "react";
import AccordionSection, { AccordionProvider } from "@utils/AccordionSection";
import { normalizeImg } from "@utils/normalizeImg";
import QRPreview from "@components/preview/QRPreview";
import QRLogoOptions from "@components/personalizacion/QRLogoOptions.tsx";
import QRStyleOptions from "@components/personalizacion/QRStyleOptions.tsx";
import QRSizeOptions from "@components/personalizacion/QRSizeOptions.tsx";
import QRContentOptions, { type QRType } from "@components/personalizacion/QRContentOptions.tsx";
import QRTitleOptions from "@components/personalizacion/QRTitleOptions.tsx";

export default function QRCustomizer() {
  const [qrValue, setQrValue] = useState("https://pittanapatricio.vercel.app");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dotsColor, setDotsColor] = useState("#111111");
  const [cornerSquareColor, setCornerSquareColor] = useState("#111111");
  const [cornerDotColor, setCornerDotColor] = useState("#111111");
  const [qrType, setQrType] = useState<QRType>("url");
  const [qrForm, setQrForm] = useState({
    url: "",
    text: "",
    email: { to: "", subject: "", body: "" },
    wifi: { ssid: "", password: "", type: "WPA", hidden: false },
    vCard: {
      firstname: "",
      lastname: "",
      company: "",
      job: "",
      phoneNumber: "",
      mobileNumber: "",
      faxNumber: "",
      email: "",
      website: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const [radius, setRadius] = useState(25);
  const [padding, setPadding] = useState(20);
  const [size, setSize] = useState(350);

  const [dotsType, setDotsType] = useState
    <"square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded">
    ("dots");
  const [cornerSquareType, setCornerSquareType] = useState
    <"square" | "dot" | "extra-rounded" | 'rounded' | 'dots' | 'classy' | 'classy-rounded'>
    ("extra-rounded");
  const [cornerDotType, setCornerDotType] = useState
    <"square" | "dot" | "rounded" | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded'>
    ("extra-rounded");

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(120);
  const [logoMargin, setLogoMargin] = useState(4);

  const [title, setTitle] = useState<string | null>(null);
  const [showTitle, setShowTitle] = useState(false);
  const [titleColor, setTitleColor] = useState("#ffffff");
  const [bgTitleColor, setBgTitleColor] = useState("#1f2937");
  const [titlePosition, setTitlePosition] = useState<"top" | "bottom" | "left" | "right">("top")
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);


  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoUrl) {
      normalizeImg(logoUrl).then(({ scaleFactor, limited }) => {
        if (limited) {
          const adjustedSize = Math.floor(logoSize * scaleFactor);
          setLogoSize(adjustedSize);
        }
      });
    }
  }, [logoUrl]);

  function handleQrDataChange(value: string): void {
    setQrValue(value);
  }

  return (
    <div className="flex flex-col-reverse md:flex-row md:items-start gap-8 md:gap-12 w-full justify-evenly items-center">
      <QRPreview
        value={qrValue}
        bgColor={bgColor}
        radius={radius}
        padding={padding}
        logoUrl={logoUrl ?? undefined}
        logoSize={logoSize}
        logoMargin={logoMargin}
        dotsType={dotsType}
        cornerSquareType={cornerSquareType}
        cornerDotType={cornerDotType}
        title={title}
        titleColor={titleColor}
        titlePosition={titlePosition}
        bgTitleColor={bgTitleColor}
        selectedFrame={selectedFrame}
        dotsColor={dotsColor}
        cornerSquareColor={cornerSquareColor}
        cornerDotColor={cornerDotColor}
      />

      <div className="flex flex-col items-center gap-4">
        <AccordionProvider>
          {/* Contenido del QR */}
          <AccordionSection title="🔢 Contenido del QR">
            <QRContentOptions
              qrType={qrType}
              setQrType={setQrType}
              onValueChange={handleQrDataChange}
              form={qrForm}
              setForm={setQrForm}
            />
          </AccordionSection>

          {/* 🎨 Colores */}
          <AccordionSection title="🎨 Estilos y Colores del QR">
            <QRStyleOptions
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
              logoSize={logoSize}
              logoMargin={logoMargin}
              setLogoUrl={setLogoUrl}
              setLogoSize={setLogoSize}
              setLogoMargin={setLogoMargin}
            />
          </AccordionSection>


          {/* 🧱 Tamaño y Bordes */}
          <AccordionSection title="🧱 Tamaño y Bordes">
            <QRSizeOptions
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
            <QRTitleOptions
              showTitle={showTitle}
              setShowTitle={setShowTitle}
              title={title}
              setTitle={setTitle}
              titleColor={titleColor}
              setTitleColor={setTitleColor}
              bgTitleColor={bgTitleColor}
              setBgTitleColor={setBgTitleColor}
              titlePosition={titlePosition}
              setTitlePosition={setTitlePosition}
            />
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
