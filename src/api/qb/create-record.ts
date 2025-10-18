import { QB_API_HEADERS } from '~/constants/quickbase';
import type {
  QbTable,
  QbTableDetails,
  QbTableDetailsDataItem,
} from '~/types/quickbase';

function createRecord({
  id,
  data,
  fieldsToReturn = [],
}: {
  id: QbTable['id'];
  data: QbTableDetailsDataItem[];
  fieldsToReturn: string[];
}) {
  return fetch('https://api.quickbase.com/v1/records', {
    method: 'POST',
    headers: QB_API_HEADERS,
    body: JSON.stringify({ to: id, data, fieldsToReturn }),
  }).then(res => res.json() as Promise<Omit<QbTableDetails, 'fields'>>);
}

export default createRecord;
