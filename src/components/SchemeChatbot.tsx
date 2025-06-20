
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '../contexts/TranslationContext';

const SchemeChatbot = () => {
  const { language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load the ElevenLabs ConvAI widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    
    // Initialize the ElevenLabs ConvAI widget
    if (window.ElevenLabsConvAI) {
      window.ElevenLabsConvAI.init({
        agentId: 'agent_01jy76wrxdewas9rfgr65tqr86',
        // You can add more configuration options here
      });
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* Chat Window with ElevenLabs ConvAI */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 z-40 animate-in slide-in-from-bottom-2 duration-300">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Voice AI Assistant</h3>
                  <p className="text-xs text-purple-100">
                    {language === 'te' ? 'వాయిస్ చాట్ చేయండి' : 'Voice Chat Enabled'}
                  </p>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* ElevenLabs ConvAI Widget Container */}
            <div className="flex-1 relative">
              <elevenlabs-convai agent-id="agent_01jy76wrxdewas9rfgr65tqr86"></elevenlabs-convai>
            </div>

            {/* Footer with instructions */}
            <div className="p-3 border-t bg-gray-50 text-center">
              <p className="text-xs text-gray-600">
                {language === 'te' 
                  ? 'माइक्रोफोन बटन दबाएं और बात करें' 
                  : 'Press the microphone button and speak'}
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default SchemeChatbot;
