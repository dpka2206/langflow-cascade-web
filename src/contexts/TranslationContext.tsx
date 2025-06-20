
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
      title: 'GovSchemes',
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
    category: {
      agriculture: 'Agriculture',
      health: 'Healthcare',
      education: 'Education',
      housing: 'Housing',
      employment: 'Employment',
      social: 'Social Welfare'
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
      search: 'Search Schemes',
      searchPlaceholder: 'Search schemes by name or keywords...',
      filters: 'Smart Filters',
      clearFilters: 'Clear All Filters',
      ageRange: 'Age Group',
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
      allAges: 'All Ages',
      allCastes: 'All Categories',
      allGenders: 'All Genders',
      allIncomes: 'All Income Ranges',
      allStates: 'All States',
      allCategories: 'All Categories',
      years: 'years',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      general: 'General',
      sc: 'SC',
      st: 'ST',
      obc: 'OBC',
      telangana: 'Telangana',
      andhraPradesh: 'Andhra Pradesh',
      karnataka: 'Karnataka',
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
      title: 'ప్రభుత్వ పథకాలు',
      home: 'హోమ్',
      schemes: 'పథకాలను వెతకండి',
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
        placeholder: 'పేరు, ప్రయోజనాలు లేదా కీవర్డ్‌ల ద్వారా పథకాలను వెతకండి...',
        button: 'పథకాలను వెతకండి'
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
    category: {
      agriculture: 'వ్యవసాయం',
      health: 'ఆరోగ్య సంరక్షణ',
      education: 'విద్య',
      housing: 'గృహనిర్మాణం',
      employment: 'ఉపాధి',
      social: 'సామాజిక సంక్షేమం'
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
    },
    schemeFinder: {
      title: 'మీ పరిపూర్ణ పథకాన్ని కనుగొనండి',
      subtitle: 'మీ ప్రొఫైల్‌కు సరిపోయే పథకాలను కనుగొనడానికి మా అధునాతన ఫిల్టర్‌లను ఉపయోగించండి',
      search: 'పథకాలను వెతకండి',
      searchPlaceholder: 'పేరు లేదా కీవర్డ్‌ల ద్వారా పథకాలను వెతకండి...',
      filters: 'స్మార్ట్ ఫిల్టర్లు',
      clearFilters: 'అన్ని ఫిల్టర్లను క్లియర్ చేయండి',
      ageRange: 'వయస్సు గ్రూప్',
      caste: 'సామాజిక వర్గం',
      occupation: 'వృత్తి',
      gender: 'లింగం',
      incomeRange: 'ఆదాయ పరిధి',
      state: 'రాష్ట్రం',
      district: 'జిల్లా',
      category: 'పథక వర్గం',
      selectAge: 'వయస్సు గ్రూప్‌ను ఎంచుకోండి',
      selectCaste: 'వర్గాన్ని ఎంచుకోండి',
      selectOccupation: 'వృత్తిని ఎంచుకోండి',
      selectGender: 'లింగాన్ని ఎంచుకోండి',
      selectIncome: 'ఆదాయ పరిధిని ఎంచుకోండి',
      selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
      selectDistrict: 'జిల్లాను ఎంచుకోండి',
      selectCategory: 'వర్గాన్ని ఎంచుకోండి',
      allAges: 'అన్ని వయస్సులు',
      allCastes: 'అన్ని వర్గాలు',
      allGenders: 'అన్ని లింగాలు',
      allIncomes: 'అన్ని ఆదాయ పరిధులు',
      allStates: 'అన్ని రాష్ట్రాలు',
      allCategories: 'అన్ని వర్గాలు',
      years: 'సంవత్సరాలు',
      male: 'పురుషుడు',
      female: 'స్త్రీ',
      other: 'ఇతర',
      general: 'సాధారణ',
      sc: 'ఎస్సీ',
      st: 'ఎస్టీ',
      obc: 'ఓబీసీ',
      telangana: 'తెలంగాణ',
      andhraPradesh: 'ఆంధ్రప్రదేశ్',
      karnataka: 'కర్ణాటక',
      knowMore: 'మరింత తెలుసుకోండి',
      noResults: 'పథకాలు కనుగొనబడలేదు',
      noResultsSearch: 'మీ శోధన పదాలు లేదా ఫిల్టర్‌లను సర్దుబాటు చేయండి',
      noResultsFilter: 'మరిన్ని ఫలితాలను చూడటానికి మీ ఫిల్టర్‌లను సర్దుబాటు చేయండి',
      resultsFound: 'పథకాలు కనుగొనబడ్డాయి',
      noDescription: 'వర్ణన అందుబాటులో లేదు'
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
