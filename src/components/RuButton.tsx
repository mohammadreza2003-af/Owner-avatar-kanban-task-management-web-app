import { type ReactNode } from "react";
import { Button } from "./ui/button";

const RuButton = ({
  functionlity,
  children,
  customStyle,
}: {
  functionlity?: () => void;
  children: ReactNode;
  customStyle?: {
    backgroundColor?: {
      color: string;
    };
    padding?: string | number;
    className: string;
  };
}) => {
  return (
    <Button
      style={{
        background: customStyle?.backgroundColor?.color || "none",
        padding: customStyle?.padding || 0,
      }}
      className={customStyle?.className}
      onClick={() => functionlity && functionlity()}
    >
      {children}
    </Button>
  );
};

export default RuButton;
