
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NotificationTrigger {
  user_id: string;
  notification_type: 'deadline_alert' | 'status_change' | 'verification' | 'test';
  title: string;
  message: string;
  scheme_id?: string;
}

export const useNotifications = () => {
  const { toast } = useToast();

  const sendNotification = async (trigger: NotificationTrigger) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-notifications', {
        body: trigger
      });

      if (error) {
        console.error('Error sending notification:', error);
        toast({
          title: "Notification Error",
          description: "Failed to send notification",
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error invoking notification function:', error);
      toast({
        title: "Notification Error",
        description: "Failed to send notification",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    }
  };

  const sendDeadlineAlert = async (userId: string, schemeName: string, deadline: string, schemeId?: string) => {
    return sendNotification({
      user_id: userId,
      notification_type: 'deadline_alert',
      title: 'Scheme Deadline Alert',
      message: `The deadline for "${schemeName}" is approaching: ${deadline}. Please complete your application soon.`,
      scheme_id: schemeId
    });
  };

  const sendStatusChange = async (userId: string, schemeName: string, newStatus: string, schemeId?: string) => {
    return sendNotification({
      user_id: userId,
      notification_type: 'status_change',
      title: 'Application Status Update',
      message: `Your application for "${schemeName}" has been updated to: ${newStatus}`,
      scheme_id: schemeId
    });
  };

  const sendVerificationAlert = async (userId: string, schemeName: string, verificationType: string, schemeId?: string) => {
    return sendNotification({
      user_id: userId,
      notification_type: 'verification',
      title: 'Verification Required',
      message: `Verification required for "${schemeName}": ${verificationType}. Please provide the necessary documents.`,
      scheme_id: schemeId
    });
  };

  return {
    sendNotification,
    sendDeadlineAlert,
    sendStatusChange,
    sendVerificationAlert
  };
};
