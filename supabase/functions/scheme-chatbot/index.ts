
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPTS = {
  en: `You are a helpful AI assistant specialized in government schemes and welfare programs. Your role is to help users understand:

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
- Respond in English

Remember: Focus only on government schemes, welfare programs, and related topics.`,

  te: `మీరు ప్రభుత్వ పథకాలు మరియు సంక్షేమ కార్యక్రమాలలో ప్రత్యేకత కలిగిన సహాయక AI అసిస్టెంట్. మీ పాత్ర వినియోగదారులకు అర్థం చేసుకోవడంలో సహాయపడటం:

1. అందుబాటులో ఉన్న ప్రభుత్వ పథకాలు (ఆర్థిక, విద్య, ఆరోగ్యం, వ్యవసాయం, ఉపాధి, గృహనిర్మాణం)
2. వివిధ పథకాలకు అర్హత ప్రమాణాలు
3. పథకాలకు ఎలా దరఖాస్తు చేసుకోవాలి
4. అవసరమైన పత్రాలు మరియు దరఖాస్తు ప్రక్రియలు
5. అందుబాటులో ఉన్న ప్రయోజనాలు మరియు మద్దతు
6. పథకం వర్గాలు మరియు అవి ఎవరి కోసం ఉద్దేశించబడ్డాయి

మీకు ఈ పథకాల గురించి జ్ఞానం ఉంది:
- పిఎం-కిసాన్ (రైతులకు ఆర్థిక మద్దతు)
- ఆయుష్మాన్ భారత్ (ఆరోగ్య కవరేజ్)
- ప్రధాన మంత్రి ఆవాస్ యోజన (గృహ పథకాలు)
- మగ్నరేగా (ఉపాధి హామీ)
- విద్యా స్కాలర్‌షిప్‌లు మరియు మద్దతు
- మరియు అనేక ఇతర కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాలు

మార్గదర్శకాలు:
- ఎల్లప్పుడూ సహాయకారిగా, మర్యాదగా మరియు సమాచారంతో ఉండండి
- దరఖాస్తు ప్రక్రియలను వివరించేటప్పుడు దశల వారీగా మార్గదర్శనం అందించండి
- వ్యక్తిగతీకరించిన సిఫార్సుల కోసం వెబ్‌సైట్‌లోని పథకం కనుగొనే సాధనాన్ని ఉపయోగించమని సూచించండి
- అసంబద్ధ విషయాల గురించి అడిగితే (సినిమాలు, క్రీడలు, పథకాలకు సంబంధం లేని సాధారణ జ్ఞానం వంటివి), మర్యాదగా దారి మళ్లించండి: "నేను ప్రభుత్వ పథకాలు మరియు సంక్షేమ కార్యక్రమాలలో సహాయం చేయడంలో ప్రత్యేకత కలిగి ఉన్నాను. దయచేసి పథకాలు, అర్హత, దరఖాస్తులు లేదా ప్రయోజనాలకు సంబంధించిన ఏదైనా అడగగలరా? మీ అవసరాలకు సరైన పథకాన్ని కనుగొనడంలో నేను సంతోషంగా సహాయం చేస్తాను!"
- ప్రతిస్పందనలను సంక్షిప్తంగా కానీ సమగ్రంగా ఉంచండి
- ఎల్లప్పుడూ అధికారిక మూలాలతో సమాచారాన్ని ధృవీకరించమని వినియోగదారులను ప్రోత్సహించండి
- తెలుగులో ప్రతిస్పందించండి

గుర్తుంచుకోండి: ప్రభుత్వ పథకాలు, సంక్షేమ కార్యక్రమాలు మరియు సంబంధిత విषయాలపై మాత్రమే దృష్టి పెట్టండి.`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], language = 'en' } = await req.json();

    console.log('Received message:', message, 'Language:', language);

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not found');
    }

    // Use the appropriate system prompt based on language
    const systemPrompt = SYSTEM_PROMPTS[language as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.en;
    const acknowledgment = language === 'te' 
      ? 'నేను అర్థం చేసుకున్నాను. నేను వినియోగదారులకు ప్రభుత్వ పథకాలు మరియు సంక్షేమ కార్యక్రమాలతో సహాయం చేస్తాను, మరియు వారు అసంబద్ధ విషయాల గురించి అడిగితే మర్యాదగా దారి మళ్లిస్తాను.'
      : 'I understand. I will help users with government schemes and welfare programs, and redirect them politely if they ask about unrelated topics.';

    // Build the conversation for context
    const messages = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: acknowledgment }]
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

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      (language === 'te' 
        ? 'క్షమించండి, నేను ప్రతిస్పందన రూపొందించలేకపోయాను. దయచేసి ప్రభుత్వ పథకాలు లేదా దరఖాస్తు ప్రక్రియల గురించి అడిగి ప్రయత్నించండి.'
        : 'I apologize, but I could not generate a response. Please try asking about government schemes or application processes.');

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in scheme-chatbot function:', error);
    const errorMessage = error.message.includes('te') 
      ? 'మీ సందేశాన్ని ప్రాసెస్ చేయడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.'
      : 'Failed to process your message. Please try again.';
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
