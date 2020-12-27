import Admin from "../../components/layout/admin";
import { Fragment, useState, useEffect } from "react";
import PlanCard from "../../components/plancard/plancard";
import Button from "../../components/button/button";
import { Modal, Input, Checkbox, Row, Col, Select } from "antd";
import firebase, { firestore, storage } from "../../firebase/firebase.util";
import ImageUploader from "../../components/image_uploader/imageUploader";

export default function Plans() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [plan, setPlan] = useState("");
  const [summary, setSummary] = useState("");
  const [checkedList, setCheckedList] = useState([]); //payment mode
  const [termFrom, setTermFrom] = useState("");
  const [termTo, setTermTo] = useState("");
  const [minEntryAge, setMinEntryAge] = useState("");
  const [maxEntryAge, setMaxEntryAge] = useState("");
  const [maturityAge, setMaturityAge] = useState("");
  const [maxSumAssured, setMaxSumAssured] = useState("");
  const [minSumAssured, setMinSumAssured] = useState("");
  const [fetchedPlans, setFetchedPlans] = useState([]);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("")
  const [benefitModal, setBenefitModal] = useState(false);
  const [benefitTitle, setBenefitTitle] = useState("");
  const [benefitDescription, setBenefitDescription] = useState("");
  const [newBenefit, setNewBenefit] = useState([]);
  const [isEditPlan, setIsEditPlan] = useState(false)
  const [planEditId, setPlanEditId] = useState(null)
  const [imagesUrls, setImagesUrls] = useState(null) // to store images while editing
  const { TextArea } = Input;
  const { Option } = Select;

  useEffect(() => {
    fetchCategories();
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    let tmp = []
    const plansRef = await firestore.collection("plans");
    const plansDoc = await plansRef.get()
    plansDoc.forEach(doc => {
      tmp.push({ id: doc.id, ...doc.data() })
    })
    setFetchedPlans(tmp)
  };

  const fetchCategories = async () => {
    try {
      const categoriesRef = firestore
        .collection("category")
        .doc("PG3GNZvCAPhrtNmuO9oB");
      await categoriesRef.onSnapshot((doc) => {
        setCategories(doc.data())
      });
    } catch (error) {
      console.log("error while fetching category : ", error)
    }
  };

  const deletePlan = async (event) => {
    const result = await firestore.collection("plans").doc(event).delete()
    console.log("item deleted")
    fetchPlans()
  }

  const deleteImageFromDB = async (event) => {
    let deleteImgName = event.target.dataset.imgname
    const plansStorageRef = storage.ref();
    const deleteRef = plansStorageRef.child(`plans/${deleteImgName}`)
    deleteRef.delete()
    .then(async () => {
      console.log("Image deleted !!")
      var filterdArr = imagesUrls.filter((item) => {
        return item.name != deleteImgName
      })
      const plansRef = await firestore.collection("plans").doc(planEditId)
      plansRef.update({
        images: filterdArr
      }).then(() => {
        fetchPlans()
        clearFields()
      })
    })
    .catch(error => {
      console.log("error while deleting image : ", error)
    })
  }

  // to delete an added benefit
  const deleteBenefit = ((event) => {
    const dBenTitle = event.target.dataset.bentitle
    var filterdBenefits = newBenefit.filter((item) => {
      return item.title != dBenTitle
    })
    setNewBenefit(filterdBenefits)
  })

  // edit a plan
  const editPlan = (id) => {
    setPlanEditId(id)
    setIsEditPlan(true)
    setModalVisibility(true)
    fetchedPlans.map((plan) => {
      if (plan.id == id) {
        setNewBenefit(plan.benefits)
        setMaxEntryAge(plan.entryAge.max)
        setMinEntryAge(plan.entryAge.min)
        setMaturityAge(plan.maxMaturityAge)
        setCheckedList(plan.paymentMode)
        setPlan(plan.planName)
        setSummary(plan.planSummary)
        setTermFrom(plan.planTerm.from)
        setTermTo(plan.planTerm.to)
        setMaxSumAssured(plan.sumAssured.max)
        setMinSumAssured(plan.sumAssured.min)
        setSelectedCategory(plan.category)
        setImagesUrls(plan.images)
      }
    })
  }

  const showModal = () => {
    setModalVisibility(true);
  };

  const handleCancel = () => {
    clearFields()
    setModalVisibility(false);
    setIsEditPlan(false)
  };

  const getPlan = (event) => {
    setPlan(event.target.value);
  };

  const getSummary = (event) => {
    setSummary(event.target.value);
  };

  const getPaymentMode = (event) => {
    setCheckedList(event);
  };

  const getTermFrom = (event) => {
    var val = event.target.value
    setTermFrom(val);
  };

  const getTermTo = (event) => {
    var val = event.target.value
    setTermTo(val);
  };

  const getMaxEntryAge = (event) => {
    setMaxEntryAge(event.target.value);
  };

  const getMinEntryAge = (event) => {
    setMinEntryAge(event.target.value);
  };

  const getMaxSumAssured = (event) => {
    setMaxSumAssured(event.target.value);
  };

  const getMaturityAge = (event) => {
    setMaturityAge(event.target.value);
  };

  const getMinSumAssured = (event) => {
    setMinSumAssured(event.target.value);
  };

  const getImages = (images) => {
    setImages(images);
  };

  const getCategory = (event) => {
    setNewCategory(event.target.value);
  };

  // when a category is selected for a plan
  const selectCategory = (event) => {
    // console.log(event)
    setSelectedCategory(event)
  }

  const getBenefitTitle = (event) => {
    setBenefitTitle(event.target.value);
  };

  const getBenefitDescription = (event) => {
    setBenefitDescription(event.target.value);
  };

  // to clear fields
  const clearFields = () => {
    setPlan("");
    setSummary("");
    setTermFrom("");
    setTermTo("");
    setMinEntryAge("");
    setMaxEntryAge("");
    setMaturityAge("");
    setMaxSumAssured("");
    setMinSumAssured("");
    setNewBenefit([]);
    setImages([]);
    setLoading(false);
    setModalVisibility(false);
  }

  const addNewCategory = async () => {
    try {
      const categoriesRef = await firestore
        .collection("category")
        .doc("PG3GNZvCAPhrtNmuO9oB");
      await categoriesRef.set(
        {
          categories: firebase.firestore.FieldValue.arrayUnion(newCategory),
        },
        { merge: true }
      );
      setNewCategory("");
      setCategoryModal(false);
      fetchCategories();
    } catch (error) {
      console.log("error while adding category : ", error);
    }
  };

  const addNewBenefit = () => {
    setNewBenefit([
      ...newBenefit,
      { title: benefitTitle, description: benefitDescription },
    ]);
    setBenefitTitle("");
    setBenefitDescription("");
    setBenefitModal(false);
  };

  const upload = async () => {
    if (images) {
      if (images.length <= 0) {
        console.log("add images");
        return;
      }
    }
    setLoading(true);
    let imagesTmp = [];
    // uploading images
    const plansStorageRef = storage.ref();
    for (let i = 0; i < images.length; i++) {
      var uploadTask = plansStorageRef
        .child(`plans/${images[i].name}`)
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
            .ref("plans")
            .child(images[i].name)
            .getDownloadURL()
            .then(async (url) => {
              imagesTmp.push({name:images[i].name,link:url});
              // uploading to firestore
              if (i == images.length - 1) {
                try {
                  const plansRef = await firestore.collection("plans");
                  plansRef
                    .add({
                      planName: plan,
                      planSummary: summary,
                      paymentMode: checkedList,
                      planTerm: { from: termFrom, to: termTo },
                      entryAge: { min: minEntryAge, max: maxEntryAge },
                      maxMaturityAge: maturityAge,
                      sumAssured: { min: minSumAssured, max: maxSumAssured },
                      benefits: newBenefit,
                      images: imagesTmp,
                      category: selectedCategory
                    })
                    .then(() => {
                      console.log("New Plan Added Succesfully!!!");
                      clearFields()
                      fetchPlans()
                    });
                } catch (error) {
                  console.log("error while adding data : ", error);
                }
              }
            });
        }
      );
    }
  };

  // to upload the edited plan
  const uploadUpdate = async () => {
    setLoading(true)
    const plansRef = await firestore.collection("plans").doc(planEditId);
    let imagesTmp = [...imagesUrls] // adding fetched image data to the array
    // if new images are added while editing
    if (images.length > 0) {
      const plansStorageRef = storage.ref();
      for (let i = 0; i < images.length; i++) {
        var uploadTask = plansStorageRef
          .child(`plans/${images[i].name}`)
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
              .ref("plans")
              .child(images[i].name)
              .getDownloadURL()
              .then(async (url) => {
                imagesTmp.push({name: images[i].name, link: url});
                // uploading to firestore
                if (i == images.length - 1) {
                  try {
                    plansRef
                      .update({
                        planName: plan,
                        planSummary: summary,
                        paymentMode: checkedList,
                        planTerm: { from: termFrom, to: termTo },
                        entryAge: { min: minEntryAge, max: maxEntryAge },
                        maxMaturityAge: maturityAge,
                        sumAssured: { min: minSumAssured, max: maxSumAssured },
                        benefits: newBenefit,
                        category: selectedCategory,
                        images: imagesTmp,
                      })
                      .then(() => {
                        console.log("New Image added !!");
                        setLoading(false)
                        clearFields()
                        fetchPlans()
                      });
                  } catch (error) {
                    console.log("error while adding data : ", error);
                  }
                }
              });
          }
        );
      }
    }
    // if no images are added while editing
    else {
      await plansRef.update({
        planName: plan,
        planSummary: summary,
        paymentMode: checkedList,
        planTerm: { from: termFrom, to: termTo },
        entryAge: { min: minEntryAge, max: maxEntryAge },
        maxMaturityAge: maturityAge,
        sumAssured: { min: minSumAssured, max: maxSumAssured },
        benefits: newBenefit,
        category: selectedCategory,
        images: imagesUrls
      })
      console.log("Plan Updated")
      setLoading(false)
      clearFields()
      fetchPlans()
    }
  }

  return (
    <Admin title="plans" description="add or remove plans">
      <Fragment>
        <div className="container mt-5 ml-5">
          <div className="row">
            <div className="col-md-12">
              <Button className="bg-danger" onClick={showModal}>
                <Fragment>
                  <img
                    style={{ width: "25px" }}
                    src="/icons/add.svg"
                    alt="add"
                  />{" "}
                  &nbsp; ADD NEW PLAN
                </Fragment>
              </Button>
              <Modal
                title="Add New Plan"
                visible={modalVisibility}
                onCancel={handleCancel}
                width={600}
                okText="Add"
                onOk={isEditPlan ? uploadUpdate : upload}
                confirmLoading={loading}
                destroyOnClose={true}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group my-3">
                      <label className="mb-1" htmlFor="planName">
                        Plan
                      </label>
                      <Input value={plan} onChange={getPlan} id="planName" />
                    </div>
                    <div className="form-group my-3">
                      <label className="mb-1" htmlFor="summary">
                        Summary
                      </label>
                      <TextArea
                        id="summary"
                        allowClear={true}
                        autoSize={{ maxRows: 6 }}
                        onChange={getSummary}
                        value={summary}
                      />
                    </div>
                    <div className="my-3 form-group">
                      <label className="mb-1" htmlFor="paymentMode">
                        Payment Mode
                      </label>
                      <div>
                        <Checkbox.Group
                          options={[
                            "Yearly",
                            "Hafly",
                            "Quarterly",
                            "Monthely(ECS)",
                          ]}
                          value={checkedList}
                          onChange={getPaymentMode}
                        />
                      </div>
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="category" className="mb-2">
                        Category
                      </label>
                      <div>
                        <Select onChange={selectCategory} value={selectedCategory} defaultValue="select" className="w-50">
                          <Fragment>
                            <Option value="select">--select--</Option>
                            {categories
                              ? categories.categories.length > 0
                                ? categories.categories.map((item) => {
                                  return (
                                    <Option key={item} value={item}>
                                      {item}
                                    </Option>
                                  );
                                })
                                : null
                              : null}
                          </Fragment>
                        </Select>
                        <a
                          className="d-block mt-2 text-info"
                          href="#"
                          onClick={() => setCategoryModal(true)}
                        >
                          Add New Category
                        </a>
                        {/* new category modal begins */}
                        <Modal
                          visible={categoryModal}
                          onCancel={() => setCategoryModal(false)}
                          onOk={addNewCategory}
                          okText="Add"
                        >
                          <Input
                            onChange={getCategory}
                            placeholder="New Category Name"
                            value={newCategory}
                            type="text"
                          />
                        </Modal>
                        {/* new category modal ends */}
                      </div>
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="term" className="mb-1">
                        Term
                      </label>
                      <div className="site-input-group-wrapper">
                        <Input.Group>
                          <Row gutter={8}>
                            <Col span={6}>
                              <Input
                                onChange={getTermFrom}
                                placeholder="from"
                                value={termFrom}
                              />
                            </Col>
                            <span className="mx-1"> - </span>
                            <Col span={6}>
                              <Input
                                onChange={getTermTo}
                                placeholder="to"
                                value={termTo}
                              />
                            </Col>
                          </Row>
                        </Input.Group>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="my-3 form-group">
                      <label htmlFor="term" className="mb-1">
                        Entry Age
                      </label>
                      <div className="site-input-group-wrapper">
                        <Input.Group>
                          <Row gutter={8}>
                            <Col span={6}>
                              <Input
                                onChange={getMinEntryAge}
                                placeholder="minimum"
                                value={minEntryAge}
                              />
                            </Col>
                            <span className="mx-1"> - </span>
                            <Col span={6}>
                              <Input
                                onChange={getMaxEntryAge}
                                placeholder="maximum"
                                value={maxEntryAge}
                              />
                            </Col>
                          </Row>
                        </Input.Group>
                      </div>
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="term" className="mb-1">
                        Maturity Age(Maximum)
                      </label>
                      <div className="site-input-group-wrapper">
                        <Input.Group>
                          <Row gutter={8}>
                            <Col span={8}>
                              <Input
                                onChange={getMaturityAge}
                                placeholder="maturity age"
                                value={maturityAge}
                              />
                            </Col>
                          </Row>
                        </Input.Group>
                      </div>
                    </div>
                    <div className="my-3 form-group">
                      <label htmlFor="term" className="mb-1">
                        Sum Assured
                      </label>
                      <div className="site-input-group-wrapper">
                        <Input.Group>
                          <Row gutter={8}>
                            <Col span={6}>
                              <Input
                                onChange={getMinSumAssured}
                                placeholder="minimum"
                                value={minSumAssured}
                              />
                            </Col>
                            <span className="mx-1"> - </span>
                            <Col span={6}>
                              <Input
                                onChange={getMaxSumAssured}
                                placeholder="maximum"
                                value={maxSumAssured}
                              />
                            </Col>
                          </Row>
                        </Input.Group>
                      </div>
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="mb-1">Benefits</div>
                    <a
                      href="#"
                      onClick={() => setBenefitModal(true)}
                      className="text-info d-block mb-2"
                    >
                      ADD NEW
                    </a>
                    {/* benefit modal starts */}
                    <Modal
                      visible={benefitModal}
                      onCancel={() => setBenefitModal(false)}
                      okText="ADD"
                      onOk={addNewBenefit}
                    >
                      <div className="form-group mb-2">
                        <label htmlFor="benefit_title">Title</label>
                        <Input
                          onChange={getBenefitTitle}
                          value={benefitTitle}
                          type="text"
                          id="benefit_title"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="benefit_description">Description</label>
                        <TextArea
                          onChange={getBenefitDescription}
                          value={benefitDescription}
                          id="benefit_description"
                        />
                      </div>
                    </Modal>
                    {/* benefit modal ends */}
                    <div className="bg-light p-2 col-md-12">
                      {/* benefits view card starts */}
                      {newBenefit
                        ? newBenefit.length > 0
                          ? newBenefit.map((benefit) => {
                            return (
                              <div
                                key={benefit.title}
                                className="row mb-2 shadow-sm p-2"
                              >
                                <div className="col-md-11">
                                  <span className="text-black fw-800 d-block">
                                    {benefit.title}
                                  </span>
                                  {benefit.description}
                                </div>
                                <div className="col-md-1 d-flex align-item-center">
                                  <img
                                    style={{
                                      width: "20px",
                                      display: "inline",
                                      cursor: "pointer"
                                    }}
                                    src="/icons/trash_red.svg"
                                    alt="trash"
                                    data-bentitle={benefit.title}
                                    onClick={deleteBenefit}
                                  />
                                </div>
                              </div>
                            );
                          })
                          : null
                        : null}
                      {/* benefits veiw card ends */}
                    </div>
                  </div>
                  {
                    isEditPlan
                      ?
                      imagesUrls
                        ?
                        imagesUrls.length > 0
                          ?
                          <>
                            <div className="my-3">
                              {
                                imagesUrls.map((image) => {
                                  return (
                                    <div key={image.link} className="position-relative d-inline mx-1">
                                      <span style={{left:"0px"}} className="position-absolute p-1">
                                        <img src="/icons/trash_red.svg" onClick={deleteImageFromDB} data-imgname={image.name}  style={{width:"20px", height:"20px", cursor:"pointer"}} alt="trash"/>
                                      </span>
                                      <img src={image.link} style={{ width: "100px", height: "100px" }} alt="image" />
                                    </div>
                                  )
                                })
                              }
                            </div>
                            {/* <div className="my-3">
                              <ImageUploader onChange={getImages} />
                            </div> */}
                          </>
                          : null
                        : null
                      : null
                  }
                  <div className="my-3">
                    <ImageUploader onChange={getImages} />
                  </div>
                </div>
              </Modal>
            </div>
            <div className="col-md-12 mt-3">
              {fetchedPlans
                ? fetchedPlans.length > 0
                  ? fetchedPlans.map((fetchedPlan) => {
                    return (
                      <PlanCard
                        key={fetchedPlan.id}
                        cardTitle={fetchedPlan.planName}
                        description={fetchedPlan.planSummary}
                        onDelClick={deletePlan}
                        onEditClick={editPlan}
                        id={fetchedPlan.id}
                      />
                    );
                  })
                  : null
                : null}
            </div>
          </div>
        </div>
      </Fragment>
    </Admin>
  );
}
