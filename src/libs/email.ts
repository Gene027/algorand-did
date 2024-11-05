import Mailgun from "mailgun.js";
import FormData from "form-data";

export interface SendEmailOptions {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendNotification(payload: SendEmailOptions) {
  const key = process.env.MAILGUN_API_KEY || "";
  const domain = process.env.MAILGUN_DOMAIN || "";

  const client = new Mailgun(FormData).client({
    username: domain,
    key,
  });

  const { from, to, subject, html } = payload;

  const sendOptions = {
    from: from ?? `Decentralised ID <noreply@identiabyiotu.com>`,
    to,
    subject,
    html,
  };

  await client.messages
    .create(domain, sendOptions)
    .then((value) => console.log(value.message))
    .catch((err) => {
      console.error(err);
    });
}
