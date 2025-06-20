
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SchemeScraper = () => {
  const { t } = useTranslation();
  const [isScrapingCentral, setIsScrapingCentral] = useState(false);
  const [scrapingStatus, setScrapingStatus] = useState<{
    central: 'idle' | 'loading' | 'success' | 'error';
  }>({
    central: 'idle'
  });

  const handleScrapeCentral = async () => {
    try {
      setIsScrapingCentral(true);
      setScrapingStatus(prev => ({ ...prev, central: 'loading' }));
      
      console.log('Starting central scheme scraping...');
      
      const { data, error } = await supabase.functions.invoke('scrape-myscheme', {
        body: { action: 'scrape_central' }
      });

      if (error) {
        throw error;
      }

      console.log('Scraping completed:', data);
      
      setScrapingStatus(prev => ({ ...prev, central: 'success' }));
      toast.success(`Successfully scraped ${data.schemes || 0} central government schemes!`);
      
    } catch (error) {
      console.error('Error scraping central schemes:', error);
      setScrapingStatus(prev => ({ ...prev, central: 'error' }));
      toast.error('Failed to scrape central schemes. Please try again.');
    } finally {
      setIsScrapingCentral(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'loading':
        return 'Scraping in progress...';
      case 'success':
        return 'Successfully scraped';
      case 'error':
        return 'Scraping failed';
      default:
        return 'Ready to scrape';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('admin.schemeScraper')}
        </h2>
        <p className="text-gray-600">
          Scrape and import government schemes from official sources
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Central Government Schemes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Scrape schemes from myscheme.gov and import them into the database.
            This will fetch all central government schemes with their details,
            eligibility criteria, and required documents.
          </p>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              {getStatusIcon(scrapingStatus.central)}
              <span className="text-sm font-medium">
                {getStatusText(scrapingStatus.central)}
              </span>
            </div>
            
            <Button
              onClick={handleScrapeCentral}
              disabled={isScrapingCentral}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isScrapingCentral ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Scrape Central Schemes
                </>
              )}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            <p>• This process may take several minutes to complete</p>
            <p>• Existing schemes will be updated if found</p>
            <p>• New schemes will be added to the database</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchemeScraper;
