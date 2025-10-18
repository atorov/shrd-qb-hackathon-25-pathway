import type { FlowInfo } from 'types/flow';
import { FLOWS_TABLE_ID } from '~/constants/quickbase';

import getAllTableData from './get-all-table-data';
import getImageDataUrl from './get-image';

async function getAllFlowsInfo(): Promise<FlowInfo[]> {
  const flowsInfoData = await getAllTableData(FLOWS_TABLE_ID);

  const identifierFieldId = Number(
    flowsInfoData.fields.find(field => field.label === 'identifier')?.id
  );

  const descriptionIdFieldId = Number(
    flowsInfoData.fields.find(field => field.label === 'description')?.id
  );

  const diagramFieldId = Number(
    flowsInfoData.fields.find(field => field.label === 'Diagram')?.id
  );

  let flowsDescriptions = flowsInfoData.data.map(flowInfo => {
    const identifier = String(flowInfo[identifierFieldId]?.value);
    const description = String(flowInfo[descriptionIdFieldId]?.value);
    const diagramValue = flowInfo[diagramFieldId]?.value;
    const diagramFilePath =
      diagramValue !== null &&
      typeof diagramValue === 'object' &&
      'url' in diagramValue
        ? (diagramValue?.url as string)
        : null;

    return {
      identifier,
      description,
      diagramFilePath,
    };
  });

  const dataUrls = await Promise.all(
    flowsDescriptions.map(async flow => {
      if (!flow.diagramFilePath) return null;
      return getImageDataUrl(flow.diagramFilePath);
    })
  );

  flowsDescriptions = flowsDescriptions.map((flow, fIdx) => ({
    ...flow,
    diagramDataUrl: dataUrls[fIdx],
  }));

  return flowsDescriptions;
}

export default getAllFlowsInfo;
