import { inngest } from "./client";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from 'resend'

let daily_summary = ""
const resend = new Resend('re_NHYRNKnP_ExRzxqMXKHUUm5P5nY9tapT5');

export const sendToAnth = inngest.createFunction(
  { id: "send-anth" },
  { event: "myfunc/send.anth" },
  async ({ event, step }) => {
    console.log("Got inside sendToAuth")
    const data = event.data
    const extractPrompt = "You are an extremely thorough research assistant for an investor. \nExtract company names and its related information from the email when there is mention of completed funding rounds, into a table.\nFormat:\n```markdown\n| Company Name | USD Raised | Round Type | What the company does |  Industries | Investor list |\n| --- | --- | --- | --- |  --- | --- |\n```\nExample:\n```markdown\n| Company Name | USD Raised | Round Type | What the company does |  Industries | Investor list |\n| --- | --- | --- | --- |  --- | --- |\n| Graphlan | $10m | Series A | Graphlan provides social networking services for professionals |  Social Networking, AI | Sequoia Capital, Accel |\n```\nIf there are multiple companies, add a new line for each company.\nReturn only the markdown content, no formatting or additional text."
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [
        {"role": "user", "content": `You are reading an email with the subject: ${data.headers.subject}\n\`\`\`html\n${data.plain}\n\`\`\`\nExtract the following information: \n<blockquote>\n${extractPrompt}\n</blockquote>\nIf no information can be extracted, please respond with "No information detected."`}
      ]
    });
    console.log(msg)
    daily_summary += msg
    return { event, body: "done" };
  }
);

export const sendSummary = inngest.createFunction(
  { id: "send-summary" },
  { event: "myfunc/send-summary" },
  async ({event, step}) => {
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rylowong8@gmail.com',
        subject: 'Welcome',
        html: `<p>${daily_summary}</p>`
      });
    }
    catch(error){
      console.error("Emailing Error:", error)
    }
    return { event, body: "done" };
  }
)
