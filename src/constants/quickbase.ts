export const DATE_CREATED_ID = 1;
export const DATE_MODIFIED_ID = 2;
export const RECORD_ID_ID = 3;
export const RECORD_OWNER_ID = 4;
export const LAST_MODIFIED_BY_ID = 5;

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

// const APP_ID = import.meta.env.VITE_APP_ID;

const REALM_ID = import.meta.env.VITE_REALM_ID;

export const SESSIONS_RECORD_ID_ID = import.meta.env.VITE_SESSIONS_RECORD_ID_ID;
export const SESSIONS_TABLE_ID = import.meta.env.VITE_SESSIONS_TABLE_ID;
export const SESSIONS_IDENTIFIER_ID = import.meta.env
  .VITE_SESSIONS_IDENTIFIER_ID;
export const SESSIONS_FLOW_ID = import.meta.env.VITE_SESSIONS_FLOW_ID;
export const SESSIONS_CURRENT_EXECUTION_ID = import.meta.env
  .VITE_SESSIONS_CURRENT_EXECUTION_ID;
export const SESSIONS_FINAL_CUSTOMER_SUMMARY_ID = import.meta.env
  .VITE_SESSIONS_FINAL_CUSTOMER_SUMMARY_ID;
export const SESSIONS_FINAL_INTERNAL_SUMMARY_ID = import.meta.env
  .VITE_SESSIONS_FINAL_INTERNAL_SUMMARY_ID;
export const SESSIONS_IS_COMPLETED_ID = import.meta.env
  .VITE_SESSIONS_IS_COMPLETED_ID;
export const SESSIONS_USER_SENTIMENT_ID = import.meta.env
  .VITE_SESSIONS_USER_SENTIMENT_ID;
export const SESSIONS_CONVERSATION_CONTEXT_ID = import.meta.env
  .VITE_SESSIONS_CONVERSATION_CONTEXT_ID;

export const FLOWS_TABLE_ID = import.meta.env.VITE_FLOWS_TABLE_ID;

export const STEPS_TABLE_ID = import.meta.env.VITE_STEPS_TABLE_ID;

export const TOOLS_TABLE_ID = import.meta.env.VITE_TOOLS_TABLE_ID;

export const CONVERSATIONS_TABLE_ID = import.meta.env
  .VITE_CONVERSATIONS_TABLE_ID;

export const QB_API_HEADERS = {
  'QB-Realm-Hostname': `${REALM_ID}.quickbase.com`,
  'User-Agent': 'DemoApp (demo@example.com)',
  Authorization: `QB-USER-TOKEN ${API_TOKEN}`,
  'Content-Type': 'application/json; charset=utf-8',
};
