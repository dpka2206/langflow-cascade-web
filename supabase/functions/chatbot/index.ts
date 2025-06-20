
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  message: string;
  language?: string;
  context?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'en', includeSchemeData = true }: ChatMessage & { includeSchemeData?: boolean } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    // Initialize Supabase client to get scheme data
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let systemContext = language === 'te' 
      ? `మీరు ప్రభుత్వ పథకాల కనుగొనే వెబ్‌సైట్ కోసం సహాయకుడు. మీరు వినియోగదారులకు ఈ విషయాలను అర్థం చేసుకోవడంలో సహాయం చేస్తారు:
- ప్రభుత్వ పథకాలు మరియు వాటి ప్రయోజనాలు
- వివిధ పథకాలకు అర్హత ప్రమాణాలు
- పథకాలకు ఎలా దరఖాస్తు చేసుకోవాలి
- అవసరమైన పత్రాలు
- దరఖాస్తు ప్రక్రియలు
- సాధారణ వెబ్‌సైట్ నావిగేషన్ మరియు ఫీచర్లు

ఎల్లప్పుడూ సహాయకరంగా, స్నేహపూర్వకంగా ఉండండి మరియు ఖచ్చితమైన సమాచారం అందించండి. నిర్దిష్ట వివరాల గురించి మీకు ఖచ్చితంగా తెలియకపోతే, వినియోగదారుకు అధికారిక పథక డాక్యుమెంటేషన్ చూడాలని లేదా సంబంధిత అధికారులను సంప్రదించాలని సూచించండి. తెలుగులో మాత్రమే జవాబు ఇవ్వండి.`
      : `You are a helpful assistant for a government scheme finder website. You help users understand:
- Government schemes and their benefits
- Eligibility criteria for various schemes
- How to apply for schemes
- Required documents
- Application processes
- General website navigation and features

Always be helpful, friendly, and provide accurate information. If you're unsure about specific details, suggest the user check the official scheme documentation or contact relevant authorities. Respond in English only.`;

    // Fetch scheme data for context if requested
    if (includeSchemeData) {
      try {
        const { data: schemes } = await supabase
          .from('central_government_schemes')
          .select('scheme_name, description, benefits, eligibility_criteria, application_process, required_documents')
          .eq('status', 'active')
          .limit(50);

        const { data: externalSchemes } = await supabase
          .from('external_schemes')
          .select('scheme_name, description, benefits, eligibility_criteria, application_process')
          .eq('status', 'active')
          .limit(30);

        if (schemes && schemes.length > 0) {
          const schemeInfo = schemes.map(scheme => 
            `${scheme.scheme_name}: ${scheme.description || 'No description'} | Benefits: ${scheme.benefits || 'Not specified'} | Eligibility: ${scheme.eligibility_criteria || 'Check official documentation'}`
          ).join('\n');
          
          systemContext += language === 'te' 
            ? `\n\nఅందుబాటులో ఉన్న ప్రభుత్వ పథకాలు:\n${schemeInfo}`
            : `\n\nAvailable Government Schemes:\n${schemeInfo}`;
        }

        if (externalSchemes && externalSchemes.length > 0) {
          const externalSchemeInfo = externalSchemes.map(scheme => 
            `${scheme.scheme_name}: ${scheme.description || 'No description'}`
          ).join('\n');
          
          systemContext += language === 'te' 
            ? `\n\nఅదనపు పథకాలు:\n${externalSchemeInfo}`
            : `\n\nAdditional Schemes:\n${externalSchemeInfo}`;
        }
      } catch (error) {
        console.log('Could not fetch scheme data:', error);
      }
    }

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get('GEMINI_API_KEY')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemContext}\n\n${language === 'te' ? 'వినియోగదారు ప్రశ్న' : 'User Question'}: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || (
      language === 'te' 
        ? 'క్షమించండి, నేను ప్రతిస్పందన రూపొందించలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి.'
        : 'I apologize, but I could not generate a response. Please try again.'
    );

    return new Response(JSON.stringify({
      response: aiResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'An error occurred while processing your request',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
