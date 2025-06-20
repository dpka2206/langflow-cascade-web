
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ isOpen, onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
        )}
      </Button>
    </div>
  );
};

export default ChatToggleButton;
