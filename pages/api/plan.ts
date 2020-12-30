import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebase/firebase.util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const plansRef = firestore.collection("plans");
    const snapshot = await plansRef.where("slug", "==", req.query.slug).get();
    const plan = [];
    if (snapshot.empty) {
      console.log("No matching plans.");
      return;
    }

    snapshot.forEach((doc) => {
      plan.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ plan: plan[0] });
  } else {
    res.status(400).json("Invalid Method");
  }
};
