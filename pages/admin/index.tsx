import Admin from "../../components/layout/admin";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.util";
// import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const [planCount, setPlanCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [callbackCount, setCallbackCount] = useState(0);
  const [pageVisits, setPageVisits] = useState(0);

  useEffect(() => {
    const unSubscribeMessages = firestore
      .collection("qoutes")
      .onSnapshot(function (querySnapshot) {
        const qoutes = [];
        querySnapshot.forEach(function (doc) {
          qoutes.push(doc.data());
        });
        setMessageCount(qoutes.length);
      });

    const unSubscribeCallback = firestore
      .collection("callme")
      .onSnapshot(function (querySnapshot) {
        const callBack = [];
        querySnapshot.forEach(function (doc) {
          callBack.push(doc.data());
        });
        setCallbackCount(callBack.length);
      });

    const unSubscribePlans = firestore
      .collection("plans")
      .onSnapshot(function (querySnapshot) {
        const plans = [];
        querySnapshot.forEach(function (doc) {
          plans.push(doc.data());
        });
        setPlanCount(plans.length);
      });

      const unSubscribePageVisits = firestore.collection("siteVisits")
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // console.log(doc.data().count)
          setPageVisits(doc.data().count)
        })
      })

    return () => {
      unSubscribeCallback();
      unSubscribeMessages();
      unSubscribePlans();
      unSubscribePageVisits();
    };
  }, []);

  // const chartData = {
  //   labels: ["January", "February", "March", "April", "May"],
  //   datasets: [
  //     {
  //       label: "Rainfall",
  //       backgroundColor: "rgba(75,192,192,1)",
  //       borderColor: "rgba(0,0,0,1)",
  //       borderWidth: 1,
  //       data: [planCount],
  //     },
  //   ],
  // };
  return (
    <Admin title="Dashboard" description="Dashboard page of admin">
      <div className="container mt-5 ml-5">
        <div className="row">
          <div className="col-md-6 p-4 shadow-sm bg-light rounded">
            <div className="text-center"> 
              <span className="text-largest fw-400">Plans</span> 
            </div>
            <div className="text-center">
              <h1 className="fw-600"> {planCount} </h1>
            </div>
          </div>

          <div className="col-md-6 p-4 shadow-sm bg-light rounded">
            <div className="text-center">
              <span className="text-largest fw-400">Call Backs</span> 
            </div>
            <div className="text-center">
              <h1 className="fw-600">{callbackCount}</h1>
            </div>
          </div>

          <div className="col-md-6 p-4 shadow-sm bg-light rounded mt-5">
            <div className="text-center">
              <span className="text-largest fw-400">Messages</span> 
            </div>
            <div className="text-center">
              <h1 className="fw-600">{messageCount}</h1>
            </div>
          </div>

          <div className="col-md-6 p-4 shadow-sm bg-light rounded mt-5">
            <div className="text-center">
              <span className="text-largest fw-400">Page Visits</span> 
            </div>
            <div className="text-center">
              <h1 className="fw-600">{pageVisits}</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{width:"500px", height:"500px"}}>
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div> */}
    </Admin>
  );
}
