import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import {sendToAnth} from "../../../inngest/functions";
import {sendSummary} from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendToAnth,
    sendSummary
  ],
});
