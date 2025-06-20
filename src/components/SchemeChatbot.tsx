
import React, { useEffect } from 'react';

const SchemeChatbot = () => {
  useEffect(() => {
    // Configure the chat widget
    (window as any).ChatWidgetConfig = {
      webhook: {
        url: 'https://depipika.app.n8n.cloud/webhook/6f6872f2-cb78-422b-9934-5f3c906270ae/chat',
        route: 'general'
      },
      branding: {
        logo: 'https://www.shutterstock.com/image-vector/ashok-pillar-symbol-icon-black-600w-2422191035.jpg',
        name: 'SARKAR SATHI',
        welcomeText: 'Get instant answers to your questions!', 
        responseTimeText: 'Click the button below to start chatting'
      },
      style: {
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#1f2937'
      }
    };

    // Load the chat widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/funtastic418/chat-widget@main/chat-widget.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Clean up any widget elements that might have been added
      const existingWidget = document.querySelector('[data-chat-widget]');
      if (existingWidget) {
        existingWidget.remove();
      }
    };
  }, []);

  // This component renders nothing visible as the widget is injected by the external script
  return null;
};

export default SchemeChatbot;
