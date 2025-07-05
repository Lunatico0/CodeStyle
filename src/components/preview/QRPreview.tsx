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
  title?: string | null;
  titleColor?: string;
  bgTitleColor?: string;
  selectedFrame?: string | null;
  dotsColor?: string;
  cornerSquareColor?: string;
  cornerDotColor?: string;
  titlePosition?: "top" | "bottom" | "left" | "right";
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
      title,
      titleColor = "#ffffff",
      bgTitleColor = "#1f2937",
      selectedFrame = null,
      dotsColor,
      cornerSquareColor,
      cornerDotColor,
      titlePosition
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    function Title() {
      const isVertical = titlePosition === "left" || titlePosition === "right";

      if (!title) return null;

      return (
        <div
          className={
            `px-2 py-1 text-sm font-medium rounded flex ${isVertical ? "flex-col items-center leading-[0.95]" : "items-center justify-center"
            }`
          }
          style={{
            backgroundColor: bgTitleColor,
            color: titleColor,
          }}
        >
          {isVertical
            ? [...title].map((char, index) => (
              <span key={index}>{char}</span>
            ))
            : title}
        </div>
      );
    }


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
        dotsType={dotsType}
        cornerSquareType={cornerSquareType}
        cornerDotType={cornerDotType}
        dotsColor={dotsColor}
        cornerSquareColor={cornerSquareColor}
        cornerDotColor={cornerDotColor}
      />
    );

    if (!selectedFrame) return (
      <div
        className={`flex items-center justify-center ${titlePosition === "left" || titlePosition === "right" ? "flex-row" : "flex-col"}`}
      >
        {titlePosition === "top" && <Title />}
        {titlePosition === "left" && <Title />}
        {qrCode}
        {titlePosition === "bottom" && <Title />}
        {titlePosition === "right" && <Title />}
      </div>
    );

    const sharedProps = {
      title: title ?? "",
      bgColor,
      titleColor,
      bgTitleColor,
    };

    return selectedFrame === "editable" ? (
      <EditableFrame {...sharedProps}>
        <div className="flex flex-col items-center">
          {titlePosition === "top" && <Title />}
          {qrCode}
          {titlePosition === "bottom" && <Title />}
        </div>
      </EditableFrame>
    ) : (
      <DynamicFrame frameName={selectedFrame} {...sharedProps}>
        <div className="flex flex-col items-center">
          {titlePosition === "top" && <Title />}
          {qrCode}
          {titlePosition === "bottom" && <Title />}
        </div>
      </DynamicFrame>
    );
  }
);

QRPreview.displayName = "QRPreview";

export default QRPreview;
