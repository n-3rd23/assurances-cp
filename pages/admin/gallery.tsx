import Admin from "../../components/layout/admin";
import { firestore, storage } from "../../firebase/firebase.util";
import ImageUploader from "../../components/image_uploader/imageUploader";
import { Button, Modal } from "antd";
import AddWhite from "../../public/icons/add_white.svg";
import { useState, useEffect } from "react";

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
  }, []);

  const clearFields = () => {
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleImageChange = (imgDat) => {
    setImages(imgDat);
  };

  const deleteImage = async (event) => {
    // console.log(event.target.id)
    try {
      await firestore.collection("gallery").doc(event.target.id).delete();
      alert("Image deleted !!");
      const galleryStorageRef = await storage.ref();
      await galleryStorageRef
        .child(`gallery/${event.target.dataset.imgname}`)
        .delete();
      console.log("image deleted from storage");
    } catch (error) {
      console.error("error while deleting image :", error);
    }
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
          destroyOnClose={true}
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
                  // console.log(item.id)
                  return (
                    <div
                      className="col-md-3 my-3 position-relative"
                      key={item.images[0].link}
                    >
                      <span
                        style={{ right: "0", cursor: "pointer" }}
                        className="position-absolute"
                        data-imgid={item.id}
                        onClick={deleteImage}
                        id={item.id}
                        data-imgname={item.images[0].name}
                      >
                        {" "}
                        <img
                          style={{ width: "25px", cursor: "pointer" }}
                          src="/icons/trash_red.svg"
                          alt="delete"
                          className="mx-2"
                          id={item.id}
                          data-imgname={item.images[0].name}
                        />{" "}
                      </span>
                      <img
                        id={item.id}
                        src={item.images[0].link}
                        className="img-fluid"
                        alt="image"
                      />
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
