import { FormEvent, Fragment } from "react";
import styles from "./custom_input.module.scss";

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  variant?: "primary" | "bordered";
  value?: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  warning?: string;
}

export default function CustomInput({
  className,
  type = "text",
  placeholder,
  variant = "primary",
  value,
  onChange,
  warning,
}: Props) {
  let input_variant = styles.primary;
  if (variant == "bordered") {
    input_variant = styles.bordered;
  }

  let classes = className
    ? `px-3 py-2 ${className} ${input_variant}`
    : `px-3 py-2 ${input_variant}`;
  if (value && value.length > 0) classes += " " + styles.active;
  if (warning && warning.length > 0) classes += " " + styles.danger;

  return (
    <Fragment>
      <input
        className={classes}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      <small className="d-block text-danger">{warning}</small>
    </Fragment>
  );
}
