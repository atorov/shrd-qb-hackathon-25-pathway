import { STEPS_TABLE_ID } from '~/constants/quickbase';
import type { Flows, FlowStep } from '~/types/flow';

import getAllTableData from './get-all-table-data';

async function getAllFlows(): Promise<Flows> {
  const stepsRawData = await getAllTableData(STEPS_TABLE_ID);

  const identifierFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'identifier')?.id
  );

  const flowIdFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'flowId')?.id
  );

  const answerConditionsFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'answerConditions')?.id
  );

  const parentStepIdsFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'parentStepIds')?.id
  );

  const predefinedAnswersFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'predefinedAnswers')?.id
  );

  const textFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'text')?.id
  );

  const toolsOnEnterFieldId = Number(
    stepsRawData.fields.find(field => field.label === 'toolsOnEnter')?.id
  );

  const _steps = stepsRawData.data.map(step => {
    const id = String(step[identifierFieldId]?.value);

    const flowId = String(step[flowIdFieldId]?.value);

    const answerConditions = step[answerConditionsFieldId]?.value || [];

    let parentStepIds = step[parentStepIdsFieldId]?.value || null;
    if (Array.isArray(parentStepIds) && parentStepIds.length === 0)
      parentStepIds = null;

    let predefinedAnswers = step[predefinedAnswersFieldId]?.value || null;
    if (Array.isArray(predefinedAnswers) && predefinedAnswers.length === 0)
      predefinedAnswers = null;

    const text = step[textFieldId]?.value || '';

    let toolsOnEnter = step[toolsOnEnterFieldId]?.value || null;
    if (Array.isArray(toolsOnEnter) && toolsOnEnter.length === 0)
      toolsOnEnter = null;

    return {
      id,
      flowId,
      answerConditions,
      parentStepIds,
      predefinedAnswers,
      text,
      toolsOnEnter,
    };
  });

  const flows = _steps.reduce((acc, step) => {
    const { flowId, ...rest } = step;
    if (!acc[flowId]) acc[flowId] = [];
    acc[flowId].push(rest as unknown as FlowStep);
    return acc;
  }, {} as Flows);

  return flows;
}

export default getAllFlows;
