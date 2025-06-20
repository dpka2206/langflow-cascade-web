
import React, { useState } from 'react';
import ChatToggleButton from './chatbot/ChatToggleButton';
import ChatWindow from './chatbot/ChatWindow';
import { useElevenLabsScript } from '../hooks/useElevenLabsScript';

const SchemeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const agentId = 'agent_01jy76wrxdewas9rfgr65tqr86';

  useElevenLabsScript();

  return (
    <>
      <ChatToggleButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      <ChatWindow 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        agentId={agentId}
      />
    </>
  );
};

export default SchemeChatbot;
