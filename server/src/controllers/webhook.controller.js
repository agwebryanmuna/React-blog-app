import { Webhook } from "svix";
import User from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) throw new Error("Webhook secret needed!");

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    // verify that this endpoint is being hit by clerk
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({ message: "Webhook verification failed!" });
  }

  if (evt.type === "user.created") {
    const clerkUserId = evt.data.id;
    const email = evt.data.email_addresses[0].email_address;
    const username = email.split("@")[0];
    const img = evt.data.profile_img_url;

    // Add user to database
    await User.create({
      clerkUserId,
      username,
      email,
      img,
    });
  }

  return res.status(200).json({ message: "Webhook received" });
};
