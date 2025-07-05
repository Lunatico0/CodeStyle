import type { QRTitleOptionsProps } from '@/types/QRTitleTypes';
import ColorPickerPopover from '@utils/ColorPickerPopover.tsx';

export default function QRTitleOptions({
  showTitle,
  setShowTitle,
  title,
  setTitle,
  titleColor,
  setTitleColor,
  bgTitleColor,
  setBgTitleColor,
  titlePosition,
  setTitlePosition,
}: QRTitleOptionsProps) {

  return (
    <div className="flex flex-col gap-4">
      {/* Activar/Desactivar */}
      <div className="flex items-center justify-between">
        <label htmlFor="toggle-title">Mostrar título</label>
        <input
          id="toggle-title"
          type="checkbox"
          checked={showTitle}
          onChange={(e) => setShowTitle(e.target.checked)}
        />
      </div>

      {showTitle && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="qr-title">Título</label>
            <input
              id="qr-title"
              type="text"
              placeholder='QRStyles'
              value={title ?? ''}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm px-2 py-1 border border-stone-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="position">Posición</label>
            <select
              id="position"
              value={titlePosition}
              onChange={(e) => setTitlePosition(e.target.value as any)}
              className="w-full border border-gray-300 bg-brand-light rounded px-2 py-1 text-sm"
            >
              <option value="top">Arriba</option>
              <option value="bottom">Abajo</option>
              <option value="left">Izquierda</option>
              <option value="right">Derecha</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <ColorPickerPopover
              label="Color del texto"
              color={titleColor}
              onChange={setTitleColor}
            />

            <ColorPickerPopover
              label="Color de fondo"
              color={bgTitleColor}
              onChange={setBgTitleColor}
            />
          </div>
        </>
      )}
    </div>
  );
}
