import {
  DATE_CREATED_ID,
  DATE_MODIFIED_ID,
  SESSIONS_CONVERSATION_CONTEXT_ID,
  SESSIONS_FINAL_CUSTOMER_SUMMARY_ID,
  SESSIONS_FINAL_INTERNAL_SUMMARY_ID,
  SESSIONS_FLOW_ID,
  SESSIONS_IDENTIFIER_ID,
  SESSIONS_IS_COMPLETED_ID,
  SESSIONS_TABLE_ID,
  SESSIONS_USER_SENTIMENT_ID,
} from '~/constants/quickbase';
import type { SessionResponseItem } from '~/types/flow';

import getAllTableData from './get-all-table-data';

async function getAllSessions(): Promise<SessionResponseItem[]> {
  const sessionsRawData = await getAllTableData(SESSIONS_TABLE_ID, [
    DATE_CREATED_ID,
    DATE_MODIFIED_ID,
    SESSIONS_IDENTIFIER_ID,
    SESSIONS_FLOW_ID,
    SESSIONS_FINAL_CUSTOMER_SUMMARY_ID,
    SESSIONS_FINAL_INTERNAL_SUMMARY_ID,
    SESSIONS_IS_COMPLETED_ID,
    SESSIONS_USER_SENTIMENT_ID,
    SESSIONS_CONVERSATION_CONTEXT_ID,
  ]);
  const sessions = sessionsRawData.data.map(session => {
    const dateCreated = String(session[DATE_CREATED_ID]?.value);

    const dateModified = String(session[DATE_MODIFIED_ID]?.value);

    const identifier = String(session[SESSIONS_IDENTIFIER_ID]?.value);

    const flowId = String(session[SESSIONS_FLOW_ID]?.value);

    const finalCustomerSummary = String(
      session[SESSIONS_FINAL_CUSTOMER_SUMMARY_ID]?.value || ''
    );

    const finalInternalSummary = String(
      session[SESSIONS_FINAL_INTERNAL_SUMMARY_ID]?.value || ''
    );

    const isCompleted = Boolean(session[SESSIONS_IS_COMPLETED_ID]?.value);

    const userSentiment = Number(session[SESSIONS_USER_SENTIMENT_ID]?.value);

    const conversationContext = String(
      session[SESSIONS_CONVERSATION_CONTEXT_ID]?.value || ''
    );

    return {
      dateCreated,
      dateModified,
      identifier,
      flowId,
      finalCustomerSummary,
      finalInternalSummary,
      isCompleted,
      userSentiment,
      conversationContext,
    };
  });

  return sessions;
}

export default getAllSessions;
