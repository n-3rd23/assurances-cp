import Admin from "../../components/layout/admin";
import { firestore, storage } from "../../firebase/firebase.util";
import ImageUploader from "../../components/image_uploader/imageUploader";
import { Button, Modal } from "antd";
import AddWhite from "../../public/icons/add_white.svg";
import { useState, useEffect } from "react";

// gallery page

export default function Gallery() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedGallery, setFetchedGallery] = useState([]);

  useEffect(() => {
    const unsubscribeGallery = firestore
      .collection("gallery")
      .onSnapshot(function (querySnapshot) {
        const tmp = [];
        querySnapshot.forEach(function (doc) {
          tmp.push({ id: doc.id, ...doc.data() });
        });
        setFetchedGallery(tmp);
      });

    return () => {
      unsubscribeGallery();
    };
  });

  const clearFields = () => {
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleImageChange = (imgDat) => {
    setImages[imgDat];
  };

  const upload = () => {
    setLoading(true);
    let imagesTmp = [];
    const storageRef = storage.ref();
    for (let i = 0; i < images.length; i++) {
      var uploadTask = storageRef
        .child(`gallery/${images[i].name}`)
        .put(images[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + prog + "% done");
        },
        (error) => {
          console.log("Error in uploading image : ", error);
        },
        () => {
          storage
            .ref("gallery")
            .child(images[i].name)
            .getDownloadURL()
            .then(async (url) => {
              imagesTmp.push({ name: images[i].name, link: url });
              if (i == images.length - 1) {
                try {
                  const galleryRef = await firestore.collection("gallery");
                  await galleryRef.add({
                    images: imagesTmp,
                  });
                  console.log("New Image added!!");
                  clearFields();
                } catch (error) {
                  console.log("error while uploading data!!", error);
                }
              }
            });
        }
      );
    }
  };

  return (
    <Admin title="Gallery" description="add images to gallery">
      <div className="container mt-5 ml-5">
        <Modal
          visible={isModalVisible}
          onCancel={clearFields}
          okText="Add"
          onOk={upload}
          confirmLoading={loading}
        >
          <ImageUploader onChange={handleImageChange} />
        </Modal>
        <Button
          type="primary"
          size="large"
          icon={
            <AddWhite style={{ width: "30px", color: "#fff", fill: "#fff" }} />
          }
          onClick={() => setIsModalVisible(true)}
        >
          Add new Image
        </Button>
        <div className="mt-4 row">
          {fetchedGallery
            ? fetchedGallery.length > 0
              ? fetchedGallery.map((item) => {
                  return (
                    <div
                      style={{ height: "250px" }}
                      className="col-md-3 p-3 shadow-sm rounded my-3 position-relative"
                      key={item.link}
                    >
                      <span
                        style={{ right: "0", cursor: "pointer" }}
                        className="position-absolute"
                      >
                        {" "}
                        <img
                          style={{ width: "25px", cursor: "pointer" }}
                          src="/icons/trash_red.svg"
                          alt="delete"
                          className="mx-2"
                        />{" "}
                      </span>
                      <img src={item.link} className="img-fluid" alt="image" />
                    </div>
                  );
                })
              : null
            : null}
        </div>
      </div>
    </Admin>
  );
}
