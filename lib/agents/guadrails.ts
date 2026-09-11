import { z } from "zod";
import {
  Agent,
  run,
  type InputGuardrail,
  type OutputGuardrail,
} from "@openai/agents";

function getInputText(input: string | unknown[]): string {
  if (typeof input === "string") {
    return input;
  }
  return JSON.stringify(input);
}

export const validProjectIdeaGuardrail: InputGuardrail = {
  name: "Valid_Project_Idea_Guardrail",
  execute: async ({ input }) => {
    const text = getInputText(input).trim();
    const tooShort = text.length < 20;

    return {
      tripwireTriggered: tooShort,
      outputInfo: tooShort
        ? {
            reason:
              "Project idea is too short. Please provide a more detailed description.",
          }
        : undefined,
    };
  },
};

const QualityCheckSchema = z.object({
  isValid: z.boolean(),
  reason: z.string().optional(),
});

const qualityCheckAgent = new Agent({
  name: "Quality_Check_Agent",
  model: "gpt-4o-mini",
  instructions: `You are a quality check agent that evaluates the quality of a pitch deck based on the following criteria:
1. Clarity: The pitch deck should clearly communicate the project idea, problem statement, solution, market opportunity, business model, competition, team, and call to action.
2. Structure: The pitch deck should be well-structured with a logical flow between slides.
3. Visual Appeal: The pitch deck should be visually appealing and engaging for the audience.
4. Conciseness: The content should be concise and to the point, avoiding unnecessary details or filler content.

Please provide a JSON response with the following fields:
- isValid: A boolean indicating whether the pitch deck meets the quality criteria.
- reason: An optional string providing feedback or suggestions for improvement if the pitch deck does not meet the quality criteria.`,
  outputType: QualityCheckSchema as any,
});

export const qualityCheckGuardrail: OutputGuardrail = {
  name: "Quality_Check_Guardrail",
  execute: async ({ agentOutput }) => {
    const deckJson = JSON.stringify(agentOutput, null, 2);
    const checkResult = await run(qualityCheckAgent, deckJson);
    const check = QualityCheckSchema.parse(checkResult.finalOutput as unknown);

    const isValid = check.isValid;

    return {
      tripwireTriggered: !isValid,
      outputInfo: !isValid ? undefined : { reason: check.reason },
    };
  },
};
