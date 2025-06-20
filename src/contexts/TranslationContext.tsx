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
    common: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      apply: 'Apply',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    },
    nav: {
      home: 'Home',
      schemes: 'Find Schemes',
      dashboard: 'Dashboard',
      admin: 'Admin',
      profile: 'Profile'
    },
    hero: {
      title: 'Find Government Schemes',
      subtitle: 'Discover and apply for government schemes that match your profile',
      cta: 'Explore Schemes'
    },
    categories: {
      title: 'Browse by Category',
      subtitle: 'Find schemes in your area of interest'
    },
    category: {
      health: 'Health',
      education: 'Education',
      employment: 'Employment',
      agriculture: 'Agriculture',
      housing: 'Housing',
      social: 'Social Welfare'
    },
    schemeFinder: {
      title: 'Find Schemes',
      subtitle: 'Use filters to find schemes that match your profile',
      searchPlaceholder: 'Search schemes by name or keywords...',
      filters: 'Filters',
      clearFilters: 'Clear All Filters',
      age: 'Age Group',
      caste: 'Caste',
      occupation: 'Occupation',
      gender: 'Gender',
      incomeRange: 'Income Range',
      state: 'State',
      district: 'District',
      category: 'Category',
      selectAge: 'Select Age Group',
      selectCaste: 'Select Caste',
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
      eligibility: 'Eligibility',
      documents: 'Documents',
      howToApply: 'How to Apply',
      videoComingSoon: 'Video coming soon',
      description: 'Description',
      noDescription: 'No description available',
      benefits: 'Benefits',
      eligibilityCriteria: 'Eligibility Criteria',
      noEligibility: 'No eligibility criteria available',
      requiredDocuments: 'Required Documents',
      noDocuments: 'No documents required',
      applicationProcess: 'Application Process',
      step1: 'Check your eligibility criteria',
      step2: 'Gather all required documents',
      step3: 'Submit your complete application',
      applyOnline: 'Apply Online',
      downloadForm: 'Download Form'
    },
    application: {
      title: 'Apply for Scheme',
      step: 'Step',
      of: 'of',
      complete: 'Complete',
      personalInfo: 'Personal Information',
      documentUpload: 'Document Upload',
      applicationSummary: 'Application Summary',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Address',
      dateOfBirth: 'Date of Birth',
      occupation: 'Occupation',
      income: 'Annual Income',
      enterFullName: 'Enter your full name',
      enterEmail: 'Enter your email address',
      enterPhone: 'Enter your phone number',
      enterAddress: 'Enter your complete address',
      enterOccupation: 'Enter your occupation',
      enterIncome: 'Enter your annual income',
      documentsUploaded: 'Documents Uploaded',
      required: 'Required',
      dragDropFiles: 'Drag & drop files here',
      orClickToSelect: 'or click to select files',
      supportedFormats: 'Supported formats',
      fileTooLarge: 'File size must be less than 5MB',
      invalidFileType: 'Please upload PDF, JPG, or PNG files only',
      noDocumentsRequired: 'No documents are required for this scheme',
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
      welcome: 'Welcome to your Dashboard',
      subtitle: 'Manage your schemes and applications',
      mySchemes: 'My Schemes',
      schemesDescription: 'View schemes you have applied for',
      applications: 'Applications',
      applicationsDescription: 'Track your application status',
      profile: 'Profile',
      profileDescription: 'Update your personal information',
      viewSchemes: 'View Schemes',
      viewApplications: 'View Applications',
      editProfile: 'Edit Profile'
    }
  },
  hi: {
    common: {
      home: 'होम',
      about: 'के बारे में',
      contact: 'संपर्क',
      login: 'लॉग इन',
      logout: 'लॉग आउट',
      register: 'रजिस्टर',
      apply: 'आवेदन करें',
      next: 'अगला',
      previous: 'पिछला',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      save: 'सेव करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      search: 'खोजें',
      filter: 'फिल्टर',
      clear: 'साफ करें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता'
    },
    nav: {
      home: 'होम',
      schemes: 'योजनाएं खोजें',
      dashboard: 'डैशबोर्ड',
      admin: 'एडमिन',
      profile: 'प्रोफ़ाइल'
    },
    hero: {
      title: 'सरकारी योजनाएं खोजें',
      subtitle: 'अपनी प्रोफ़ाइल से मेल खाती सरकारी योजनाओं की खोज करें और आवेदन करें',
      cta: 'योजनाओं का अन्वेषण करें'
    },
    categories: {
      title: 'श्रेणी के अनुसार ब्राउज़ करें',
      subtitle: 'अपनी रुचि के क्षेत्र में योजनाएं खोजें'
    },
    category: {
      health: 'स्वास्थ्य',
      education: 'शिक्षा',
      employment: 'रोजगार',
      agriculture: 'कृषि',
      housing: 'आवास',
      social: 'सामाजिक कल्याण'
    },
    schemeFinder: {
      title: 'योजनाएं खोजें',
      subtitle: 'अपनी प्रोफ़ाइल से मेल खाती योजनाओं को खोजने के लिए फिल्टर का उपयोग करें',
      searchPlaceholder: 'नाम या कीवर्ड द्वारा योजनाएं खोजें...',
      filters: 'फिल्टर',
      clearFilters: 'सभी फिल्टर साफ़ करें',
      age: 'आयु समूह',
      caste: 'जाति',
      occupation: 'व्यवसाय',
      gender: 'लिंग',
      incomeRange: 'आय सीमा',
      state: 'राज्य',
      district: 'जिला',
      category: 'श्रेणी',
      selectAge: 'आयु समूह चुनें',
      selectCaste: 'जाति चुनें',
      selectOccupation: 'व्यवसाय चुनें',
      selectGender: 'लिंग चुनें',
      selectIncome: 'आय सीमा चुनें',
      selectState: 'राज्य चुनें',
      selectDistrict: 'जिला चुनें',
      selectCategory: 'श्रेणी चुनें',
      knowMore: 'और जानें',
      noResults: 'कोई योजना नहीं मिली',
      noResultsSearch: 'अपने खोज शब्दों या फिल्टर को समायोजित करने का प्रयास करें',
      noResultsFilter: 'अधिक परिणाम देखने के लिए अपने फिल्टर को समायोजित करने का प्रयास करें',
      resultsFound: 'योजनाएं मिलीं',
      noDescription: 'कोई विवरण उपलब्ध नहीं'
    },
    schemeDetail: {
      overview: 'अवलोकन',
      eligibility: 'पात्रता',
      documents: 'दस्तावेज',
      howToApply: 'आवेदन कैसे करें',
      videoComingSoon: 'वीडियो जल्द ही आ रहा है',
      description: 'विवरण',
      noDescription: 'कोई विवरण उपलब्ध नहीं',
      benefits: 'लाभ',
      eligibilityCriteria: 'पात्रता मापदंड',
      noEligibility: 'कोई पात्रता मापदंड उपलब्ध नहीं',
      requiredDocuments: 'आवश्यक दस्तावेज',
      noDocuments: 'कोई दस्तावेज आवश्यक नहीं',
      applicationProcess: 'आवेदन प्रक्रिया',
      step1: 'अपनी पात्रता मापदंड की जांच करें',
      step2: 'सभी आवश्यक दस्तावेज एकत्र करें',
      step3: 'अपना पूरा आवेदन जमा करें',
      applyOnline: 'ऑनलाइन आवेदन करें',
      downloadForm: 'फॉर्म डाउनलोड करें'
    },
    application: {
      title: 'योजना के लिए आवेदन करें',
      step: 'चरण',
      of: 'का',
      complete: 'पूर्ण',
      personalInfo: 'व्यक्तिगत जानकारी',
      documentUpload: 'दस्तावेज अपलोड',
      applicationSummary: 'आवेदन सारांश',
      fullName: 'पूरा नाम',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      address: 'पता',
      dateOfBirth: 'जन्म तिथि',
      occupation: 'व्यवसाय',
      income: 'वार्षिक आय',
      enterFullName: 'अपना पूरा नाम दर्ज करें',
      enterEmail: 'अपना ईमेल पता दर्ज करें',
      enterPhone: 'अपना फोन नंबर दर्ज करें',
      enterAddress: 'अपना पूरा पता दर्ज करें',
      enterOccupation: 'अपना व्यवसाय दर्ज करें',
      enterIncome: 'अपनी वार्षिक आय दर्ज करें',
      documentsUploaded: 'दस्तावेज अपलोड किए गए',
      required: 'आवश्यक',
      dragDropFiles: 'फाइलों को यहां खींचें और छोड़ें',
      orClickToSelect: 'या फाइलों का चयन करने के लिए क्लिक करें',
      supportedFormats: 'समर्थित प्रारूप',
      fileTooLarge: 'फाइल का आकार 5MB से कम होना चाहिए',
      invalidFileType: 'कृपया केवल PDF, JPG, या PNG फाइलें अपलोड करें',
      noDocumentsRequired: 'इस योजना के लिए कोई दस्तावेज आवश्यक नहीं है',
      documentsStatus: 'दस्तावेज स्थिति',
      totalDocuments: 'कुल दस्तावेज',
      uploaded: 'अपलोड किया गया',
      pending: 'लंबित',
      invalid: 'अमान्य',
      pendingDocuments: 'आवश्यक दस्तावेज लंबित',
      pleaseUploadRequired: 'कृपया आगे बढ़ने के लिए सभी आवश्यक दस्तावेज अपलोड करें',
      readyToSubmit: 'जमा करने के लिए तैयार',
      reviewAndSubmit: 'कृपया अपनी जानकारी की समीक्षा करें और अपना आवेदन जमा करें',
      submit: 'आवेदन जमा करें',
      submitting: 'जमा कर रहे हैं...',
      submitted: 'आवेदन सफलतापूर्वक जमा किया गया!',
      submitError: 'आवेदन जमा करने में विफल। कृपया पुनः प्रयास करें।',
      loginRequired: 'आवेदन जमा करने के लिए कृपया लॉगिन करें'
    },
    dashboard: {
      welcome: 'आपके डैशबोर्ड में आपका स्वागत है',
      subtitle: 'अपनी योजनाओं और आवेदनों का प्रबंधन करें',
      mySchemes: 'मेरी योजनाएं',
      schemesDescription: 'उन योजनाओं को देखें जिनके लिए आपने आवेदन किया है',
      applications: 'आवेदन',
      applicationsDescription: 'अपनी आवेदन स्थिति को ट्रैक करें',
      profile: 'प्रोफ़ाइल',
      profileDescription: 'अपनी व्यक्तिगत जानकारी अपडेट करें',
      viewSchemes: 'योजनाएं देखें',
      viewApplications: 'आवेदन देखें',
      editProfile: 'प्रोफ़ाइल संपादित करें'
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
