
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface GovernmentService {
  id: string;
  service_name: string;
  description: string;
  category: string;
  department: string;
  service_url: string;
  processing_time: string;
  fees: string;
  is_featured: boolean;
}

const ServicesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [featuredServices, setFeaturedServices] = useState<GovernmentService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedServices();
  }, []);

  const fetchFeaturedServices = async () => {
    try {
      const { data, error } = await supabase
        .from('government_services')
        .select('*')
        .eq('status', 'active')
        .eq('is_featured', true)
        .order('priority_order', { ascending: true })
        .limit(6);

      if (error) {
        console.error('Error fetching featured services:', error);
      } else {
        setFeaturedServices(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = async (service: GovernmentService) => {
    // Track service usage
    try {
      await supabase
        .from('service_usage_stats')
        .insert({
          service_id: service.id,
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error tracking service usage:', error);
    }

    // Open service URL in new tab
    window.open(service.service_url, '_blank');
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Government Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access essential government services online - from document applications to tax filing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
              onClick={() => handleServiceClick(service)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {service.category}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <CardTitle className="text-lg">{service.service_name}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {service.department}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.processing_time}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {service.fees}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate('/services')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
