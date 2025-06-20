
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, DollarSign, FileText, Play, CheckCircle, ExternalLink } from 'lucide-react';
import { Scheme } from '@/pages/SchemeFinderPage';

interface SchemeDetailModalProps {
  scheme: Scheme;
  isOpen: boolean;
  onClose: () => void;
}

const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  isOpen,
  onClose
}) => {
  const { t } = useTranslation();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health':
        return <Heart className="h-5 w-5" />;
      case 'employment':
        return <Users className="h-5 w-5" />;
      case 'agriculture':
        return <DollarSign className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'employment':
        return 'bg-purple-100 text-purple-800';
      case 'agriculture':
        return 'bg-green-100 text-green-800';
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'housing':
        return 'bg-yellow-100 text-yellow-800';
      case 'social':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {scheme.translations?.title || scheme.key}
              </DialogTitle>
              <Badge className={`${getCategoryColor(scheme.category)} flex items-center gap-1 w-fit`}>
                {getCategoryIcon(scheme.category)}
                {t(`category.${scheme.category}`)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t('schemeDetail.overview')}</TabsTrigger>
            <TabsTrigger value="eligibility">{t('schemeDetail.eligibility')}</TabsTrigger>
            <TabsTrigger value="documents">{t('schemeDetail.documents')}</TabsTrigger>
            <TabsTrigger value="apply">{t('schemeDetail.howToApply')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Video Placeholder */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">{t('schemeDetail.videoComingSoon')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{t('schemeDetail.description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {scheme.translations?.description || t('schemeDetail.noDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            {scheme.translations?.benefits && scheme.translations.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    {t('schemeDetail.benefits')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scheme.translations.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  {t('schemeDetail.eligibilityCriteria')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scheme.translations?.eligibility && scheme.translations.eligibility.length > 0 ? (
                  <ul className="space-y-3">
                    {scheme.translations.eligibility.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{t('schemeDetail.noEligibility')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  {t('schemeDetail.requiredDocuments')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {scheme.translations?.documents && scheme.translations.documents.length > 0 ? (
                  <ul className="space-y-3">
                    {scheme.translations.documents.map((document, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{document}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{t('schemeDetail.noDocuments')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('schemeDetail.applicationProcess')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-gray-700">{t('schemeDetail.step1')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-gray-700">{t('schemeDetail.step2')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-gray-700">{t('schemeDetail.step3')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('schemeDetail.applyOnline')}
              </Button>
              <Button variant="outline" className="flex-1">
                {t('schemeDetail.downloadForm')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SchemeDetailModal;
