
import React, { createContext, useContext, useState } from 'react';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

const translations = {
  en: {
    nav: {
      title: 'SchemeFinder',
      home: 'Home',
      schemes: 'Find Schemes',
      about: 'About Us',
      contact: 'Contact',
      dashboard: 'Dashboard',
      admin: 'Admin Panel',
      profile: 'My Profile',
      login: 'Sign In',
      signout: 'Sign Out'
    },
    hero: {
      title: 'Discover Government Schemes Made Simple',
      subtitle: 'Find and apply for government benefits tailored to your needs. Navigate through hundreds of schemes with our intelligent matching system.',
      search: {
        placeholder: 'Search schemes by name, benefits, or keywords...',
        button: 'Search Schemes'
      }
    },
    categories: {
      title: 'Explore by Category',
      subtitle: 'Find schemes organized by different areas of support',
      financial: 'Financial Assistance',
      education: 'Education & Skills',
      healthcare: 'Healthcare & Wellness',
      agriculture: 'Agriculture & Farming',
      employment: 'Employment & Jobs',
      housing: 'Housing & Infrastructure'
    },
    schemes: {
      title: 'Featured Government Schemes',
      subtitle: 'Discover popular schemes that might benefit you',
      viewAll: 'View All Schemes',
      learnMore: 'Learn More'
    },
    common: {
      apply: 'Apply Now',
      learnMore: 'Learn More',
      eligibility: 'Eligibility',
      benefit: 'Benefits',
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success!',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      submit: 'Submit',
      cancel: 'Cancel',
      next: 'Next',
      previous: 'Previous'
    },
    schemeFinder: {
      title: 'Find Your Perfect Scheme',
      subtitle: 'Use our advanced filters to discover schemes that match your profile',
      searchPlaceholder: 'Search schemes by name or keywords...',
      filters: 'Smart Filters',
      clearFilters: 'Clear All Filters',
      age: 'Age Group',
      caste: 'Social Category',
      occupation: 'Occupation',
      gender: 'Gender',
      incomeRange: 'Income Range',
      state: 'State',
      district: 'District',
      category: 'Scheme Category',
      selectAge: 'Select Age Group',
      selectCaste: 'Select Category',
      selectOccupation: 'Select Occupation',
      selectGender: 'Select Gender',
      selectIncome: 'Select Income Range',
      selectState: 'Select State',
      selectDistrict: 'Select District',
      selectCategory: 'Select Category',
      knowMore: 'Know More',
      noResults: 'No schemes found',
      noResultsSearch: 'Try adjusting your search terms or filters',
      noResultsFilter: 'Try adjusting your filters to see more results',
      resultsFound: 'schemes found',
      noDescription: 'No description available'
    },
    schemeDetail: {
      overview: 'Overview',
      eligibility: 'Eligibility Criteria',
      documents: 'Required Documents',
      howToApply: 'Application Process',
      videoComingSoon: 'Video tutorial coming soon',
      description: 'Scheme Description',
      noDescription: 'No description available',
      benefits: 'Key Benefits',
      eligibilityCriteria: 'Who Can Apply',
      noEligibility: 'No eligibility criteria specified',
      requiredDocuments: 'Documents Needed',
      noDocuments: 'No specific documents required',
      applicationProcess: 'How to Apply',
      step1: 'Verify your eligibility requirements',
      step2: 'Collect all necessary documents',
      step3: 'Complete and submit your application',
      applyOnline: 'Apply Online',
      downloadForm: 'Download Application Form'
    },
    application: {
      title: 'Apply for Government Scheme',
      step: 'Step',
      of: 'of',
      complete: 'Complete',
      personalInfo: 'Personal Information',
      documentUpload: 'Document Upload',
      applicationSummary: 'Application Review',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Complete Address',
      dateOfBirth: 'Date of Birth',
      occupation: 'Current Occupation',
      income: 'Annual Income',
      enterFullName: 'Enter your full legal name',
      enterEmail: 'Enter your email address',
      enterPhone: 'Enter your phone number',
      enterAddress: 'Enter your complete address',
      enterOccupation: 'Enter your occupation',
      enterIncome: 'Enter your annual income',
      documentsUploaded: 'Documents Uploaded',
      required: 'Required',
      dragDropFiles: 'Drag & drop files here',
      orClickToSelect: 'or click to select files',
      supportedFormats: 'Supported formats: PDF, JPG, PNG',
      fileTooLarge: 'File size must be less than 5MB',
      invalidFileType: 'Please upload PDF, JPG, or PNG files only',
      noDocumentsRequired: 'No documents required for this scheme',
      documentsStatus: 'Documents Status',
      totalDocuments: 'Total Documents',
      uploaded: 'Uploaded',
      pending: 'Pending',
      invalid: 'Invalid',
      pendingDocuments: 'Pending Required Documents',
      pleaseUploadRequired: 'Please upload all required documents to proceed',
      readyToSubmit: 'Ready to Submit',
      reviewAndSubmit: 'Please review your information and submit your application',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      submitted: 'Application submitted successfully!',
      submitError: 'Failed to submit application. Please try again.',
      loginRequired: 'Please login to submit an application'
    },
    dashboard: {
      welcome: 'Welcome to Your Dashboard',
      subtitle: 'Manage your schemes and track applications',
      mySchemes: 'My Applied Schemes',
      schemesDescription: 'View schemes you have applied for',
      applications: 'Application Status',
      applicationsDescription: 'Track your application progress',
      profile: 'Profile Settings',
      profileDescription: 'Update your personal information',
      viewSchemes: 'View Schemes',
      viewApplications: 'View Applications',
      editProfile: 'Edit Profile'
    },
    admin: {
      title: 'Admin Dashboard'
    }
  },
  te: {
    nav: {
      title: 'స్కీమ్‌ఫైండర్',
      home: 'హోమ్',
      schemes: 'స్కీమ్‌లు వెతకండి',
      about: 'మా గురించి',
      contact: 'సంప్రదించండి',
      dashboard: 'డాష్‌బోర్డ్',
      admin: 'అడ్మిన్ ప్యానెల్',
      profile: 'నా ప్రొఫైల్',
      login: 'సైన్ ఇన్',
      signout: 'సైన్ అవుట్'
    },
    hero: {
      title: 'ప్రభుత్వ పథకాలను సరళంగా కనుగొనండి',
      subtitle: 'మీ అవసరాలకు అనుకూలమైన ప్రభుత్వ ప్రయోజనాలను కనుగొని దరఖాస్తు చేసుకోండి. మా తెలివైన మ్యాచింగ్ సిస్టమ్‌తో వందల పథకాలను నావిగేట్ చేయండి.',
      search: {
        placeholder: 'పేరు, ప్రయోజనాలు లేదా కీవర్డ్‌ల ద్వారా స్కీమ్‌లను వెతకండి...',
        button: 'స్కీమ్‌లను వెతకండి'
      }
    },
    categories: {
      title: 'వర్గం ద్వారా అన్వేషించండి',
      subtitle: 'వివిధ మద్దతు రంగాలలో నిర్వహించబడిన పథకాలను కనుగొనండి',
      financial: 'ఆర్థిక సహాయం',
      education: 'విద్య & నైపుణ్యాలు',
      healthcare: 'ఆరోగ్య సంరక్షణ & సంక్షేమం',
      agriculture: 'వ్యవసాయం & వ్యవసాయం',
      employment: 'ఉపాధి & ఉద్యోగాలు',
      housing: 'గృహనిర్మాణం & మౌలిక సదుపాయాలు'
    },
    schemes: {
      title: 'ప్రత్యేక ప్రభుత్వ పథకాలు',
      subtitle: 'మీకు ప్రయోజనకరమైన ప్రసిద్ధ పథకాలను కనుగొనండి',
      viewAll: 'అన్ని పథకాలను చూడండి',
      learnMore: 'మరింత తెలుసుకోండి'
    },
    common: {
      apply: 'ఇప్పుడే దరఖాస్తు చేసుకోండి',
      learnMore: 'మరింత తెలుసుకోండి',
      eligibility: 'అర్హత',
      benefit: 'ప్రయోజనాలు',
      loading: 'లోడ్ చేస్తోంది...',
      error: 'ఏదో తప్పు జరిగింది',
      success: 'విజయం!',
      search: 'వెతకండి',
      filter: 'ఫిల్టర్',
      clear: 'క్లియర్',
      submit: 'సమర్పించండి',
      cancel: 'రద్దు చేయండి',
      next: 'తరువాత',
      previous: 'మునుపటి'
    }
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
