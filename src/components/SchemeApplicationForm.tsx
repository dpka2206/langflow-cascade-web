
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

  const validatePersonalInfo = () => {
    const { personalInfo } = applicationData;
    const required = ['fullName', 'email', 'phone', 'address', 'dateOfBirth'];
    return required.every(field => personalInfo[field as keyof typeof personalInfo]?.trim());
  };

  const validateDocuments = () => {
    const requiredDocs = applicationData.documents.filter(doc => doc.required);
    return requiredDocs.every(doc => doc.status === 'uploaded');
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please log in to submit your application');
      return;
    }

    // Validate all steps
    if (!validatePersonalInfo()) {
      toast.error('Please fill in all required personal information');
      setCurrentStep(1);
      return;
    }

    if (!validateDocuments()) {
      toast.error('Please upload all required documents');
      setCurrentStep(2);
      return;
    }

    setLoading(true);
    console.log('Starting application submission for user:', user.id, 'scheme:', scheme.id);
    
    try {
      // Upload documents first
      const uploadedDocuments = [];
      
      for (const doc of applicationData.documents) {
        if (doc.file) {
          console.log('Uploading document:', doc.name);
          const fileExt = doc.file.name.split('.').pop();
          const fileName = `${user.id}/${scheme.id}/${Date.now()}-${doc.name.replace(/\s+/g, '_')}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('scheme-documents')
            .upload(fileName, doc.file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error('Document upload error:', uploadError);
            throw new Error(`Failed to upload ${doc.name}: ${uploadError.message}`);
          }

          console.log('Document uploaded successfully:', uploadData);
          
          uploadedDocuments.push({
            name: doc.name,
            fileName: fileName,
            originalName: doc.file.name,
            fileSize: doc.file.size,
            uploadedAt: new Date().toISOString()
          });
        }
      }

      // Create application record
      const applicationRecord = {
        user_id: user.id,
        scheme_id: scheme.id,
        status: 'submitted',
        personal_info: applicationData.personalInfo,
        uploaded_documents: uploadedDocuments,
        application_data: {
          scheme_name: scheme.translations?.title || scheme.key,
          applied_at: new Date().toISOString(),
          steps_completed: totalSteps
        },
        submitted_at: new Date().toISOString()
      };

      console.log('Creating application record:', applicationRecord);

      const { data: applicationData, error: applicationError } = await supabase
        .from('scheme_applications')
        .insert(applicationRecord)
        .select()
        .single();

      if (applicationError) {
        console.error('Application creation error:', applicationError);
        throw new Error(`Failed to submit application: ${applicationError.message}`);
      }

      console.log('Application created successfully:', applicationData);

      toast.success('Application submitted successfully! You can track its status in your dashboard.');
      onClose();
      
      // Reset form
      setCurrentStep(1);
      setApplicationData({
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

    } catch (error) {
      console.error('Application submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application. Please try again.';
      toast.error(errorMessage);
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

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return validatePersonalInfo();
      case 2:
        return validateDocuments();
      default:
        return true;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Apply for {scheme.translations?.title || scheme.key}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
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
              Previous
            </Button>

            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !canProceedToNext()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
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
