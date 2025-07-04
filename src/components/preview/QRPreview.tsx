import { forwardRef, useRef } from "react";
import QRStylingWrapper from "@components/QRStylingWrapper";
import EditableFrame from "./EditableFrame";
import DynamicFrame from "./DynamicFrame";

interface QRPreviewProps {
  value: string;
  bgColor?: string;
  radius?: number;
  padding?: number;
  size?: number;
  dotsType?: "square" | "dots" | "rounded" | "extra-rounded" | "classy" | "classy-rounded";
  cornerSquareType?: "square" | "dot" | "extra-rounded" | 'rounded' | 'dots' | 'classy' | 'classy-rounded';
  cornerDotType?: "square" | "dot" | "rounded" | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
  logoUrl?: string;
  logoSize?: number;
  logoMargin?: number;
  logoRadius?: number;
  title?: string;
  titleColor?: string;
  bgTitleColor?: string;
  selectedFrame?: string | null;
  dotsColor?: string;
  cornerSquareColor?: string;
  cornerDotColor?: string;
  logoBackground?: string;
}

const QRPreview = forwardRef<HTMLDivElement, QRPreviewProps>(
  (
    {
      value,
      bgColor = "#ffffff",
      radius = 0,
      padding = 0,
      size = 300,
      dotsType = "dots",
      cornerSquareType = "dot",
      cornerDotType = "dot",
      logoUrl,
      logoSize = 60,
      logoMargin = 4,
      logoRadius = 0,
      title,
      titleColor = "#ffffff",
      bgTitleColor = "#1f2937",
      selectedFrame = null,
      dotsColor,
      cornerSquareColor,
      cornerDotColor,
      logoBackground,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const qrCode = (
      <QRStylingWrapper
        ref={ref || containerRef}
        value={value}
        size={size}
        bgColor={bgColor}
        radius={radius}
        padding={padding}
        logoUrl={logoUrl}
        logoSize={logoSize}
        logoMargin={logoMargin}
        logoRadius={logoRadius}
        dotsType={dotsType}
        cornerSquareType={cornerSquareType}
        cornerDotType={cornerDotType}
        dotsColor={dotsColor}
        cornerSquareColor={cornerSquareColor}
        cornerDotColor={cornerDotColor}
        logoBackground={logoBackground}
      />
    );

    if (!selectedFrame) return qrCode;

    const sharedProps = {
      title: title ?? "",
      bgColor,
      titleColor,
      bgTitleColor,
    };

    return selectedFrame === "editable" ? (
      <EditableFrame {...sharedProps}>
        {qrCode}
      </EditableFrame>
    ) : (
      <DynamicFrame frameName={selectedFrame} {...sharedProps}>
        {qrCode}
      </DynamicFrame>
    );
  }
);

QRPreview.displayName = "QRPreview";

export default QRPreview;
