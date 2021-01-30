import { useEffect } from "react";
import styles from "./whatsapp.module.scss";
import WhatsappIcon from "../../public/icons/icons8-whatsapp.svg";

// let WhWidgetSendButton

export default function Whatsapp() {
  useEffect(() => {
    loadWhatsapp();
  },[]);

  const loadWhatsapp = () => {
    
  };
  return (
    <a href="https://wa.me/919846117476" target="_blank" className={styles.whatsapp}>
      <span className="bg-light p-2 rounded shadow-sm">message us</span>
      <WhatsappIcon className={styles.icon} />
    </a>
  );
}
