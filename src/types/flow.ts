export type ToolItem = {
  name: string;
  description: string;
};

export type FlowStep = {
  id: string;
  answerConditions: string[] | null;
  parentStepIds: string[] | null;
  predefinedAnswers: string[];
  text: string;
  toolsOnEnter: string[] | null;
};

export type Flows = Record<string, FlowStep[]>;

// export type Session = {
//   id: string;
//   completed: boolean;
//   cumulativeContext: string;
//   flowId: string;
//   finalStepId: string | null;
//   lastUserSentiment: number;
//   sessionSummary: {
//     internal: string;
//     user: string;
//   };
//   startedAt: number;
//   updatedAt: number;
// };

// export type FlowResoponse = {
//   sessionId: string;
//   agentMessage: string;
//   clientMessage: string;
//   cumulativeContext: string;
//   stepSummary: string;
//   prevUserSentiment: number;
//   userSentiment: number;
//   createdAt: number;
// };

export type FlowInfo = {
  identifier: string;
  description: string;
  diagramFilePath: string | null;
  diagramDataUrl?: string | null;
};

// export type SessionResponse = {
//   session: Session;
//   flowResponse: FlowResoponse | null;
// };

export type SessionResponseItem = {
  dateCreated: string;
  dateModified: string;
  identifier: string;
  flowId: string;
  finalCustomerSummary: string;
  finalInternalSummary: string;
  isCompleted: boolean;
  userSentiment?: number;
  conversationContext: string;
};
