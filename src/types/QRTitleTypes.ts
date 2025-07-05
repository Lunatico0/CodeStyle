export interface QRTitleOptionsProps {
  showTitle: boolean;
  setShowTitle: (value: boolean) => void;
  title: string | null;
  setTitle: (value: string) => void;
  titleColor: string;
  setTitleColor: (value: string) => void;
  bgTitleColor: string;
  setBgTitleColor: (value: string) => void;
  titlePosition: "top" | "bottom" | "left" | "right";
  setTitlePosition: (value: "top" | "bottom" | "left" | "right") => void;
}
