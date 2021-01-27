import styles from "../styles/gallery.module.scss";
import Bar from "../components/bar/bar";
import { firestore } from "../firebase/firebase.util";
import { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import Image from "next/image";

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
  }, []);
  if (images) {
    return (
      <Layout title="Gallery" description="Best Life Insurance ever">
        <h3 className="text-largest fw-900 text-primary text-center mt-5">
          MOMENTS WE CAPTURED
        </h3>
        <Bar />

        <div className="d-flex flex-wrap justify-content-center my-5">
          {images.map((item) => {
            return (
              <div className={`p-2 ${styles.containerStyle}`}>
                <Image
                  src={item.images[0].link}
                  alt="Picture of the author"
                  width={250}
                  height={250}
                />
                {/* <img
                  src={item.images[0].link}
                  className={styles.imgStyle}
                ></img> */}
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
