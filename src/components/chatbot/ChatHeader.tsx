
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '../../contexts/TranslationContext';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  const { language } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Voice AI Assistant</h3>
          <p className="text-xs text-purple-100">
            {language === 'te' ? 'వాయిస్ చాట్ చేయండి' : 'Voice Chat Enabled'}
          </p>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
