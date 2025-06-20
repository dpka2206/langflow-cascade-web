
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ExternalLink, Clock, DollarSign, FileText, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface GovernmentService {
  id: string;
  service_name: string;
  service_code: string;
  description: string;
  category: string;
  department: string;
  service_url: string;
  icon_name: string;
  eligibility_criteria: string[];
  required_documents: string[];
  processing_time: string;
  fees: string;
  target_audience: string[];
  is_featured: boolean;
}

interface ServiceCategory {
  id: string;
  category_name: string;
  category_code: string;
  description: string;
  icon_name: string;
  display_order: number;
}

const ServicesPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [filteredServices, setFilteredServices] = useState<GovernmentService[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServicesAndCategories();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, selectedCategory]);

  const fetchServicesAndCategories = async () => {
    try {
      setLoading(true);
      
      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('government_services')
        .select('*')
        .eq('status', 'active')
        .order('priority_order', { ascending: true });

      if (servicesError) {
        console.error('Error fetching services:', servicesError);
        toast({
          title: "Error",
          description: "Failed to load services",
          variant: "destructive",
        });
      } else {
        setServices(servicesData || []);
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('service_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
      } else {
        setCategories(categoriesData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.service_name.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.department?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
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

  const featuredServices = services.filter(service => service.is_featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Services
          </h1>
          <p className="text-gray-600">
            Access various government services and applications online
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredServices.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => handleServiceClick(service)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg">{service.service_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
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
          </div>
        )}

        {/* Services by Category */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            {categories.slice(0, 9).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.category_name}
                className="text-xs"
              >
                {category.category_name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{service.service_name}</CardTitle>
                        <Badge variant="outline" className="mb-2">
                          {service.department}
                        </Badge>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {service.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">Processing Time:</span>
                        <span className="ml-1">{service.processing_time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">Fees:</span>
                        <span className="ml-1">{service.fees}</span>
                      </div>
                      
                      {service.target_audience && service.target_audience.length > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-purple-500" />
                          <span className="font-medium">For:</span>
                          <span className="ml-1">{service.target_audience.join(', ')}</span>
                        </div>
                      )}
                      
                      {service.required_documents && service.required_documents.length > 0 && (
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <FileText className="h-4 w-4 mr-2 text-orange-500" />
                            <span className="font-medium">Required Documents:</span>
                          </div>
                          <ul className="ml-6 list-disc list-inside text-xs">
                            {service.required_documents.slice(0, 3).map((doc, index) => (
                              <li key={index}>{doc}</li>
                            ))}
                            {service.required_documents.length > 3 && (
                              <li>+ {service.required_documents.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServicesPage;
