import type { Dispatch, SetStateAction } from 'react';

import type { AnswerInterpretation } from '~/types/answer-interpretation';
import type { ChatMessage } from '~/types/chat';
import type { FlowInfo, Flows, FlowStep, ToolItem } from '~/types/flow';
import type { QbTableDetailsDataItem } from '~/types/quickbase';
import type { Status } from '~/types/status';
import type { ToolWithExec } from '~/types/tools';

export type AppStateContextValue = {
  addNewUserChatMessage: (message: ChatMessage) => Promise<void>;

  answerInterpretation: AnswerInterpretation;
  setAnswerInterpretation: Dispatch<SetStateAction<AnswerInterpretation>>;

  chatMessages: ChatMessage[];
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;

  conversationContext: string | null;
  setConversationContext: Dispatch<SetStateAction<string | null>>;

  currentFlowId: string | null;
  setCurrentFlowId: Dispatch<SetStateAction<string | null>>;

  currentStep: FlowStep | null;
  setCurrentStep: Dispatch<SetStateAction<FlowStep | null>>;

  finalClientSummary: string | null;
  setFinalClientSummary: Dispatch<SetStateAction<string | null>>;

  finalInternalSummary: string | null;
  setFinalInternalSummary: Dispatch<SetStateAction<string | null>>;

  flows: Flows | null;
  setFlows: Dispatch<SetStateAction<Flows | null>>;

  flowsInfo: FlowInfo[] | null;
  setFlowsInfo: Dispatch<SetStateAction<FlowInfo[] | null>>;

  handleReset: () => void;

  isFinalStep: boolean;
  setIsFinalStep: Dispatch<SetStateAction<boolean>>;

  session: QbTableDetailsDataItem | null;
  setSession: Dispatch<SetStateAction<QbTableDetailsDataItem | null>>;

  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;

  tools: ToolWithExec[];
  setTools: Dispatch<SetStateAction<ToolWithExec[]>>;

  toolsUsed: ToolItem[];
  setToolsUsed: Dispatch<SetStateAction<ToolItem[]>>;

  userQuery: string;
  setUserQuery: Dispatch<SetStateAction<string>>;

  userSentiment: number;
  setUserSentiment: Dispatch<SetStateAction<number>>;
};
