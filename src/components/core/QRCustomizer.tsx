import { useState, useRef } from 'react';
import QRForm from '@editor/QRForm';
import QRStyles from '@editor/QRStyles';
import QRColors from '@editor/QRColors';
import QRPreview from '../preview/QRPreview';
import QRDownload from '../output/QRDownload';
import { AccordionProvider } from "@editor/AccordionSection";
import AccordionSection from "@editor/AccordionSection";
import QRFrame from '@editor/QRFrame';

export default function QRCustomizer() {
  const [text, setText] = useState('https://pittanapatricio.vercel.app');
  const [title, setTitle] = useState('QRStyles.io');
  const [selectedFrame, setSelectedFrame] = useState<string | null>("frame1");

  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#111111');
  const [titleColor, setTitleColor] = useState('#ffffff');
  const [radius, setRadius] = useState(20);
  const qrRef = useRef<HTMLDivElement>(null);

  const qrConfig = {
    value: text,
    fgColor,
    bgColor,
    radius,
    title,
    titleColor,
    selectedFrame,
  };

  return (
    <div className="flex flex-col gap-4">
      <QRForm onValue={setText} />
      <h2 className="text-lg font-semibold mb-2">Vista previa del QR</h2>

      <AccordionProvider>
        <AccordionSection title='🎨 Colores del QR'>
          <QRColors
            fgColor={fgColor}
            bgColor={bgColor}
            titleColor={titleColor}
            title={title}
            setFgColor={setFgColor}
            setTitleColor={setTitleColor}
            setBgColor={setBgColor}
            setTitle={setTitle}
          />
        </AccordionSection>

        <AccordionSection title='🔘 Bordes redondeados'>
          <QRStyles
            radius={radius}
            setRadius={setRadius}
          />
        </AccordionSection>

        <AccordionSection title="🖼️ Marco personalizado">
          <QRFrame onSelectFrame={setSelectedFrame} />
        </AccordionSection>

      </AccordionProvider>

      <QRPreview ref={qrRef} {...qrConfig} />

      <QRDownload
        targetRef={qrRef}
      />
    </div>
  );
}
