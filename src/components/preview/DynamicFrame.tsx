// src/components/DynamicFrame.tsx

import { useEffect, useState } from "react";

interface DynamicFrameProps {
  frameName: string; // Ej: "marco1"
  children: React.ReactNode;
  bgColor?: string;
  bgTitleColor?: string;
  titleColor?: string;
  title?: string;
}

export default function DynamicFrame({
  frameName,
  children,
  bgColor = "#ffffff",
  bgTitleColor = "#1f2937",
  titleColor = "#ffffff",
  title = "QRStyles.io",
}: DynamicFrameProps) {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(`/assets/frames/${frameName}.svg`)
      .then(res => res.text())
      .then(svg => setSvgContent(
        transformSVG(svg, { bgColor, bgTitleColor, titleColor, title })
      ));

  }, [frameName, bgColor, bgTitleColor, titleColor, title]);

  return (
    <div className="relative w-[300px] h-[375px]">
      <div
        className="absolute inset-0 pointer-events-none"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <div className="absolute top-[110px] left-[40px] w-[220px] h-[220px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}


interface FrameColors {
  bgColor: string;
  bgTitleColor: string;
  titleColor: string;
  title: string;
}

function transformSVG(svg: string, colors: FrameColors): string {
  const { bgColor, bgTitleColor, titleColor, title } = colors;

  return svg
    .replace("<!--QR-->", `
      <foreignObject x="270" y="330" width="460" height="460">
        <div xmlns="http://www.w3.org/1999/xhtml" class="qr-slot"/>
      </foreignObject>`)
    .replace(
      /(<rect[^>]*width=["']1000["'][^>]*height=["']1250["'][^>]*fill=")[^"']+(["'])/,
      `$1${bgColor}$2`
    )
    .replace(
      /(<rect[^>]*width=["']1000["'][^>]*height=["']200["'][^>]*fill=")[^"']+(["'])/,
      `$1${bgTitleColor}$2`
    )
    .replace(
      /(<text[^>]*fill=")[^"']+(["'])/,
      `$1${titleColor}$2`
    )
    .replace(
      /(<text[^>]*>)(.*?)(<\/text>)/,
      `$1${title}$3`
    );
}
