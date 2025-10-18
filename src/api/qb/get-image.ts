import { QB_API_HEADERS } from '~/constants/quickbase';

async function getImageDataUrl(filePath: string): Promise<string> {
  const url = `https://api.quickbase.com/v1${filePath}`;

  const res = await fetch(url, { headers: QB_API_HEADERS });
  const b64 = await res.text();

  const contentDecompositionValue = res.headers.get('Content-Disposition');
  const fileNameMatch = contentDecompositionValue?.match(/filename="(.+)"/);
  const fileName = fileNameMatch?.[1];
  const fileExtension = fileName?.split('.').pop()?.toLowerCase();

  return `data:image/${fileExtension};base64,${b64}`;
}

export default getImageDataUrl;
