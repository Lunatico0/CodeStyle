import QRCode from 'react-qr-code';
import { forwardRef } from 'react';

export default forwardRef(function QRPreview(
  {
    value,
    fgColor,
    bgColor,
    radius,
    frameUrl,
  }: {
    value?: string;
    fgColor?: string;
    bgColor?: string;
    radius?: number;
    frameUrl?: string | null;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const baseSize = 100;
  const minSize = 80;
  const startShrink = 30;
  const maxShrink = 100;

  let scaleSize = baseSize;

  if (typeof radius === 'number' && radius > startShrink) {
    const shrinkRange = maxShrink - startShrink;
    const percent = Math.min(1, (radius - startShrink) / shrinkRange);
    scaleSize = baseSize - percent * (baseSize - minSize);
  }

  return (
    <div className="flex items-center justify-center self-center">
      {frameUrl && (
        <img
          src={frameUrl}
          alt="Marco decorativo"
          className="aspect-square p-4 max-w-full flex items-center justify-center shadow self-center z-10 w-60 h-full object-contain pointer-events-none"
        />
      )}
      <div ref={ref}
        style={{
          backgroundColor: bgColor,
          borderRadius: `${radius}px`,
        }}
        className="aspect-square p-4 w-60 max-w-full flex items-center justify-center shadow self-center z-50">
        <QRCode
          value={value ?? ""}
          bgColor={bgColor}
          fgColor={fgColor}
          className="w-full h-full"
          style={{
            width: `${scaleSize}%`,
            height: `${scaleSize}%`,
            borderRadius: `${(radius || 0) * 0.1}px`,
          }}
        />
      </div>
    </div>
  );
});
