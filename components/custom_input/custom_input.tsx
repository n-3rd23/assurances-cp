import { Fragment } from "react";
import styles from "./custom_input.module.scss";

interface Props {
   className ?: string;
   type : string
   placeholder ?: string;
   variant ?: "primary" | "bordered"
}

export default function CustomInput({className,type,placeholder,variant = "primary"} : Props) {

   let input_variant = styles.primary
   if(variant == "bordered") {
      input_variant = styles.bordered
   }

   return (
      <input className={
         className 
         ? `px-2 py-1 ${className} ${input_variant}`
         : `px-2 py-1 ${input_variant}`
      } 
      type={type}
      placeholder={placeholder}
      />
   )
}