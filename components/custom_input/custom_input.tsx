import { ChangeEvent, Fragment } from "react";
import styles from "./custom_input.module.scss";

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  variant?: "primary" | "bordered" | "ghost";
  value?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  warning?: string;
  isTextArea?: boolean;
  rows?: number;
}

export default function CustomInput({
  className,
  type = "text",
  placeholder,
  variant = "primary",
  value,
  onChange,
  warning,
  isTextArea = false,
  rows = 5,
}: Props) {
  let input_variant = styles.primary;
  if (variant == "bordered") {
    input_variant = styles.bordered;
  } else if (variant == "ghost") {
    input_variant = styles.ghost;
  }

  let classes = className
    ? `px-3 py-2 ${className} ${input_variant}`
    : `px-3 py-2 ${input_variant}`;
  if (value && value.length > 0) classes += " " + styles.active;
  if (warning && warning.length > 0) classes += " " + styles.danger;

  if (isTextArea) {
    return (
      <Fragment>
        <textarea
          className={classes}
          placeholder={placeholder}
          onChange={onChange}
          rows={rows}
        ></textarea>
        <small className="d-block ms-1 text-danger">{warning}</small>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <input
          className={classes}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        <small className="d-block ms-1 text-danger">{warning}</small>
      </Fragment>
    );
  }
}
