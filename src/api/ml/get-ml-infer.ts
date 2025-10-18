import type { SessionResponseItem } from '~/types/flow';

function getMlInfer(data: SessionResponseItem[]): Promise<unknown> {
  return fetch('http://localhost:9101/api/infer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json() as Promise<unknown>)
    .then(res => {
      console.log('::: TODO: 🚀 :::  ~ getMlInfer ~ res:', res);
      return res;
    });
}

export default getMlInfer;
