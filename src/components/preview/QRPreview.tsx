import QRCode from 'react-qr-code';
import { forwardRef } from 'react';
import DynamicFrame from './DynamicFrame';
import EditableFrame from './EditableFrame';

interface QRPreviewProps {
  value?: string;
  fgColor?: string;
  bgColor?: string;
  radius?: number;
  title?: string;
  titleColor: string;
  shadow?: string;
  selectedFrame: string | null;
}

function getScaleSize(radius: number = 0): number {
  const baseSize = 100;
  const minSize = 80;
  const startShrink = 30;
  const maxShrink = 100;

  if (radius > startShrink) {
    const percent = Math.min(1, (radius - startShrink) / (maxShrink - startShrink));
    return baseSize - percent * (baseSize - minSize);
  }

  return baseSize;
}

export default forwardRef(function QRPreview(
  {
    value,
    fgColor = '#111111',
    bgColor = '#ffffff',
    radius = 0,
    title = 'QRStyles.io',
    titleColor = '#000000',
    shadow = 'md',
    selectedFrame,
  }: QRPreviewProps,
  ref: React.Ref<HTMLDivElement>
) {
  const scaleSize = getScaleSize(radius);

  const qrCode = (
    <QRCode
      value={value ?? ''}
      bgColor={bgColor}
      fgColor={fgColor}
      className="w-full h-full"
      style={{
        width: `${scaleSize}%`,
        height: `${scaleSize}%`,
        borderRadius: `${radius * 0.1}px`,
      }}
    />
  );

  return (
    <div className="flex items-center justify-center self-center">
      {selectedFrame === 'editable' ? (
        <EditableFrame
          title={title}
          bgColor={bgColor}
          bgTitleColor={fgColor}
          titleColor={titleColor}
          borderRadius={`${radius}px`}
          shadow={shadow}
        >
          <div
            ref={ref}
            style={{ backgroundColor: bgColor, borderRadius: `${radius}px` }}
            className="aspect-square max-w-full flex items-center justify-center self-center z-50"
          >
            {qrCode}
          </div>
        </EditableFrame>
      ) : (
        <DynamicFrame
          frameName={selectedFrame || ''}
          title={title}
          titleColor={titleColor}
          bgTitleColor={fgColor}
          bgColor={bgColor}
        >
          <div
            ref={ref}
            className="aspect-square max-w-full flex items-center justify-center self-center z-50"
          >
            {qrCode}
          </div>
        </DynamicFrame>
      )}
    </div>
  );
});
