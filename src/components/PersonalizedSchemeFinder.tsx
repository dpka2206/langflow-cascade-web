
import React, { useState } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import StepIndicator from './wizard/StepIndicator';
import GenderStep from './wizard/GenderStep';
import AgeStep from './wizard/AgeStep';
import OccupationStep from './wizard/OccupationStep';
import IncomeStep from './wizard/IncomeStep';
import CasteStep from './wizard/CasteStep';
import StateStep from './wizard/StateStep';

export interface WizardData {
  gender: string;
  age: string;
  occupation: string;
  income: string;
  caste: string;
  state: string;
}

const PersonalizedSchemeFinder = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    gender: '',
    age: '',
    occupation: '',
    income: '',
    caste: '',
    state: ''
  });

  const totalSteps = 6;

  const updateData = (field: keyof WizardData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const saveUserCriteria = async (criteriaData: WizardData) => {
    if (!user) {
      toast.error('Please login to save your preferences');
      navigate('/auth');
      return false;
    }

    try {
      // Check if user already has criteria saved
      const { data: existingCriteria } = await supabase
        .from('user_personalized_criteria')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingCriteria) {
        // Update existing criteria
        const { error } = await supabase
          .from('user_personalized_criteria')
          .update({
            gender: criteriaData.gender,
            age: criteriaData.age,
            occupation: criteriaData.occupation,
            income: criteriaData.income,
            caste: criteriaData.caste,
            state: criteriaData.state,
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new criteria
        const { error } = await supabase
          .from('user_personalized_criteria')
          .insert({
            user_id: user.id,
            gender: criteriaData.gender,
            age: criteriaData.age,
            occupation: criteriaData.occupation,
            income: criteriaData.income,
            caste: criteriaData.caste,
            state: criteriaData.state,
          });

        if (error) throw error;
      }

      return true;
    } catch (error) {
      console.error('Error saving user criteria:', error);
      toast.error('Failed to save your preferences');
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/auth');
      return;
    }

    setLoading(true);
    
    try {
      // Save user criteria to database
      const saved = await saveUserCriteria(data);
      
      if (saved) {
        toast.success('Your preferences have been saved!');
        
        // Navigate to schemes page with personalized results
        const params = new URLSearchParams({
          gender: data.gender,
          age: data.age,
          occupation: data.occupation,
          income: data.income,
          caste: data.caste,
          state: data.state,
          personalized: 'true'
        });
        navigate(`/schemes?${params.toString()}`);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return data.gender !== '';
      case 2: return data.age !== '';
      case 3: return data.occupation !== '';
      case 4: return data.income !== '';
      case 5: return data.caste !== '';
      case 6: return data.state !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <GenderStep value={data.gender} onChange={(value) => updateData('gender', value)} />;
      case 2:
        return <AgeStep value={data.age} onChange={(value) => updateData('age', value)} />;
      case 3:
        return <OccupationStep value={data.occupation} onChange={(value) => updateData('occupation', value)} />;
      case 4:
        return <IncomeStep value={data.income} onChange={(value) => updateData('income', value)} />;
      case 5:
        return <CasteStep value={data.caste} onChange={(value) => updateData('caste', value)} />;
      case 6:
        return <StateStep value={data.state} onChange={(value) => updateData('state', value)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-lavender-50 to-mint-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('wizard.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('wizard.subtitle')}
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                Please <Link to="/auth" className="text-yellow-900 underline font-semibold">login</Link> to save your preferences and get personalized recommendations.
              </p>
            </div>
          )}
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <Card className="mt-8 border-0 shadow-2xl backdrop-blur-sm bg-white/80">
          <CardContent className="p-8">
            <div className="min-h-[400px] flex flex-col justify-center">
              {renderStep()}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 1}
                className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.back')}
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : currentStep === totalSteps ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    {t('wizard.findSchemes')}
                  </>
                ) : (
                  <>
                    {t('common.next')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalizedSchemeFinder;
