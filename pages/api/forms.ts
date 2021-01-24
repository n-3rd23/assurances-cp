import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../firebase/firebase.util";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { limit = 10 }: any = req.query;
    const formsRef = firestore.collection("forms");
    const snapshot = await formsRef.get();
    const forms = [];
    snapshot.forEach((doc) => {
      forms.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ forms });
  } else {
    res.status(400).json("Invalid Method");
  }
};
