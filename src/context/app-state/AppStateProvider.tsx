import { useCallback, useEffect, useState, type ReactNode } from 'react';
import zodToJsonSchema from 'zod-to-json-schema';

import getCompletion from '~/api/ai/get-completion';
import getStructuredCompletion from '~/api/ai/get-structured-completion';
import getMlInfer from '~/api/ml/get-ml-infer';
import createRecord from '~/api/qb/create-record';
import getAllFlows from '~/api/qb/get-all-flows';
import getAllFlowsInfo from '~/api/qb/get-all-flows-info';
import getAllSessions from '~/api/qb/get-all-sessions';
import getAllTools from '~/api/qb/get-all-tools';
import { AnswerInterpretationSchema } from '~/api/schemas/answer-interpretation-schema';
import { UserSentimentCompletionSchema } from '~/api/schemas/user-sentiment-completion-schema';
import {
  SESSIONS_CONVERSATION_CONTEXT_ID,
  SESSIONS_CURRENT_EXECUTION_ID,
  SESSIONS_FINAL_CUSTOMER_SUMMARY_ID,
  SESSIONS_FINAL_INTERNAL_SUMMARY_ID,
  SESSIONS_FLOW_ID,
  SESSIONS_IDENTIFIER_ID,
  SESSIONS_IS_COMPLETED_ID,
  SESSIONS_TABLE_ID,
  SESSIONS_USER_SENTIMENT_ID,
} from '~/constants/quickbase';
import { STATUS } from '~/constants/status';
import type { AnswerInterpretation } from '~/types/answer-interpretation';
import type { ChatMessage } from '~/types/chat';
import type { FlowInfo, Flows, FlowStep, ToolItem } from '~/types/flow';
import type { QbTableDetailsDataItem } from '~/types/quickbase';
import type { Status } from '~/types/status';
import type { ToolWithExec } from '~/types/tools';
import getAiAssistantPrompt from '~/utils/ai/getAiAssistantPrompt';
import getAiLastMessageText from '~/utils/ai/getAiLastMessageText';
import getAnswerInterpretationPrompt from '~/utils/ai/getAnswerInterpretationPrompt';
import getFinalClientSummaryPrompt from '~/utils/ai/getFinalClientSummaryPrompt';
import getFinalInternalSummaryPrompt from '~/utils/ai/getFinalInternalSummaryPrompt';
import getSentimentAnalysisPrompt from '~/utils/ai/getSentimentAnalysisPrompt';
import getSummarizationPrompt from '~/utils/ai/getSummarizationPrompt';

import AppStateContext from './AppStateContext';

const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [answerInterpretation, setAnswerInterpretation] =
    useState<AnswerInterpretation>({
      answer: '',
      confidence: 0,
    });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [conversationContext, setConversationContext] = useState<string | null>(
    null
  );

  const [currentFlowId, setCurrentFlowId] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState<FlowStep | null>(null);

  const [finalClientSummary, setFinalClientSummary] = useState<string | null>(
    null
  );

  const [finalInternalSummary, setFinalInternalSummary] = useState<
    string | null
  >(null);

  const [flows, setFlows] = useState<Flows | null>(null);

  const [flowsInfo, setFlowsInfo] = useState<FlowInfo[] | null>(null);

  const [isFinalStep, setIsFinalStep] = useState(false);

  const [session, setSession] = useState<QbTableDetailsDataItem | null>(null);

  const [status, setStatus] = useState<Status>(STATUS.Idle);

  const [tools, setTools] = useState<ToolWithExec[]>([]);

  const [toolsUsed, setToolsUsed] = useState<ToolItem[]>([]);

  const [userQuery, setUserQuery] = useState<string>('');

  const [userSentiment, setUserSentiment] = useState(3);

  const currentFlow = (currentFlowId ? flows?.[currentFlowId] : null) ?? null;

  const addNewChatMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const addNewUserChatMessage = useCallback(
    async (message: ChatMessage) => {
      // TODO:
      getAllSessions()
        .then(allSessions => {
          console.log(
            '::: TODO: 🚀 :::  ~ AppStateProvider ~ allSessions:',
            allSessions
          );
          return getMlInfer(allSessions);
        })
        .then(mlInferRes => {
          console.log(
            '::: TODO: 🚀 :::  ~ addNewUserChatMessage ~ mlInferRes:',
            mlInferRes
          );
        })
        .catch(error => {
          console.log(
            '::: TODO: 🚀 :::  ~ addNewUserChatMessage ~ err:',
            error
          );
        });

      setStatus(STATUS.InProgress);
      addNewChatMessage(message);

      // 1. Set new conversation context
      const _chatMessages = [...chatMessages, message];
      const aiLastMessageText = getAiLastMessageText(_chatMessages);
      const _conversationContext = conversationContext ?? '';
      const userLatestMessageText = message.parts
        .filter(p => p.type === 'text')
        .map(p => p.content)
        .join('\n');
      const summarizationPrompt = getSummarizationPrompt({
        aiLastMessageText,
        conversationContext: _conversationContext,
        userLatestMessageText,
      });
      const summarizationCompletion = await getCompletion(summarizationPrompt);

      const newConversationContext =
        _conversationContext + '\n' + summarizationCompletion.response.trim();
      setConversationContext(newConversationContext);
      const userSentimentResponseSchema = zodToJsonSchema(
        UserSentimentCompletionSchema
      );

      // 2. Set new user sentiment
      const sentimentAnalysisPrompt = getSentimentAnalysisPrompt({
        jsonSchema: userSentimentResponseSchema,
        previousSentiment: userSentiment,
        userLatestMessageText,
      });
      const userSentimentCompletion = await getStructuredCompletion(
        sentimentAnalysisPrompt,
        userSentimentResponseSchema
      );

      const userSentimentData = JSON.parse(userSentimentCompletion.response);
      const newUserSentiment = userSentimentData.userSentiment;
      setUserSentiment(newUserSentiment);

      // 3. Determine next step
      const predefinedAnswers = currentStep?.predefinedAnswers;
      const answerInterpretationSchema = zodToJsonSchema(
        AnswerInterpretationSchema
      );

      let nextStep;
      if (!predefinedAnswers || predefinedAnswers.length === 0) {
        nextStep = currentFlow?.find(step =>
          step.parentStepIds?.includes(String(currentStep?.id))
        );
      } else {
        // 3.1 Get answer interpretation
        const possibleAnswers = predefinedAnswers.join('\n');
        const answerInterpretationPrompt = getAnswerInterpretationPrompt({
          aiLastMessageText,
          conversationContext: newConversationContext,
          jsonSchema: answerInterpretationSchema,
          possibleAnswers,
          userLatestMessageText,
        });
        const answerInterpretationCompletion = await getStructuredCompletion(
          answerInterpretationPrompt,
          answerInterpretationSchema
        );

        const answerInterpretationData = JSON.parse(
          answerInterpretationCompletion.response
        );

        // 3.2 Update answer interpretation state
        setAnswerInterpretation(answerInterpretationData);

        nextStep = currentFlow?.find(
          step =>
            step.parentStepIds?.includes(String(currentStep?.id)) &&
            step.answerConditions?.includes(answerInterpretationData.answer)
        );
      }

      // 4. If next step, execute tools, get AI assistant response
      let _finalClientSummary = '';
      let _finalInternalSummary = '';

      if (nextStep) {
        // 4.1. Update current step
        setCurrentStep(nextStep);

        // 4.2. If tools on enter, execute them and add their responses as chat messages
        if (nextStep.toolsOnEnter) {
          for await (const toolRef of nextStep.toolsOnEnter) {
            const tool = tools.find(t => t.name === toolRef);
            if (tool?.exec) {
              // 4.2.1. Execute tool
              const toolResponse = await tool.exec();

              // 4.2.2. Add tool response as chat message
              addNewChatMessage(toolResponse);
            }
            // 4.2.3. Add tool to tools used list
            if (tool) setToolsUsed(prev => [...prev, tool]);
          }
        }

        // 4.3. Get AI assistant response for the next step
        const nextStepText = nextStep?.text ?? '';
        const iAssistantPrompt = getAiAssistantPrompt({
          conversationContext: newConversationContext,
          referenceText: nextStepText,
          userSentiment: newUserSentiment,
        });
        const getAiAssistantCompletion = await getCompletion(iAssistantPrompt);

        // 4.4. Add AI assistant response as chat message
        addNewChatMessage({
          parts: [
            {
              type: 'text',
              content: getAiAssistantCompletion.response,
            },
          ],
          timestamp: Date.now(),
          type: 'assistant',
        });
      }

      // 5. If no next step, get final summaries
      else {
        // 5.1. Get final client summary
        const finalCustomerSummaryPrompt = getFinalClientSummaryPrompt({
          conversationContext: newConversationContext,
          userSentiment: newUserSentiment,
        });
        const getFinalCustomerSummaryCompletion = await getCompletion(
          finalCustomerSummaryPrompt
        );

        // 5.2. Set final client summary state
        _finalClientSummary = getFinalCustomerSummaryCompletion.response;
        setFinalClientSummary(_finalClientSummary);

        // 5.3. Add final client summary as chat message
        addNewChatMessage({
          parts: [
            {
              type: 'text',
              content: getFinalCustomerSummaryCompletion.response,
            },
          ],
          timestamp: Date.now(),
          type: 'assistant',
        });

        // 5.4. Set final internal summary state
        const finalInternalSummaryPrompt = getFinalInternalSummaryPrompt({
          conversationContext: newConversationContext,
          userSentiment: newUserSentiment,
        });
        const getFinalInternalSummaryCompletion = await getCompletion(
          finalInternalSummaryPrompt
        );
        _finalInternalSummary = getFinalInternalSummaryCompletion.response;
        setFinalInternalSummary(_finalInternalSummary);

        // 5.5. Update isFinalStep state
        setIsFinalStep(true);
      }

      // 6. Update session record
      const updatedSession = {
        ...session,
        // currentExecutionId: n/a
        [SESSIONS_FINAL_CUSTOMER_SUMMARY_ID]: {
          value: _finalClientSummary,
        },
        [SESSIONS_FINAL_INTERNAL_SUMMARY_ID]: {
          value: _finalInternalSummary,
        },
        [SESSIONS_IS_COMPLETED_ID]: {
          value: !nextStep,
        },
        [SESSIONS_USER_SENTIMENT_ID]: {
          value: newUserSentiment,
        },
        [SESSIONS_CONVERSATION_CONTEXT_ID]: {
          value: newConversationContext,
        },
      };
      const res = await createRecord({
        id: SESSIONS_TABLE_ID,
        data: [updatedSession],
        fieldsToReturn: [
          SESSIONS_IDENTIFIER_ID,
          SESSIONS_FLOW_ID,
          SESSIONS_CURRENT_EXECUTION_ID,
          SESSIONS_FINAL_CUSTOMER_SUMMARY_ID,
          SESSIONS_FINAL_INTERNAL_SUMMARY_ID,
          SESSIONS_IS_COMPLETED_ID,
          SESSIONS_USER_SENTIMENT_ID,
          SESSIONS_CONVERSATION_CONTEXT_ID,
        ],
      });

      // 7. Update session state
      setSession(res.data?.[0] ?? null);

      // 8. Clear user query
      setUserQuery('');

      // 9. Set status to idle
      setStatus(STATUS.Idle);
    },
    [
      addNewChatMessage,
      chatMessages,
      conversationContext,
      currentFlow,
      currentStep?.id,
      currentStep?.predefinedAnswers,
      session,
      tools,
      userSentiment,
    ]
  );

  const handleReset = useCallback(() => {
    setAnswerInterpretation({
      answer: '',
      confidence: 0,
    });
    setChatMessages([]);
    setConversationContext(null);
    setCurrentFlowId(null);
    setFinalClientSummary(null);
    setFinalInternalSummary(null);
    setIsFinalStep(false);
    setToolsUsed([]);
    setUserQuery('');
    setUserSentiment(3);
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!isMounted) return;

      // 1. Set status to Init1
      setStatus(STATUS.Init1);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Fetch and set tools
      const _tools = await getAllTools();
      setTools(_tools);

      // 3. Fetch and set flows info
      const _flowsInfo = await getAllFlowsInfo();
      setFlowsInfo(_flowsInfo);

      // 4. Fetch and set flows
      const _flows = await getAllFlows();
      setFlows(_flows);

      // 5. Set status to Idle
      setStatus(STATUS.Idle);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (!flows || !currentFlowId) return;

      // 1. Set status to Init2
      setStatus(STATUS.Init2);

      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Create new session record
      const _sessionId = crypto.randomUUID();

      const newSession: QbTableDetailsDataItem = {
        [SESSIONS_IDENTIFIER_ID]: {
          value: _sessionId,
        },
        [SESSIONS_FLOW_ID]: {
          value: currentFlowId,
        },
        // currentExecutionId: n/a
        // finalCustomerSummary: n/a
        // finalInternalSummary: n/a
        // conversationContext: n/a
        [SESSIONS_IS_COMPLETED_ID]: {
          value: false,
        },
        [SESSIONS_USER_SENTIMENT_ID]: {
          value: 3,
        },
      };
      const res = await createRecord({
        id: SESSIONS_TABLE_ID,
        data: [newSession],
        fieldsToReturn: [
          SESSIONS_IDENTIFIER_ID,
          SESSIONS_FLOW_ID,
          SESSIONS_CURRENT_EXECUTION_ID,
          SESSIONS_FINAL_CUSTOMER_SUMMARY_ID,
          SESSIONS_FINAL_INTERNAL_SUMMARY_ID,
          SESSIONS_IS_COMPLETED_ID,
          SESSIONS_USER_SENTIMENT_ID,
          SESSIONS_CONVERSATION_CONTEXT_ID,
        ],
      });

      // 3. Set session state
      setSession(res.data?.[0] ?? null);

      // 4. Get first step of the flow
      const _currentStepId = currentFlow?.[0]?.id ?? null;
      const _currentStep =
        currentFlow?.find(step => step.id === _currentStepId) ?? null;
      setCurrentStep(_currentStep);

      // 5. Get AI assistant response for the first step
      const currentStepText = _currentStep?.text ?? '';
      const prompt = getAiAssistantPrompt({
        conversationContext:
          'This is the first message in the conversation. There are no context messages yet.',
        referenceText: currentStepText,
        userSentiment: 3,
      });
      const completion = await getCompletion(prompt);

      // 6. Set current step state
      addNewChatMessage({
        parts: [
          {
            type: 'text',
            content: completion.response,
          },
        ],
        timestamp: Date.now(),
        type: 'assistant',
      });

      // 7. Set status to Idle
      setStatus(STATUS.Idle);
    })();
  }, [addNewChatMessage, currentFlow, currentFlowId, flows]);

  const sessionId = String(session?.[SESSIONS_IDENTIFIER_ID]?.value);
  if (
    isFinalStep &&
    sessionId &&
    finalClientSummary &&
    finalInternalSummary &&
    (userSentiment || userSentiment === 0)
  ) {
    let print = '';

    print += `================================\n`;
    print += `# Conversation #${sessionId}\n\n`;

    print += chatMessages.reduce((acc, message) => {
      let text = '';
      // text = new Date(message.timestamp).toISOString() + '\n';
      text += message.type === 'user' ? '[User]:\n' : '[Assistant]:\n';
      text = message.parts.reduce((partAcc, part) => {
        if (part.type === 'text') {
          return partAcc + part.content + '\n';
        } else if (part.type === 'image') {
          return partAcc + '[IMAGE]';
        }
        return partAcc;
      }, text);
      return acc + text + '\n\n';
    }, '');

    print += `--------------------------------\n`;
    print += `# User Sentiment:${userSentiment}\n\n`;
    // print += `--------------------------------\n`;
    // print += `# Final Client Summary:${finalClientSummary}\n\n`;
    print += `--------------------------------\n`;
    print += `# Final Internal Summary:${finalInternalSummary}\n\n`;
    print += `================================\n\n`;

    console.log('::: TODO: 🚀 :::  ~ AppStateProvider ~ print:', print);
  }

  console.log('::: TODO: 🚀 :::  ~ AppStateProvider ~ session:', session);

  return (
    <AppStateContext
      value={{
        addNewUserChatMessage,
        answerInterpretation,
        setAnswerInterpretation,
        chatMessages,
        setChatMessages,
        conversationContext,
        setConversationContext,
        currentFlowId,
        setCurrentFlowId,
        currentStep,
        setCurrentStep,
        finalClientSummary,
        setFinalClientSummary,
        finalInternalSummary,
        setFinalInternalSummary,
        flows,
        setFlows,
        flowsInfo,
        setFlowsInfo,
        handleReset,
        isFinalStep,
        setIsFinalStep,
        session,
        setSession,
        status,
        setStatus,
        tools,
        setTools,
        toolsUsed,
        setToolsUsed,
        userQuery,
        setUserQuery,
        userSentiment,
        setUserSentiment,
      }}
    >
      {children}
    </AppStateContext>
  );
};

export default AppStateProvider;
