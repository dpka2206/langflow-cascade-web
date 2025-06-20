
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
    console.log(`Logged notification: ${channel} - ${status}`);
  } catch (error) {
    console.error('Error logging notification:', error);
  }
};

const sendEmailNotification = async (
  email: string,
  title: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(`Attempting to send email to ${email}: ${title} - ${message}`);
    
    // For now, we'll simulate email sending since no email service is configured
    // In a real implementation, you would integrate with an email service like Resend
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success for demo purposes
    console.log(`Email sent successfully to ${email}`);
    return { success: true };
    
  } catch (error) {
    console.error(`Email sending failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const sendSMSNotification = async (
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(`Attempting to send SMS to ${phoneNumber}: ${message}`);
    
    // For now, we'll simulate SMS sending since no SMS service is configured
    // In a real implementation, you would integrate with an SMS service like Twilio
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 85% success rate for demo
    if (Math.random() > 0.15) {
      console.log(`SMS sent successfully to ${phoneNumber}`);
      return { success: true };
    } else {
      console.log(`SMS failed to ${phoneNumber}: Service unavailable`);
      return { success: false, error: 'SMS service unavailable' };
    }
  } catch (error) {
    console.error(`SMS sending failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const sendWhatsAppNotification = async (
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log(`Attempting to send WhatsApp to ${phoneNumber}: ${message}`);
    
    // For now, we'll simulate WhatsApp sending since no WhatsApp service is configured
    // In a real implementation, you would integrate with WhatsApp Business API
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 80% success rate for demo
    if (Math.random() > 0.2) {
      console.log(`WhatsApp sent successfully to ${phoneNumber}`);
      return { success: true };
    } else {
      console.log(`WhatsApp failed to ${phoneNumber}: Service unavailable`);
      return { success: false, error: 'WhatsApp service unavailable' };
    }
  } catch (error) {
    console.error(`WhatsApp sending failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, notification_type, title, message, scheme_id }: NotificationRequest = await req.json();

    console.log(`Processing notification request for user: ${user_id}, type: ${notification_type}`);

    if (!user_id || !notification_type || !title || !message) {
      console.error('Missing required fields in request');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get user's email from auth.users
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(user_id);
    if (userError || !userData.user) {
      console.error('User not found:', userError);
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`Found user email: ${userData.user.email}`);

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

    console.log('User preferences:', userPrefs);

    const results = [];
    const fullMessage = `${title}: ${message}`;

    // Send email notification
    if (userPrefs.email_enabled && userData.user.email) {
      console.log('Sending email notification...');
      const emailResult = await sendEmailNotification(userData.user.email, title, message);
      await logNotification(
        user_id,
        notification_type,
        'email',
        emailResult.success ? 'sent' : 'failed',
        fullMessage,
        emailResult.error
      );
      results.push({ channel: 'email', success: emailResult.success, error: emailResult.error });
    } else {
      console.log('Email notification skipped - not enabled or no email address');
    }

    // Send SMS notification
    if (userPrefs.sms_enabled && userPrefs.phone_number) {
      console.log('Sending SMS notification...');
      const smsResult = await sendSMSNotification(userPrefs.phone_number, fullMessage);
      await logNotification(
        user_id,
        notification_type,
        'sms',
        smsResult.success ? 'sent' : 'failed',
        fullMessage,
        smsResult.error
      );
      results.push({ channel: 'sms', success: smsResult.success, error: smsResult.error });
    } else {
      console.log('SMS notification skipped - not enabled or no phone number');
    }

    // Send WhatsApp notification
    if (userPrefs.whatsapp_enabled && userPrefs.whatsapp_number) {
      console.log('Sending WhatsApp notification...');
      const whatsappResult = await sendWhatsAppNotification(userPrefs.whatsapp_number, fullMessage);
      await logNotification(
        user_id,
        notification_type,
        'whatsapp',
        whatsappResult.success ? 'sent' : 'failed',
        fullMessage,
        whatsappResult.error
      );
      results.push({ channel: 'whatsapp', success: whatsappResult.success, error: whatsappResult.error });
    } else {
      console.log('WhatsApp notification skipped - not enabled or no WhatsApp number');
    }

    console.log(`Notification processing complete. Results:`, results);

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
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
};

serve(handler);
