import "./seprator.css";
import { CSSProperties } from "react";

interface SeparatorProps {
  type: "horizontal" | "vertical";
  style?: CSSProperties;
}

export function Separator({ type, style }: SeparatorProps) {
  if (type == "horizontal") {
    return <div className="horizontal-separator" style={style}></div>;
  }

  return <div className="vertical-separator" style={style}></div>;
}
