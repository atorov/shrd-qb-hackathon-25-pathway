import Avatar from '@mui/material/Avatar';

import type { ChatMessage } from '~/types/chat';

type MessageAvatarProps = Pick<ChatMessage, 'type'> & {
  avatarText: string;
};

function MessageAvatar({ avatarText, type }: MessageAvatarProps) {
  const isAssistant = type === 'assistant';

  return (
    <Avatar sx={{ bgcolor: isAssistant ? 'secondary.main' : 'primary.main' }}>
      {avatarText}
    </Avatar>
  );
}

export default MessageAvatar;
