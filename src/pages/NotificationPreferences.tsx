
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, MessageCircle, Phone, Bell, Save, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface NotificationPreferences {
  id?: string;
  email_enabled: boolean;
  sms_enabled: boolean;
  whatsapp_enabled: boolean;
  phone_number: string;
  whatsapp_number: string;
}

interface NotificationLog {
  id: string;
  notification_type: string;
  channel: string;
  status: string;
  message: string;
  sent_at: string;
  error_details?: string;
}

const NotificationPreferences = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_enabled: true,
    sms_enabled: false,
    whatsapp_enabled: false,
    phone_number: '',
    whatsapp_number: ''
  });
  
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPreferences();
      fetchNotificationLogs();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching preferences:', error);
        return;
      }

      if (data) {
        setPreferences({
          id: data.id,
          email_enabled: data.email_enabled ?? true,
          sms_enabled: data.sms_enabled ?? false,
          whatsapp_enabled: data.whatsapp_enabled ?? false,
          phone_number: data.phone_number ?? '',
          whatsapp_number: data.whatsapp_number ?? ''
        });
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotificationLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('sent_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const preferenceData = {
        user_id: user.id,
        email_enabled: preferences.email_enabled,
        sms_enabled: preferences.sms_enabled,
        whatsapp_enabled: preferences.whatsapp_enabled,
        phone_number: preferences.phone_number || null,
        whatsapp_number: preferences.whatsapp_number || null
      };

      let error;
      if (preferences.id) {
        const { error: updateError } = await supabase
          .from('notification_preferences')
          .update(preferenceData)
          .eq('id', preferences.id);
        error = updateError;
      } else {
        const { data, error: insertError } = await supabase
          .from('notification_preferences')
          .insert(preferenceData)
          .select()
          .single();
        
        if (!insertError && data) {
          setPreferences(prev => ({ ...prev, id: data.id }));
        }
        error = insertError;
      }

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save notification preferences",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Notification preferences saved successfully"
        });
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save notification preferences",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const testNotification = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-notifications', {
        body: {
          user_id: user?.id,
          notification_type: 'test',
          title: 'Test Notification',
          message: 'This is a test notification to verify your settings.'
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send test notification",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Test Sent",
          description: "Test notifications sent to enabled channels"
        });
        // Refresh logs after test
        setTimeout(fetchNotificationLogs, 2000);
      }
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading preferences...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notification Preferences
          </h1>
          <p className="text-gray-600">
            Configure how you want to receive scheme alerts and updates
          </p>
        </div>

        <div className="grid gap-6">
          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive alerts via email</p>
                  </div>
                </div>
                <Switch
                  checked={preferences.email_enabled}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, email_enabled: checked }))
                  }
                />
              </div>

              <Separator />

              {/* SMS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-500" />
                    <div>
                      <Label className="text-base font-medium">SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Receive alerts via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.sms_enabled}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, sms_enabled: checked }))
                    }
                  />
                </div>
                {preferences.sms_enabled && (
                  <div className="ml-8">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={preferences.phone_number}
                      onChange={(e) =>
                        setPreferences(prev => ({ ...prev, phone_number: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <Separator />

              {/* WhatsApp */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium">WhatsApp Notifications</Label>
                      <p className="text-sm text-gray-600">Receive alerts via WhatsApp</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.whatsapp_enabled}
                    onCheckedChange={(checked) =>
                      setPreferences(prev => ({ ...prev, whatsapp_enabled: checked }))
                    }
                  />
                </div>
                {preferences.whatsapp_enabled && (
                  <div className="ml-8">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+1234567890"
                      value={preferences.whatsapp_number}
                      onChange={(e) =>
                        setPreferences(prev => ({ ...prev, whatsapp_number: e.target.value }))
                      }
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={savePreferences} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Preferences'}
            </Button>
            <Button variant="outline" onClick={testNotification}>
              <Bell className="h-4 w-4 mr-2" />
              Send Test Notification
            </Button>
          </div>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {logs.length === 0 ? (
                <p className="text-gray-600">No notifications sent yet</p>
              ) : (
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-1">
                        {log.status === 'sent' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium capitalize">{log.notification_type}</span>
                          <span className="text-sm text-gray-500">via {log.channel}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(log.sent_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{log.message}</p>
                        {log.error_details && (
                          <p className="text-xs text-red-600 mt-1">{log.error_details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
