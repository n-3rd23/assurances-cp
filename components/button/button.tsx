import { ReactNode } from "react";
import styles from "./button.module.scss";

interface Props {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  type?: "submit" | "button" | "reset";
  onClick: () => void;
}

export default function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  onClick,
}: Props) {
  let buttonStyles = styles.primary;
  if (variant == "outline") {
    buttonStyles = styles.outline;
  }
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        className
          ? `px-4 py-2 ${buttonStyles} ${className}`
          : `px-4 py-2 ${buttonStyles}`
      }
    >
      {children}
    </button>
  );
}
