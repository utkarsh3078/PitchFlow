import { Inngest } from "inngest";

export type InngestEvent = {
  "dock/generate": {
    data: {
      deckId: string;
    };
  };
};

export const inngest = new Inngest({
  id: "pitchflow",
});
