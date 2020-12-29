import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebase/firebase.util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const plansRef = firestore.collection("plans");
    const snapshot = await plansRef.get();
    const plans = [];
    snapshot.forEach((doc) => {
      plans.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ plans });
  } else {
    res.status(400).json("Invalid Method");
  }
};
