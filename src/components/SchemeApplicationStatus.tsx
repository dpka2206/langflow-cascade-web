
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText, Calendar, User } from 'lucide-react';

interface SchemeApplication {
  id: string;
  scheme_name: string;
  status: string;
  submitted_at: string | null;
  estimated_approval_days?: number;
  application_number?: string;
  personal_info?: any;
  uploaded_documents?: any[];
  created_at: string;
}

interface SchemeApplicationStatusProps {
  applications: SchemeApplication[];
  loading?: boolean;
}

const SchemeApplicationStatus: React.FC<SchemeApplicationStatusProps> = ({ applications, loading }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'submitted':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'draft': 'secondary',
      'submitted': 'default',
      'under_review': 'outline',
      'approved': 'default',
      'rejected': 'destructive'
    } as const;

    const labels = {
      'draft': 'Draft',
      'submitted': 'Application Pending',
      'under_review': 'Under Review',
      'approved': 'Approved',
      'rejected': 'Rejected'
    };

    const variantKey = status as keyof typeof variants;
    const labelKey = status as keyof typeof labels;

    return (
      <Badge 
        variant={variants[variantKey] || 'secondary'}
        className={status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
      >
        {labels[labelKey] || status}
      </Badge>
    );
  };

  const getEstimatedTime = (status: string, submittedAt: string | null, estimatedDays?: number) => {
    if (status === 'approved' || status === 'rejected') return null;
    if (!submittedAt || !estimatedDays) return 'Processing time varies';

    const submittedDate = new Date(submittedAt);
    const estimatedCompletionDate = new Date(submittedDate);
    estimatedCompletionDate.setDate(submittedDate.getDate() + estimatedDays);
    
    const today = new Date();
    const daysRemaining = Math.ceil((estimatedCompletionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining > 0) {
      return `Expected completion in ${daysRemaining} days`;
    } else {
      return 'Processing may be delayed';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
          <p className="text-gray-600">
            You haven't applied for any schemes yet. Browse available schemes to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                  {application.scheme_name}
                </CardTitle>
                {application.application_number && (
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Application #: {application.application_number}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(application.status)}
                {getStatusBadge(application.status)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Applied:
                </span>
                <span className="font-medium">
                  {application.submitted_at 
                    ? formatDate(application.submitted_at)
                    : formatDate(application.created_at)
                  }
                </span>
              </div>

              {application.personal_info?.fullName && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Applicant:
                  </span>
                  <span className="font-medium">{application.personal_info.fullName}</span>
                </div>
              )}

              {application.uploaded_documents && application.uploaded_documents.length > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium">{application.uploaded_documents.length} uploaded</span>
                </div>
              )}
              
              {application.status !== 'draft' && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium">
                    {getEstimatedTime(application.status, application.submitted_at, application.estimated_approval_days)}
                  </span>
                </div>
              )}

              {application.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-800 font-medium text-sm">
                      Congratulations! Your application has been approved.
                    </span>
                  </div>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-red-800 font-medium text-sm">
                      Application was not approved. Please check requirements and reapply.
                    </span>
                  </div>
                </div>
              )}

              {application.status === 'under_review' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-yellow-800 font-medium text-sm">
                      Your application is currently under review. We'll notify you of any updates.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SchemeApplicationStatus;
