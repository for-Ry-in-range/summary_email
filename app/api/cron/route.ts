import { inngest } from "../../../inngest/client";

export async function GET() {
    console.error("GETTTT")
    try {
        await inngest.send({
          name: "myfunc/send-summary"
        });
        return new Response("Successful!", { status: 500 });
    } catch (error) {
        console.error("Error:", error)
        return new Response("Error occured", {status: 500})
    }
}
