import { Fragment } from "react";
import styles from "./home_features.module.scss";
import Feature_Card from "../feature_card/feature_card";

export default function Home_Features() {
  return (
    <Fragment>
      <div className="container text-center mt-3 text-largest fw-900 text-primary">
        NO MORE WORRIES
      </div>
      <div
        className={`d-flex justify-content-center mt-2 ${styles.containerStyle}`}
      >
        <div className="p-3">
          <Feature_Card
            icon="Safe"
            head="SECURE LIFE"
            content="Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a"
          />
        </div>
        <div className="p-3">
          <Feature_Card
            icon="Dove"
            head="PEACEFUL LIFE"
            content="Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a"
          />
        </div>
        <div className="p-3">
          <Feature_Card
            icon="Bank"
            head="FLEXIBLE COST"
            content="Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a"
          />
        </div>
      </div>
    </Fragment>
  );
}
