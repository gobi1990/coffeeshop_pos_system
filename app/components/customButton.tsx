import { memo, ReactNode } from "react";
import { FolderCog } from "lucide-react";
import { twJoin } from "tailwind-merge";

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  icon?: ReactNode; 
  className?: string; 
}

const CustomButton = memo(
  ({ onClick, label, icon = <FolderCog className="h-5 w-5" />, className }: CustomButtonProps) => {
    return (
      <button
        onClick={onClick}
        className={twJoin(
          "w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2",
          className 
        )}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;