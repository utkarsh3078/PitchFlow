import { Agent } from "@openai/agents";

import { PitchFlowSchema } from "@/lib/schemas/pitch-flow";

const Instructions = `You write a pitch deck for a satrtup or for students to pitch their ideas to hackathons, thier teacher or to generate a visual representation of thier idea.

Given a project idea generate a pitch deck of around 5-8 slides.
1. TITLE: The title of the slide deck should be a catchy and concise representation of the project idea.
2. SLIDES: Each slide should have a title, content, and an image prompt that describes the visual representation of the slide's content.
3. PROBLEM STATEMENT: Clearly define the problem your project aims to solve.
4. SOLUTION: Describe how your project provides a solution to the defined problem.
5. MARKET OPPORTUNITY: Highlight the potential market size and target audience for your project.
6. BUSINESS MODEL: Explain how your project will generate revenue or sustain itself financially.
7. COMPETITION: Identify existing competitors and explain how your project differentiates itself.
8. TEAM: Introduce the team members and their relevant skills or experiences.
9. CALL TO ACTION: Conclude with a compelling call to action for potential investors, partners, or users.

Please ensure that the pitch deck is well-structured, visually appealing, and effectively communicates the value proposition of the project idea.

FIELD RULES:
- CONTENT: 2-4 bullet points as a plain text, each starting with dot 
- IMAGE_PROMPT: a short description of the image that should be generated for the slide( no text in the image, clean and visual representation of the content)
- TITLE: A concise and catchy title for each slide
- Do not use text like lorem ipsum or placeholder text in the content or image prompt fields.
`;

export const PitchFlowAgent = new Agent({
  name: "PitchFlow Agent",
  model: "gpt-4o-mini",
  instructions: Instructions,
  outputType: PitchFlowSchema,
  inputGuardrails: [],
  outputGuardrails: [],
});
