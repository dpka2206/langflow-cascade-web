
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Scheme } from '@/types/scheme';
import PersonalInfoStep from './application-steps/PersonalInfoStep';
import DocumentUploadStep from './application-steps/DocumentUploadStep';
import ApplicationSummaryStep from './application-steps/ApplicationSummaryStep';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SchemeApplicationFormProps {
  scheme: Scheme;
  isOpen: boolean;
  onClose: () => void;
}

export interface ApplicationData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    occupation: string;
    income: string;
  };
  documents: DocumentStatus[];
}

export interface DocumentStatus {
  name: string;
  required: boolean;
  uploaded: boolean;
  file?: File;
  fileUrl?: string;
  error?: string;
  status: 'pending' | 'uploaded' | 'invalid';
}

const SchemeApplicationForm: React.FC<SchemeApplicationFormProps> = ({
  scheme,
  isOpen,
  onClose
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {
      fullName: '',
      email: user?.email || '',
      phone: '',
      address: '',
      dateOfBirth: '',
      occupation: '',
      income: ''
    },
    documents: []
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (scheme.translations?.documents) {
      const documentStatuses: DocumentStatus[] = scheme.translations.documents.map(doc => ({
        name: doc,
        required: true,
        uploaded: false,
        status: 'pending'
      }));
      setApplicationData(prev => ({ ...prev, documents: documentStatuses }));
    }
  }, [scheme]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t('application.loginRequired'));
      return;
    }

    setLoading(true);
    try {
      // Upload documents first
      const uploadedDocuments = [];
      for (const doc of applicationData.documents) {
        if (doc.file) {
          const fileName = `${user.id}/${scheme.id}/${Date.now()}-${doc.file.name}`;
          const { error: uploadError } = await supabase.storage
            .from('scheme-documents')
            .upload(fileName, doc.file);

          if (uploadError) throw uploadError;

          uploadedDocuments.push({
            name: doc.name,
            fileName: fileName,
            originalName: doc.file.name
          });
        }
      }

      // Create application record
      const { error: applicationError } = await supabase
        .from('scheme_applications')
        .insert({
          user_id: user.id,
          scheme_id: scheme.id,
          status: 'submitted',
          personal_info: applicationData.personalInfo,
          uploaded_documents: uploadedDocuments,
          submitted_at: new Date().toISOString()
        });

      if (applicationError) throw applicationError;

      toast.success(t('application.submitted'));
      onClose();
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(t('application.submitError'));
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={applicationData.personalInfo}
            onChange={(personalInfo) => 
              setApplicationData(prev => ({ ...prev, personalInfo }))
            }
          />
        );
      case 2:
        return (
          <DocumentUploadStep
            documents={applicationData.documents}
            onChange={(documents) => 
              setApplicationData(prev => ({ ...prev, documents }))
            }
          />
        );
      case 3:
        return (
          <ApplicationSummaryStep
            scheme={scheme}
            applicationData={applicationData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {t('application.title')} - {scheme.translations?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{t('application.step')} {currentStep} {t('application.of')} {totalSteps}</span>
              <span>{Math.round(progress)}% {t('application.complete')}</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              {t('common.previous')}
            </Button>

            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>
                  {t('common.next')}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? t('application.submitting') : t('application.submit')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SchemeApplicationForm;
