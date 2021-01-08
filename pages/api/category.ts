import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebase/firebase.util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const categoryRef = firestore.collection("categories");
    const snapshot = await categoryRef.where("name", "==", req.query.slug).get();
    const category = [];
    if (snapshot.empty) {
      console.log("No matching categories.");
      return;
    }

    snapshot.forEach((doc) => {
      category.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ category: category[0] });
  } else {
    res.status(400).json("Invalid Method");
  }
};
