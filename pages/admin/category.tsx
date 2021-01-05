import Admin from "../../components/layout/admin";
import { Button, Modal, Input } from "antd";
import AddWhite from "../../public/icons/add_white.svg";
import QuillText from "../../components/quill_text/quillText";
import { useEffect, useState } from "react";
import { firestore, storage } from "../../firebase/firebase.util";
import PlanCard from "../../components/plancard/plancard";
import ImageUploader from "../../components/image_uploader/imageUploader";

export default function Category() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    var tmp = [];
    const categoriesRef = await firestore.collection("categories");
    const categoriesDoc = await categoriesRef.get();
    categoriesDoc.forEach((doc) => {
      tmp.push({ id: doc.id, ...doc.data() });
    });
    setFetchedCategories(tmp);
  };

  console.log(fetchedCategories);

  const getCategoryName = (event) => {
    setCategoryName(event.target.value);
  };

  const getDescription = (value) => {
    setDescription(value);
  };

  const getImages = (imageDat) => {
    setImages(imageDat);
  };

  // to delete a category
  const deleteCategory = async (id) => {
    try {
      await firestore.collection("categories").doc(id).delete()
      fetchCategories()
    } catch(error) {
      console.log("error while deleting category", error)
    }
  }

  // will cleaer all the fields and close the modal.
  const clearFields = () => {
    setCategoryName("");
    setDescription("");
    setLoading(false);
    setIsModalVisible(false);
  };

  const upload = async () => {
    if (images) {
      if (images.length <= 0) {
        console.log("add images"); // add notifications here (if no images are uploaded)
        return;
      }
    }
    setLoading(true);
    let imagesTmp = [];
    const storageRef = storage.ref();
    for (let i = 0; i < images.length; i++) {
      var uploadTask = storageRef
        .child(`categories/${images[i].name}`)
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
            .ref("categories")
            .child(images[i].name)
            .getDownloadURL()
            .then(async (url) => {
              imagesTmp.push({ name: images[i].name, link: url });
              if (i == images.length - 1) {
                try {
                  const categoriesRef = await firestore.collection(
                    "categories"
                  );
                  await categoriesRef.add({
                    name: categoryName,
                    description: description,
                    images: imagesTmp,
                  });
                  console.log("New category added !!");
                  clearFields();
                  fetchCategories();
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
    <Admin title="Category" description="add or remove category">
      <div className="mt-5 ml-5 container">
        <Button
          type="primary"
          size="large"
          icon={
            <AddWhite style={{ width: "30px", color: "#fff", fill: "#fff" }} />
          }
          onClick={() => setIsModalVisible(true)}
        >
          Add new Category
        </Button>
      </div>
      <div className="col-md-12 mt-3 container">
        {fetchedCategories ? (
          fetchedCategories.length > 0 ? (
            fetchedCategories.map((category) => {
              return (
                <PlanCard
                  key={category.id}
                  cardTitle={category.name}
                  description={category.description}
                  onDelClick={deleteCategory}
                  onEditClick={(event) => console.log(event)}
                  id={category.id}
                  isEdit={false}
                />
              );
            })
          ) : null
        ) : null 
        }
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={() => {
          clearFields();
        }}
        title="Add new Category"
        okText="Add"
        destroyOnClose={true}
        onOk={upload}
        confirmLoading={loading}
      >
        <div className="form-group my-2">
          <label htmlFor="category_name">Category Name</label>
          <Input
            value={categoryName}
            onChange={getCategoryName}
            id="category_name"
          />
        </div>
        <div className="form-group my-2">
          <label>Description</label>
          <QuillText value={description} onChange={getDescription} />
        </div>
        <div className="form-group my-2">
          <ImageUploader onChange={getImages} />
        </div>
      </Modal>
    </Admin>
  );
}
