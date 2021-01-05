import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebase/firebase.util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { limit = 10 }: any = req.query;
    const plansRef = firestore.collection("plans");
    const snapshot = await plansRef.limit(limit).get();
    const plans = [];
    snapshot.forEach((doc) => {
      plans.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ plans });
  } else {
    res.status(400).json("Invalid Method");
  }
};
