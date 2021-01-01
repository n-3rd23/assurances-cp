import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req, res) => {
  // 1. Destructure the email address from the request body.
  const { name, phone } = req.body;

  // if (!email) {
  //   // 2. Throw an error if an email wasn't provided.
  //   return res.status(400).json({ error: "Email is required" });
  // }
  if (!name) {
    // 2. Throw an error if an name wasn't provided.
    return res.status(400).json({ error: "Name is required" });
  }
  if (!phone) {
    // 2. Throw an error if an name wasn't provided.
    return res.status(400).json({ error: "Phone is required" });
  }
  // if (!message) {
  //   // 2. Throw an error if an message wasn't provided.
  //   return res.status(400).json({ error: "Name is required" });
  // }

  try {
    // 3. Fetch the environment variables.
    // const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    // const API_KEY = process.env.MAILCHIMP_API_KEY;
    // 4. API keys are in the form <key>-us3.
    // const DATACENTER = API_KEY.split("-")[1];

    // 5. The status of 'subscribed' is equivalent to a double opt-in.
    // const data = {
    //   // email_address: email,
    //   name: name,
    //   status: "subscribed",
    // };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "alansaji1996anak@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "alansaji1996anak@gmail.com",
      to: "alansajidd16@gmail.com",
      subject: `New Enquiry from`,
      // html: `<div style="margin-bottom: 5px; display: flex;">
      // <div style="padding-right: 10px; padding-left: 10px;"><strong>Contact Info</strong></div>
      // </div>
      // <div style="margin-bottom: 5px; display: flex;">
      // <div style="padding-right: 10px; padding-left: 10px;">Email: email </div>
      // <div style="padding-right: 10px; padding-left: 10px; margin-bottom: 15px;">Phone: ${phone}</div>
      // </div>
      // <div style="margin-bottom: 5px; display: flex;">
      // <div style="padding-right: 10px; padding-left: 10px;"><strong>Other Details</strong></div>
      // </div>
      // <div style="margin-bottom: 5px; display: flex;">
      // <div style="padding-right: 10px; padding-left: 10px;"><strong>Message</strong></div>
      // </div>
      // <div style="margin-bottom: 5px; display: flex;">
      // <div style="padding-right: 10px; padding-left: 10px;">message</div>
      // </div>`,
      html: "hello mail arrived"
    };

    await transporter.sendMail(mailOptions);
    console.log("mail send");

    // 6. Send a POST request to Mailchimp.
    // const response = await fetch(
    //   `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    //   {
    //     body: JSON.stringify(data),
    //     headers: {
    //       Authorization: `apikey ${API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //   }
    // );

    // 7. Swallow any errors from Mailchimp and return a better error message.
    // if (response.status >= 400) {
    //   return res.status(400).json({
    //     error: `There was an error subscribing to the newsletter. Please try again.`,
    //   });
    // }

    // 8. If we made it this far, it was a success! 🎉
    // return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
