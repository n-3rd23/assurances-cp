import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebase/firebase.util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { limit = 10 }: any = req.query;
    const categoryRef = firestore.collection("categories");
    const snapshot = await categoryRef.limit(limit).get();
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ categories });
  } else {
    res.status(400).json("Invalid Method");
  }
};
