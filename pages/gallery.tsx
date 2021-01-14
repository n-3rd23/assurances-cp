import styles from "./gallery.module.scss";
import Bar from "../components/bar/bar";
import { firestore } from "../firebase/firebase.util";
import { useState, useEffect } from "react";
import Layout from "../components/layout/layout";

export default function Gallery() {
  const [images, setImages] = useState(null);
  useEffect(() => {
    const images = [];
    firestore
      .collection("gallery")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          images.push({ id: doc.id, ...doc.data() });
        });
        setImages(images);
      });
  });
  if (images) {
    return (
      <Layout title="Gallery" description="Best Life Insurance ever">
        <h3 className="text-largest fw-900 text-primary text-center mt-5">
          MOMENTS WE CAPTURED
        </h3>
        <Bar />
        <div className="row justify-content-center my-5 p-2">
          {images.map((item) => {
            return (
              <div
                className={`col-sm-3 col-md-3 col-12 p-2 ${styles.containerStyle}`}
              >
                <img
                  src={item.images[0].link}
                  className={styles.imgStyle}
                ></img>
              </div>
            );
          })}
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Gallery" description="Best Life Insurance ever">
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }
}
