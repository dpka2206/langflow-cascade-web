
import React, { useEffect } from 'react';

const SchemeChatbot = () => {
  useEffect(() => {
    console.log('SchemeChatbot: Starting initialization');
    
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

    console.log('SchemeChatbot: Configuration set', (window as any).ChatWidgetConfig);

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="chat-widget.js"]');
    if (existingScript) {
      console.log('SchemeChatbot: Script already exists, removing it first');
      existingScript.remove();
    }

    // Load the chat widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/funtastic418/chat-widget@main/chat-widget.js';
    script.async = true;
    
    script.onload = () => {
      console.log('SchemeChatbot: Script loaded successfully');
    };
    
    script.onerror = (error) => {
      console.error('SchemeChatbot: Script failed to load', error);
    };
    
    document.head.appendChild(script);
    console.log('SchemeChatbot: Script added to document head');

    // Cleanup function to remove script when component unmounts
    return () => {
      console.log('SchemeChatbot: Cleaning up');
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Clean up any widget elements that might have been added
      const existingWidget = document.querySelector('[data-chat-widget]');
      if (existingWidget) {
        existingWidget.remove();
        console.log('SchemeChatbot: Removed existing widget');
      }
    };
  }, []);

  // This component renders nothing visible as the widget is injected by the external script
  return null;
};

export default SchemeChatbot;
