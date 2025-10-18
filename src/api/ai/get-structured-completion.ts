import type { JsonSchema7Type } from 'zod-to-json-schema';

function getStructuredCompletion(query: string, jsonSchema: JsonSchema7Type) {
  console.log('::: TODO: 🚀 :::  ~ getCompletion ~ query:', query);

  return fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen3:latest',
      // model: 'gemma3:latest',
      prompt: query,
      stream: false,
      think: true,
      options: {
        format: jsonSchema,
        num_ctx: 1024 * 16,
        temperature: 0,
      },
    }),
  })
    .then(
      res =>
        res.json() as Promise<{
          response: string;
          thinking: string;
        }>
    )
    .then(res => {
      console.log('::: TODO: 🚀 :::  ~ generateResponse ~ res:', res);
      return res;
    });
}

export default getStructuredCompletion;
