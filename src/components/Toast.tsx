import { ToastAction } from "./ui/toast";
import { toast } from "./ui/use-toast";

export const useCustomToast = () => {
  const showToast = (title: string, description: string) => {
    toast({
      style: {
        background: "rgb(32, 33, 44)",
        border: "1px solid rgba(99, 96, 199, 0.455)",
        color: "rgb(244, 247, 253)",
        padding: "16px",
        borderRadius: "8px",

      },
      title: title,
      description: description,
      duration: 2000,
      action: (
        <ToastAction
          altText="Go to schedule to undo"
          style={{
            background: "rgb(100, 96, 199)",
            color: "rgb(244, 247, 253)",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            marginLeft: "8px",
          }}
        >
          <img src="/assets/icon-cross.svg" />
        </ToastAction>
      ),
    });
  };

  return { showToast };
};
