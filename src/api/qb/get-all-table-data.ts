import { QB_API_HEADERS } from '~/constants/quickbase';
import type { QbTable, QbTableDetails } from '~/types/quickbase';

function getAllTableData(id: QbTable['id'], select: number[] = []) {
  return fetch('https://api.quickbase.com/v1/records/query', {
    method: 'POST',
    headers: QB_API_HEADERS,
    body: JSON.stringify({ from: id, select }),
  }).then(res => res.json() as Promise<QbTableDetails>);
}

export default getAllTableData;
