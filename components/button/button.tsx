import { createElement, ReactNode } from "react";
import styles from "./button.module.scss";

interface Props {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  loading?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  onClick,
  loading = false,
}: Props) {
  let buttonStyles = styles.primary;
  if (variant == "outline") {
    buttonStyles = styles.outline;
  } else if (variant == "ghost") {
    buttonStyles = styles.ghost;
  }

  const classes = className
    ? `px-4 py-2 align-items-center ${styles.btn} ${buttonStyles} ${className}`
    : `px-4 py-2 align-items-center ${styles.btn} ${buttonStyles}`;

  if (onClick) {
    return createElement(
      "button",
      { type, className: classes, onClick },
      loading ? (
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        children
      )
    );
  } else {
    return createElement(
      "button",
      { type, className: classes },
      loading ? (
        <div
          className="spinner-border align-middle spinner-border-sm"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        children
      )
    );
  }
}
