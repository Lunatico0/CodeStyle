type FramePosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'custom';

import frame1 from '../assets/frames/frame1.svg';

interface FrameWrapperProps {
  children: React.ReactNode;
  frame: 'frame1' | 'frame2'; // luego podemos hacerlo dinámico
  position?: FramePosition;
}

export default function FrameWrapper({ children, frame, position = 'center' }: FrameWrapperProps) {
  return (
    <div className="relative w-[310px] h-[310px]">
      {/* Marco SVG como fondo */}
      <img
        src={frame1.src}
        alt="Marco"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* QR Code en la posición indicada */}
      <div className={`absolute ${getPositionClasses(position)}`}>
        {children}
      </div>
    </div>
  );
}

// Utilidad para determinar la posición del QR
function getPositionClasses(pos: FramePosition) {
  switch (pos) {
    case 'top':
      return 'top-0.5 left-1/2 -translate-x-1/2';
    case 'bottom':
      return 'bottom-6 left-1/2 -translate-x-1/2';
    case 'left':
      return 'left-4 top-1/2 -translate-y-1/2';
    case 'right':
      return 'right-4 top-1/2 -translate-y-1/2';
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    case 'custom':
    default:
      return '';
  }
}
