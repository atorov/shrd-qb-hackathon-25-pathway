type TextPart = {
  content: string;
  type: 'text';
};

type ImagePart = {
  content: string; // base64 encoded image
  type: 'image';
  alt?: string;
};

type MessagePart = TextPart | ImagePart;

type MessageType = 'assistant' | 'user';

export type ChatMessage = {
  parts: MessagePart[];
  timestamp: number;
  type: MessageType;
};
