function getCompletion(query: string) {
  console.log('::: TODO: 🚀 :::  ~ getCompletion ~ query:', query);

  return fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model: 'gemma3n', // e4b
      // model: 'qwen3:latest', // 8b
      // model: 'gemma3:latest', // 4b
      prompt: query,
      stream: false,
      // think: true,
      options: {
        num_ctx: 1024 * 16,
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
      console.log(
        `\n
::: ~ generateResponse ~ res.response:\n
==============================\n
${res.response}\n
=================================\n
${res.response}\n
=================================\n`
      );
      return res;
    });
}

export default getCompletion;
