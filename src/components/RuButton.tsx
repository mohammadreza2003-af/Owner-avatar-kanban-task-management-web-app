import { type ReactNode } from "react";
import { Button } from "./ui/button";

const RuButton = ({
  functionlity,
  children,
  customStyle,
}: {
  functionlity: () => void;
  children: ReactNode;
  customStyle?: {
    backgroundColor: {
      color: string;
    };
    className: string;
  };
}) => {
  return (
    <Button
      style={{
        background: customStyle?.backgroundColor.color || "none",
        padding: 0,
      }}
      className={customStyle?.className}
      onClick={() => functionlity}
    >
      {children}
    </Button>
  );
};

export default RuButton;
