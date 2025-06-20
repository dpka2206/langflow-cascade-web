
import React from 'react';
import { Card } from '@/components/ui/card';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ElevenLabsWidget from './ElevenLabsWidget';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, agentId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 z-40 animate-in slide-in-from-bottom-2 duration-300">
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
        <ChatHeader onClose={onClose} />
        <ElevenLabsWidget agentId={agentId} />
        <ChatFooter />
      </Card>
    </div>
  );
};

export default ChatWindow;
