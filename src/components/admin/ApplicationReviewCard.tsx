
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Clock, FileText, User, Calendar, Eye } from 'lucide-react';
import { SchemeApplication, ApplicationReview } from '@/types/schemeApplication';

interface ApplicationReviewCardProps {
  application: SchemeApplication;
  onReview: (applicationId: string, review: ApplicationReview) => Promise<{ success: boolean; error?: string }>;
}

const ApplicationReviewCard: React.FC<ApplicationReviewCardProps> = ({ application, onReview }) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected' | 'under_review'>('under_review');
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      'submitted': { variant: 'default' as const, color: 'bg-blue-100 text-blue-800', label: 'Pending Review' },
      'under_review': { variant: 'outline' as const, color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' },
      'approved': { variant: 'default' as const, color: 'bg-green-100 text-green-800', label: 'Approved' },
      'rejected': { variant: 'destructive' as const, color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };

    const config = variants[status as keyof typeof variants] || variants.submitted;
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'under_review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <FileText className="h-4 w-4 text-blue-600" />;
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

  const handleReview = async () => {
    setIsReviewing(true);
    
    const review: ApplicationReview = {
      status: reviewStatus,
      review_notes: reviewNotes.trim() || undefined,
      rejection_reason: reviewStatus === 'rejected' ? rejectionReason.trim() || undefined : undefined
    };

    const result = await onReview(application.id, review);
    
    if (result.success) {
      setReviewNotes('');
      setRejectionReason('');
      setShowDetails(false);
    }
    
    setIsReviewing(false);
  };

  const canReview = ['submitted', 'under_review'].includes(application.status);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="space-y-3">
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
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 flex items-center gap-1">
              <User className="h-3 w-3" />
              Applicant:
            </span>
            <span className="font-medium">
              {application.personal_info?.fullName || 'Not provided'}
            </span>
          </div>
          
          <div className="flex justify-between">
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

          {application.uploaded_documents && application.uploaded_documents.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Documents:</span>
              <span className="font-medium">{application.uploaded_documents.length} uploaded</span>
            </div>
          )}

          {application.reviewed_at && (
            <div className="flex justify-between">
              <span className="text-gray-600">Reviewed:</span>
              <span className="font-medium">{formatDate(application.reviewed_at)}</span>
            </div>
          )}
        </div>

        {application.review_notes && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Review Notes:</p>
            <p className="text-sm text-gray-600">{application.review_notes}</p>
          </div>
        )}

        {application.rejection_reason && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm font-medium text-red-700 mb-1">Rejection Reason:</p>
            <p className="text-sm text-red-600">{application.rejection_reason}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Application Details - {application.scheme_name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Personal Information:</h4>
                  <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(application.personal_info, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Application Data:</h4>
                  <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
                    {JSON.stringify(application.application_data, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Uploaded Documents:</h4>
                  <p className="text-sm text-gray-600">
                    {application.uploaded_documents?.length || 0} documents uploaded
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {canReview && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  Review Application
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review Application</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Decision</label>
                    <Select value={reviewStatus} onValueChange={(value: any) => setReviewStatus(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="approved">Approve</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Review Notes</label>
                    <Textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add any notes about this review..."
                      rows={3}
                    />
                  </div>

                  {reviewStatus === 'rejected' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Rejection Reason</label>
                      <Textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Please provide a reason for rejection..."
                        rows={3}
                        required
                      />
                    </div>
                  )}

                  <Button 
                    onClick={handleReview} 
                    disabled={isReviewing || (reviewStatus === 'rejected' && !rejectionReason.trim())}
                    className="w-full"
                  >
                    {isReviewing ? 'Processing...' : 'Submit Review'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationReviewCard;
