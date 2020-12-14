import { Fragment } from "react";
import styles from "./insurance_main.module.scss";
import React, { useState } from "react";

export default function Insurance_Main() {
  const insurance = [
    {
      name: "VEHICLE INSURANCE",
      subText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum blandit odio, id iaculis felis tincidunt a.",
    },
    {
      name: "HOME INSURANCE",
      subText: "homeafaf afafa fawf ndit odio, id iaculis felis tincidunt a.",
    },
    {
      name: "TRAVEL INSURANCE",
      subText: "afafwf  awrard adt odio, id iaculis felis tincidunt a.",
    },
    {
      name: "LIFE INSURANCE",
      subText:
        "Lafw afawad aw wdaffawrrwararaum blandit odio, id iaculis felis tincidunt a.",
    },
  ];
  const [selectedItem, setSelectedItem] = useState(insurance[0].name);
  const [selectedItemText, setSelectedItemText] = useState(
    insurance[0].subText
  );
  const [count, setCount] = useState(1);
  return (
    <div className={`container-fluid mt-5 pt-5 ${styles.mainStyle}`}>
      <div className="container mt-5 w-100">
        <div className="d-flex justify-content-between ">
          <div className={`p-2 bd-highlight ${styles.sectionStyle}`}>
            {" "}
            <div className=" text-large fw-600">
              {selectedItem}
              <div className="text-medium fw-400">{selectedItemText}</div>
            </div>
            <div>
              <button type="button" className="btn btn-lg btn-outline-light">
                GET A QUOTE
              </button>
            </div>
          </div>
          <div className="p-2 bd-highlight ">PIC</div>
          <div className="p-2 bd-highlight ">
            <div
              className={`text-interSize fw-600 p-3 d-flex flex-column bd-highlight mb-3`}
            >
              {" "}
              {insurance.map((item) => {
                return (
                  <button
                    className={`border-0 ${styles.buttonStyle}`}
                    onClick={() => {
                      setSelectedItem(item.name),
                        setSelectedItemText(item.subText);
                    }}
                  >
                    <div className={`p-2 ${styles.divStyle}`}>{item.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
