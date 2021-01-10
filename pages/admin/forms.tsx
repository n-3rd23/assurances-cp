import Admin from "../../components/layout/admin";
import { Button, Modal, Input } from "antd";
import AddWhite from "../../public/icons/add_white.svg";
import { useState, useEffect } from "react";
import { firestore, storage } from "../../firebase/firebase.util";
import PlanCard from "../../components/plancard/plancard";

export default function Forms() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [files, setFiles] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchedForms, setFetchedForms] = useState([]);

  useEffect(() => {
    const unSubscribeForms = firestore
      .collection("forms")
      .onSnapshot((querySnapshot) => {
        const tmp = [];
        querySnapshot.forEach((doc) => {
          tmp.push({ id: doc.id, ...doc.data() });
        });
        setFetchedForms(tmp);
      });

      return () => {
        unSubscribeForms();
      }
  });

  const clearFields = () => {
    setName("");
    setFiles(null);
    setLoading(false);
    setIsModalVisible(false);
  };

  const getName = (event) => {
    setName(event.target.value);
  };

  const getFile = (event) => {
    setFiles(event.target);
  };

  const upload = () => {
    try {
      setLoading(true);
      if (files.files[0]) {
        const fileUploadPath = files.value;
        var extentions = fileUploadPath
          .substring(fileUploadPath.lastIndexOf(".") + 1)
          .toLowerCase();
        if (extentions == "pdf") {
          const formsStorageRef = storage.ref();
          var uploadTask = formsStorageRef
            .child(`forms/${name}`)
            .put(files.files[0]);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              var prog =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + prog + "% done");
            },
            (error) => {
              console.log("error in uploading file ", error);
            },
            () => {
              storage
                .ref("forms")
                .child(name)
                .getDownloadURL()
                .then(async (url) => {
                  const formsRef = await firestore.collection("forms");
                  await formsRef.add({
                    name: name,
                    url: url,
                  });
                  console.log("Form added");
                  clearFields();
                });
            }
          );
        } else {
          console.log("image not valid!");
        }
      }
    } catch (error) {
      console.log("error while adding file : ", error);
    }
  };

  const deleteForm = async (id) => {
    await firestore.collection("forms").doc(id).delete()
    console.log("deleted")
  }

  return (
    <Admin title="forms" description="page to upload forms">
      <div className="container mt-5 ml-5">
        <Button
          type="primary"
          size="large"
          icon={
            <AddWhite style={{ width: "30px", color: "#fff", fill: "#fff" }} />
          }
          onClick={() => setIsModalVisible(true)}
        >
          Add New Form
        </Button>
        <Modal
          visible={isModalVisible}
          onCancel={() => {
            clearFields();
          }}
          okText="Add"
          onOk={upload}
          confirmLoading={loading}
        >
          <div className="form-group mt-2">
            <label htmlFor="form_name">Name</label>
            <Input value={name} onChange={getName} id="form_name" />
          </div>
          <div className="form-group my-2">
            <input onChange={getFile} type="file" />
          </div>
        </Modal>
        <div className="mt-4">
          {fetchedForms
            ? fetchedForms.length > 0
              ? fetchedForms.map((item) => {
                  return (
                    <PlanCard
                      key={item.id}
                      cardTitle={item.name}
                      description={item.name}
                      id={item.id}
                      onDelClick={deleteForm}
                      isEdit={false}
                    />
                  );
                })
              : null
            : null}
        </div>
      </div>
    </Admin>
  );
}