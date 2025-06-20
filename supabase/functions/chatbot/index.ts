
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  message: string;
  context?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, includeSchemeData = true }: ChatMessage & { includeSchemeData?: boolean } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    // Initialize Supabase client to get scheme data
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    let systemContext = `You are a helpful assistant for a government scheme finder website. You help users understand:
- Government schemes and their benefits
- Eligibility criteria for various schemes
- How to apply for schemes
- Required documents
- Application processes
- General website navigation and features

Always be helpful, friendly, and provide accurate information. If you're unsure about specific details, suggest the user check the official scheme documentation or contact relevant authorities.`;

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
          
          systemContext += `\n\nAvailable Government Schemes:\n${schemeInfo}`;
        }

        if (externalSchemes && externalSchemes.length > 0) {
          const externalSchemeInfo = externalSchemes.map(scheme => 
            `${scheme.scheme_name}: ${scheme.description || 'No description'}`
          ).join('\n');
          
          systemContext += `\n\nAdditional Schemes:\n${externalSchemeInfo}`;
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
            text: `${systemContext}\n\nUser Question: ${message}`
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
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I could not generate a response. Please try again.';

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
