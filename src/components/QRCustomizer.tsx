import { useState, useRef } from 'react';
import QRForm from './QRForm.tsx';
import QRStyles from './QRStyles.tsx';
import QRColors from './QRColors.tsx';
import QRPreview from './QRPreview.tsx';
import QRDownload from './QRDownload.tsx';
import AccordionSection from './AccordionSection.tsx';
import QRFrame from './QRFrame.tsx';

export default function QRCustomizer() {
  const [text, setText] = useState('https://pittanapatricio.vercel.app');
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [fgColor, setFgColor] = useState('#111111');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [radius, setRadius] = useState(20);
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-4">
      <QRForm onValue={setText} />
      <h2 className="text-lg font-semibold mb-2">Vista previa del QR</h2>

      <AccordionSection title='🎨 Colores del QR'>
        <QRColors
          fgColor={fgColor}
          bgColor={bgColor}
          setFgColor={setFgColor}
          setBgColor={setBgColor}
        />
      </AccordionSection>

      <QRPreview
        ref={qrRef}
        value={text}
        fgColor={fgColor}
        bgColor={bgColor}
        radius={radius}
        frameUrl={frameUrl}
      />

      <AccordionSection title='🔘 Bordes redondeados'>
        <QRStyles
          radius={radius}
          setRadius={setRadius}
        />
      </AccordionSection>

      <AccordionSection title="🖼️ Marco personalizado">
        <QRFrame setFrameUrl={setFrameUrl} />
      </AccordionSection>

      <QRDownload
        targetRef={qrRef}
      />

    </div>
  );
}
