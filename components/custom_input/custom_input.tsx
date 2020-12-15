import { FormEvent, Fragment, useEffect, useState } from "react";
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
  const [classes, setClasses] = useState(`px-3 py-2 ${input_variant}`);

  useEffect(() => {
    if (className) setClasses(classes + " " + className);
  }, [className]);

  useEffect(() => {
    if (value) setClasses(classes + " " + styles.active);
  }, [value]);

  useEffect(() => {
    if (warning && warning.length > 0)
      setClasses(classes + " " + styles.danger);
  }, [warning]);

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
