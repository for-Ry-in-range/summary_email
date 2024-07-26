import { inngest } from "../../../inngest/client";

export async function GET() {
    console.error("got into GET")
    try {
        await inngest.send({
          name: "myfunc/send-summary"
        });
        return new Response("Successful!", { status: 200 });
    } catch (error) {
        console.error("Error:", error)
        return new Response("Error occured", {status: 500})
    }
}
