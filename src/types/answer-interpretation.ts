import { z } from 'zod';

import type { AnswerInterpretationSchema } from '../api/schemas/answer-interpretation-schema';

export type AnswerInterpretation = z.infer<typeof AnswerInterpretationSchema>;
