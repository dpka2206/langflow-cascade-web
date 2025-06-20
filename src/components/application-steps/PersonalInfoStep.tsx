
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  occupation: string;
  income: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          {t('application.personalInfo')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('application.fullName')} *
            </Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder={t('application.enterFullName')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t('application.email')} *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t('application.enterEmail')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {t('application.phone')} *
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder={t('application.enterPhone')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('application.dateOfBirth')} *
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {t('application.occupation')} *
            </Label>
            <Input
              id="occupation"
              value={data.occupation}
              onChange={(e) => handleChange('occupation', e.target.value)}
              placeholder={t('application.enterOccupation')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="income" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t('application.income')} *
            </Label>
            <Input
              id="income"
              value={data.income}
              onChange={(e) => handleChange('income', e.target.value)}
              placeholder={t('application.enterIncome')}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t('application.address')} *
          </Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder={t('application.enterAddress')}
            rows={3}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoStep;
