
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Scheme } from '@/pages/SchemeFinderPage';
import { ApplicationData } from '../SchemeApplicationForm';

interface ApplicationSummaryStepProps {
  scheme: Scheme;
  applicationData: ApplicationData;
}

const ApplicationSummaryStep: React.FC<ApplicationSummaryStepProps> = ({
  scheme,
  applicationData
}) => {
  const { t } = useTranslation();

  const uploadedDocuments = applicationData.documents.filter(doc => doc.status === 'uploaded');
  const pendingDocuments = applicationData.documents.filter(
    doc => doc.required && doc.status !== 'uploaded'
  );

  const canSubmit = pendingDocuments.length === 0;

  return (
    <div className="space-y-6">
      {/* Application Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">
            {t('application.applicationSummary')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{scheme.translations?.title}</h3>
              <p className="text-gray-600">{scheme.translations?.description}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {t(`category.${scheme.category}`)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            {t('application.personalInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">{t('application.fullName')}</span>
              <p className="font-medium">{applicationData.personalInfo.fullName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t('application.email')}</span>
              <p className="font-medium">{applicationData.personalInfo.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t('application.phone')}</span>
              <p className="font-medium">{applicationData.personalInfo.phone}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t('application.dateOfBirth')}</span>
              <p className="font-medium">{applicationData.personalInfo.dateOfBirth}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t('application.occupation')}</span>
              <p className="font-medium">{applicationData.personalInfo.occupation}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">{t('application.income')}</span>
              <p className="font-medium">{applicationData.personalInfo.income}</p>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">{t('application.address')}</span>
            <p className="font-medium">{applicationData.personalInfo.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            {t('application.documentsStatus')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {applicationData.documents.length > 0 ? (
            <div className="space-y-3">
              {applicationData.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {doc.status === 'uploaded' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    )}
                    <span className="font-medium">{doc.name}</span>
                    {doc.required && (
                      <Badge variant="outline" className="text-xs">
                        {t('application.required')}
                      </Badge>
                    )}
                  </div>
                  <Badge
                    className={
                      doc.status === 'uploaded'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {t(`application.${doc.status}`)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">{t('application.noDocumentsRequired')}</p>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-medium">
              {t('application.totalDocuments')}: {applicationData.documents.length}
            </span>
            <span className="font-medium text-green-600">
              {t('application.uploaded')}: {uploadedDocuments.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Submission Status */}
      {!canSubmit && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">
                  {t('application.pendingDocuments')}
                </p>
                <p className="text-sm text-yellow-700">
                  {t('application.pleaseUploadRequired')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {canSubmit && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  {t('application.readyToSubmit')}
                </p>
                <p className="text-sm text-green-700">
                  {t('application.reviewAndSubmit')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApplicationSummaryStep;
