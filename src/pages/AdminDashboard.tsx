
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Settings, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const adminCards = [
    {
      title: t('admin.manageSchemes'),
      description: t('admin.schemesDescription'),
      icon: FileText,
      action: t('admin.viewSchemes')
    },
    {
      title: t('admin.manageContent'),
      description: t('admin.contentDescription'),
      icon: Settings,
      action: t('admin.editContent')
    },
    {
      title: t('admin.userAnalytics'),
      description: t('admin.analyticsDescription'),
      icon: BarChart3,
      action: t('admin.viewAnalytics')
    },
    {
      title: t('admin.manageUsers'),
      description: t('admin.usersDescription'),
      icon: Users,
      action: t('admin.viewUsers')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              {t('admin.title')}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t('admin.welcomeAdmin')}, {user?.email}
              </span>
              <Button variant="outline" onClick={signOut}>
                {t('auth.signout')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('admin.dashboard')}
          </h2>
          <p className="text-gray-600">
            {t('admin.dashboardSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {adminCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {card.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
