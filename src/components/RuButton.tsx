import { type ReactNode } from "react";
import { Button } from "./ui/button";

const RuButton = ({
  functionlity,
  children,
  customStyle,
  disable,
}: {
  functionlity?: () => void;
  children: ReactNode;
  disable?: boolean;
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
      disabled={disable}
      style={{
        background: customStyle?.backgroundColor?.color || "none",
        padding: customStyle?.padding || 0,
      }}
      className={customStyle?.className}
      type="submit"
      onClick={() => functionlity && functionlity()}
    >
      {children}
    </Button>
  );
};

export default RuButton;
