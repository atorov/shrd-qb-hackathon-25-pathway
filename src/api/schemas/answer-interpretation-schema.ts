import { z } from 'zod';

export const AnswerInterpretationSchema = z.object({
  answer: z.string(),
  confidence: z.number().min(0).max(1),
});
