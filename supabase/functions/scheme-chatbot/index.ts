
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a helpful AI assistant specialized in government schemes and welfare programs. Your role is to help users understand:

1. Available government schemes (Financial, Education, Healthcare, Agriculture, Employment, Housing)
2. Eligibility criteria for different schemes
3. How to apply for schemes
4. Required documents and application processes
5. Benefits and support available
6. Scheme categories and who they're meant for

You have knowledge about schemes like:
- PM-KISAN (financial support for farmers)
- Ayushman Bharat (healthcare coverage)
- Pradhan Mantri Awas Yojana (housing schemes)
- MGNREGA (employment guarantee)
- Educational scholarships and support
- And many other central and state government schemes

Guidelines:
- Always be helpful, polite, and informative
- Provide step-by-step guidance when explaining application processes
- Suggest using the scheme finder tool on the website for personalized recommendations
- If asked about irrelevant topics (like movies, sports, general knowledge not related to schemes), politely redirect: "I'm specialized in helping with government schemes and welfare programs. Could you please ask me something related to schemes, eligibility, applications, or benefits? I'd be happy to help you find the right scheme for your needs!"
- Keep responses concise but comprehensive
- Always encourage users to verify information with official sources

Remember: Focus only on government schemes, welfare programs, and related topics.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    console.log('Received message:', message);

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not found');
    }

    // Build the conversation for context
    const messages = [
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I will help users with government schemes and welfare programs, and redirect them politely if they ask about unrelated topics.' }]
      }
    ];

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });

    // Add current message
    messages.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini response:', JSON.stringify(data, null, 2));

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I could not generate a response. Please try asking about government schemes or application processes.';

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in scheme-chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your message. Please try again.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
