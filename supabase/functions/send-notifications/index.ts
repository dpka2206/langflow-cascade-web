
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  user_id: string;
  notification_type: string;
  title: string;
  message: string;
  scheme_id?: string;
}

interface NotificationPreferences {
  email_enabled: boolean;
  sms_enabled: boolean;
  whatsapp_enabled: boolean;
  phone_number?: string;
  whatsapp_number?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const logNotification = async (
  userId: string,
  notificationType: string,
  channel: string,
  status: 'sent' | 'failed',
  message: string,
  errorDetails?: string
) => {
  try {
    await supabase.from('notification_logs').insert({
      user_id: userId,
      notification_type: notificationType,
      channel,
      status,
      message,
      error_details: errorDetails
    });
  } catch (error) {
    console.error('Error logging notification:', error);
  }
};

const sendEmailNotification = async (
  email: string,
  title: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  // Simulate email sending - replace with actual email service
  try {
    // Here you would integrate with your email service (e.g., Resend, SendGrid, etc.)
    console.log(`Sending email to ${email}: ${title} - ${message}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return { success: true };
    } else {
      return { success: false, error: 'Email service unavailable' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const sendSMSNotification = async (
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  // Simulate SMS sending - replace with actual SMS service
  try {
    // Here you would integrate with your SMS service (e.g., Twilio, AWS SNS, etc.)
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 85% success rate
    if (Math.random() > 0.15) {
      return { success: true };
    } else {
      return { success: false, error: 'SMS service unavailable' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const sendWhatsAppNotification = async (
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  // Simulate WhatsApp sending - replace with actual WhatsApp Business API
  try {
    // Here you would integrate with WhatsApp Business API
    console.log(`Sending WhatsApp to ${phoneNumber}: ${message}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 80% success rate
    if (Math.random() > 0.2) {
      return { success: true };
    } else {
      return { success: false, error: 'WhatsApp service unavailable' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, notification_type, title, message, scheme_id }: NotificationRequest = await req.json();

    if (!user_id || !notification_type || !title || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get user's email from auth.users
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(user_id);
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get user's notification preferences
    const { data: preferences, error: prefsError } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user_id)
      .maybeSingle();

    if (prefsError) {
      console.error('Error fetching preferences:', prefsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch notification preferences' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const userPrefs: NotificationPreferences = preferences || {
      email_enabled: true,
      sms_enabled: false,
      whatsapp_enabled: false
    };

    const results = [];

    // Send email notification
    if (userPrefs.email_enabled && userData.user.email) {
      const emailResult = await sendEmailNotification(userData.user.email, title, message);
      await logNotification(
        user_id,
        notification_type,
        'email',
        emailResult.success ? 'sent' : 'failed',
        `${title}: ${message}`,
        emailResult.error
      );
      results.push({ channel: 'email', success: emailResult.success, error: emailResult.error });
    }

    // Send SMS notification
    if (userPrefs.sms_enabled && userPrefs.phone_number) {
      const smsResult = await sendSMSNotification(userPrefs.phone_number, `${title}: ${message}`);
      await logNotification(
        user_id,
        notification_type,
        'sms',
        smsResult.success ? 'sent' : 'failed',
        `${title}: ${message}`,
        smsResult.error
      );
      results.push({ channel: 'sms', success: smsResult.success, error: smsResult.error });
    }

    // Send WhatsApp notification
    if (userPrefs.whatsapp_enabled && userPrefs.whatsapp_number) {
      const whatsappResult = await sendWhatsAppNotification(userPrefs.whatsapp_number, `${title}: ${message}`);
      await logNotification(
        user_id,
        notification_type,
        'whatsapp',
        whatsappResult.success ? 'sent' : 'failed',
        `${title}: ${message}`,
        whatsappResult.error
      );
      results.push({ channel: 'whatsapp', success: whatsappResult.success, error: whatsappResult.error });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        message: `Notifications processed for ${results.length} channels`
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );

  } catch (error) {
    console.error('Error in send-notifications function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
};

serve(handler);
