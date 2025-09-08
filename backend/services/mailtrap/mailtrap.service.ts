import { MailtrapClient } from "mailtrap";

const TOKEN = "<YOUR_API_TOKEN>";

const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 4017800,
});

const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "caiquealves224@gmail.com",
  }
];

client.testing
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);