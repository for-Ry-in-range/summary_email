import { inngest } from "../../../inngest/client";

export const maxDuration = 60;

export async function POST(req: Request) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  const data = Buffer.concat(chunks).toString();

  try {
    const jsonData = JSON.parse(data);
    
    await inngest.send({
      name: "myfunc/send.anth",
      data: jsonData
    })

    return new Response('', { status: 200 }); // Return empty response for success
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return new Response('Invalid JSON data', { status: 400 }); // Handle parsing errors
  }
}