import Admin from "../../components/layout/admin";
import { Fragment, useState, useEffect } from "react";
import PlanCard from "../../components/plancard/plancard";
import Button from "../../components/button/button";
import { Modal, Input, Checkbox, Row, Col, Select } from "antd";
import QuillText from "../../components/quill_text/quillText";
import firebase, { firestore, storage } from "../../firebase/firebase.util";
import ImageUploader from "../../components/image_uploader/imageUploader";

export default function Plans() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [plan, setPlan] = useState("");
  const [summary, setSummary] = useState("");
  const [checkedList, setCheckedList] = useState([
    "yearly",
    "hafly",
    "quarterly",
    "monthely(ecs)",
  ]); //payment mode
  const [termFrom, setTermFrom] = useState("");
  const [termTo, setTermTo] = useState("");
  const [minEntryAge, setMinEntryAge] = useState("");
  const [maxEntryAge, setMaxEntryAge] = useState("");
  const [maturityAge, setMaturityAge] = useState("");
  const [maxSumAssured, setMaxSumAssured] = useState("");
  const [minSumAssured, setMinSumAssured] = useState("");
  const [fetchedPlans, setFetchedPlans] = useState([]);
  const [images, setImages] = useState(null);
  const [plansImages, setPlansImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [categoryModal, setCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [benefitModal, setBenefitModal] = useState(false);
  const [benefitTitle, setBenefitTitle] = useState("");
  const [benefitDescription, setBenefitDescription] = useState("");
  const [newBenefit, setNewBenefit] = useState([]);
  const { TextArea } = Input;
  const { Option } = Select;

  useEffect(() => {
    fetchCategories();
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const plansRef = await firestore.collection("plans");
    plansRef.onSnapshot((querySnapshot) => {
      let tmp = [];
      querySnapshot.docChanges().forEach((change) => {
        if(change.type === "added") {
          tmp.push({ id: change.doc.id, ...change.doc.data() });
        }
        if(change.type === "modified") {
          tmp.push({ id: change.doc.id, ...change.doc.data() });
        }
        if(change.type === "removed") {
          tmp.push({ id: change.doc.id, ...change.doc.data() });
        }
      });
      setFetchedPlans(tmp);
    });
  };

  const fetchCategories = async () => {
    try {
      const categoriesRef = firestore
        .collection("category")
        .doc("PG3GNZvCAPhrtNmuO9oB");
      await categoriesRef.onSnapshot((doc) => {
        setCategories(doc.data())
      }); 
    } catch(error) {
      console.log("error while fetching category : ", error)
    }
  };

  const showModal = () => {
    setModalVisibility(true);
  };

  const handleCancel = () => {
    setModalVisibility(false);
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
    setTermFrom(event.target.value);
  };

  const getTermTo = (event) => {
    setTermTo(event.target.value);
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

  const getBenefitTitle = (event) => {
    setBenefitTitle(event.target.value);
  };

  const getBenefitDescription = (event) => {
    setBenefitDescription(event.target.value);
  };

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
    setLoading(true);
    let imagesTmp = [];
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
            .then((url) => {
              imagesTmp.push(url);
            });
        }
      );
    }
    setPlansImages(imagesTmp);
    try {
      console.log("pimgs : ", plansImages);
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
          images: plansImages,
        })
        .then(() => {
          console.log("New Plan Added Succesfully!!!");
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
        });
    } catch (error) {
      console.log("error while adding data : ", error);
    }
  };

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
                onOk={upload}
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
                        <Select defaultValue="select" className="w-50">
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
                                      }}
                                      src="/icons/trash_red.svg"
                                      alt="trash"
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
