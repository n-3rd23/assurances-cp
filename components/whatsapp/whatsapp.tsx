import { useEffect } from "react";

// let WhWidgetSendButton

export default function Whatsapp() {
  useEffect(() => {
    loadWhatsapp();
  },[]);

  const loadWhatsapp = () => {
    var options = {
      whatsapp: "+919846117476", // WhatsApp number
      call_to_action: "Message us", // Call to action
      position: "right", // Position may be 'right' or 'left'
    };
    var proto = document.location.protocol,
      host = "getbutton.io",
      url = proto + "//static." + host;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = url + "/widget-send-button/js/init.js";
    s.onload = function () {
      try {
        WhWidgetSendButton.init(host, proto, options);
      } catch (err) {
        console.error(err)
      }
    };
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  };
  return <div className="d-none"></div>;
}
