
import React, { useCallback } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Upload, CheckCircle, XCircle, AlertCircle, Trash2 } from 'lucide-react';
import { DocumentStatus } from '../SchemeApplicationForm';

interface DocumentUploadStepProps {
  documents: DocumentStatus[];
  onChange: (documents: DocumentStatus[]) => void;
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({ documents, onChange }) => {
  const { t } = useTranslation();

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxSize) {
      return { valid: false, error: t('application.fileTooLarge') };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: t('application.invalidFileType') };
    }

    return { valid: true };
  };

  const handleFileUpload = (index: number, file: File) => {
    const validation = validateFile(file);
    const updatedDocuments = [...documents];
    
    if (validation.valid) {
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        file,
        uploaded: true,
        status: 'uploaded',
        error: undefined
      };
    } else {
      updatedDocuments[index] = {
        ...updatedDocuments[index],
        file: undefined,
        uploaded: false,
        status: 'invalid',
        error: validation.error
      };
    }

    onChange(updatedDocuments);
  };

  const handleFileRemove = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      file: undefined,
      uploaded: false,
      status: 'pending',
      error: undefined
    };
    onChange(updatedDocuments);
  };

  const handleDrop = useCallback((index: number, e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(index, files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const getStatusIcon = (status: DocumentStatus['status']) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'invalid':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: DocumentStatus['status']) => {
    switch (status) {
      case 'uploaded':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'invalid':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const uploadedCount = documents.filter(doc => doc.status === 'uploaded').length;
  const totalCount = documents.length;
  const progressPercentage = totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            {t('application.documentUpload')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {t('application.documentsUploaded')}: {uploadedCount}/{totalCount}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% {t('application.complete')}
              </span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <Card key={index} className={`border-2 ${getStatusColor(doc.status)}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    {doc.required && (
                      <span className="text-sm text-red-600">* {t('application.required')}</span>
                    )}
                  </div>
                </div>
                
                {doc.file && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFileRemove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {doc.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{doc.error}</p>
                </div>
              )}

              {doc.file ? (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{doc.file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                  onDrop={(e) => handleDrop(index, e)}
                  onDragOver={handleDragOver}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.jpg,.jpeg,.png';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleFileUpload(index, file);
                    };
                    input.click();
                  }}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {t('application.dragDropFiles')}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('application.orClickToSelect')}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t('application.supportedFormats')}: PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{t('application.noDocumentsRequired')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUploadStep;
