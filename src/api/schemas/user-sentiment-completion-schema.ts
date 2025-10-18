import { z } from 'zod';

export const UserSentimentCompletionSchema = z.object({
  userSentiment: z.number().int().min(1).max(5),
});
