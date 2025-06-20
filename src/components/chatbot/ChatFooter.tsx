
import React from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

const ChatFooter: React.FC = () => {
  const { language } = useTranslation();

  return (
    <div className="p-3 border-t bg-gray-50 text-center">
      <p className="text-xs text-gray-600">
        {language === 'te' 
          ? 'माइक्रोफोन बटन दबाएं और बात करें' 
          : 'Press the microphone button and speak'}
      </p>
    </div>
  );
};

export default ChatFooter;
