import { useEffect, useRef, forwardRef } from "react";
import QRCodeStyling, { shapeTypes } from "qr-code-styling";

interface QRStylingWrapperProps {
  value: string;
  size?: number;
  bgColor?: string;
  radius?: number;
  padding?: number;

  dotsType?: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
  cornerSquareType?: "square" | "dot" | "extra-rounded" | 'rounded' | 'dots' | 'classy' | 'classy-rounded';
  cornerDotType?: "square" | "dot" | "rounded" | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';

  dotsColor?: string;
  cornerSquareColor?: string;
  cornerDotColor?: string;

  logoUrl?: string;
  logoSize?: number;
  logoMargin?: number;
}

export default forwardRef<HTMLDivElement, QRStylingWrapperProps>(function QRStylingWrapper({
  value,
  size = 300,
  bgColor = "#ffffff",
  radius = 0,
  padding = 0,
  dotsType = "rounded",
  cornerSquareType = "square",
  cornerDotType = "square",
  logoUrl,
  logoSize = 60,
  logoMargin = 4,
  dotsColor,
  cornerSquareColor,
  cornerDotColor,
},
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);

  const generateOptions = () => ({
    width: size,
    height: size,
    data: value,
    margin: padding,
    dotsOptions: {
      color: dotsColor,
      type: dotsType,
      roundSize: true,
    },
    backgroundOptions: {
      color: bgColor,
    },
    cornersSquareOptions: {
      type: cornerSquareType,
      color: cornerSquareColor,
    },
    cornersDotOptions: {
      type: cornerDotType,
      color: cornerDotColor,
    },
    image: logoUrl || undefined,
    imageOptions: {
      crossOrigin: "anonymous",
      hideBackgroundDots: !!logoUrl,
      imageSize: logoSize / size,
      margin: logoMargin,
    },
  });

  // 1️⃣ Crear instancia solo una vez
  useEffect(() => {
    qrInstance.current = new QRCodeStyling(generateOptions());

    if (containerRef.current) {
      qrInstance.current.append(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  // 2️⃣ Actualizar si cambian props
  useEffect(() => {
    qrInstance.current?.update(generateOptions());
  }, [
    value,
    size,
    bgColor,
    radius,
    padding,
    dotsType,
    dotsColor,
    cornerSquareColor,
    cornerDotColor,
    cornerSquareType,
    cornerDotType,
    logoUrl,
    logoSize,
    logoMargin,
  ]);

  return (
    <div
      ref={containerRef}
      className="w-fit h-fit"
      style={{
        borderRadius: `${radius}px`,
        overflow: "hidden",
      }}
    />
  );
});
