import { inngest } from "../client";
export const generateDeck = inngest.createFunction(
  {
    id: "generate-dock",
    triggers: [{ event: "dock/generate" }],
  },
  async ({ event, step }) => {},
);
