
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/contexts/TranslationContext';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChatbot = () => {
  const { language, t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: language === 'te' 
        ? 'నమస్కారం! మీకు ప్రభుత్వ పథకాలు, దరఖాస్తులు మరియు మా వెబ్‌సైట్ గురించి ఏవైనా ప్రశ్నలతో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?'
        : 'Hello! I\'m here to help you with government schemes, applications, and any questions about our website. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { 
          message: content,
          language: language,
          includeSchemeData: true
        }
      });

      if (error) throw error;

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: language === 'te' 
          ? 'క్షమించండి, నేను ఒక లోపాన్ని ఎదుర్కొన్నాను. దయచేసి తరువాత మళ్ళీ ప్రయత్నించండి.'
          : 'I apologize, but I encountered an error. Please try again later.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: '1',
      content: language === 'te' 
        ? 'నమస్కారం! మీకు ప్రభుత్వ పథకాలు, దరఖాస్తులు మరియు మా వెబ్‌సైట్ గురించి ఏవైనా ప్రశ్నలతో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?'
        : 'Hello! I\'m here to help you with government schemes, applications, and any questions about our website. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }]);
  }, [language]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};
