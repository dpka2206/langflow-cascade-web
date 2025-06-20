
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}
          </h1>
          <p className="text-gray-600">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.mySchemes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t('dashboard.schemesDescription')}</p>
              <Button className="mt-4 w-full">
                {t('dashboard.viewSchemes')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.applications')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t('dashboard.applicationsDescription')}</p>
              <Button className="mt-4 w-full">
                {t('dashboard.viewApplications')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.profile')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{t('dashboard.profileDescription')}</p>
              <Button className="mt-4 w-full">
                {t('dashboard.editProfile')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configure how you receive scheme alerts and updates</p>
              <Button 
                className="mt-4 w-full" 
                onClick={() => navigate('/notifications')}
              >
                Manage Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
