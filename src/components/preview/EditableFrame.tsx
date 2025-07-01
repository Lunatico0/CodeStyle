interface EditableFrameProps {
  title?: string;
  bgColor?: string;
  titleColor?: string;
  bgTitleColor?: string;
  borderRadius?: string;
  shadow?: string;
  children?: React.ReactNode;
}

export default function EditableFrame({
  title = "QRStyles.io",
  bgColor = "#ffffff",
  titleColor = "#ffffff",
  bgTitleColor = "#1f2937",
  borderRadius = "20px",
  shadow = "md",
  children,
}: EditableFrameProps) {
  return (
    <div
      className={`w-[300px] h-[375px] flex flex-col overflow-hidden shadow-${shadow}`}
      style={{
        backgroundColor: bgColor,
        borderRadius: borderRadius,
      }}
    >
      {/* Header */}
      <div
        className="w-full h-20 flex items-center justify-center"
        style={{
          backgroundColor: bgTitleColor,
          borderTopRightRadius: borderRadius,
          borderTopLeftRadius: borderRadius,
        }}
      >
        <h2 className="text-xl font-bold" style={{ color: titleColor }}>
          {title}
        </h2>
      </div>

      {/* QR Area */}
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
