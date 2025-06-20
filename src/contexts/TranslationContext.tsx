import React, { createContext, useContext } from 'react';

interface TranslationContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
}

const TranslationContext = createContext<TranslationContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>('en');

  const translations = {
    en: {
      common: {
        apply: 'Apply Now',
        learnMore: 'Learn More',
        eligibility: 'Eligibility',
        benefit: 'Benefit',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        submit: 'Submit',
        step: 'Step',
        of: 'of',
        complete: 'Complete',
      },
      navbar: {
        schemeFinder: 'Scheme Finder',
        personalizedSchemeFinder: 'Personalized Scheme Finder',
        aboutUs: 'About Us',
        contact: 'Contact',
        language: 'Language',
      },
      schemeFinder: {
        title: 'Find Your Perfect Scheme',
        subtitle: 'Discover government schemes tailored to your needs',
        personalizedResults: 'Your Personalized Schemes',
        personalizedSubtitle: 'Based on your profile, here are the schemes that match your eligibility',
        centralSchemes: 'Central Schemes',
        stateSchemes: 'State Schemes',
        allSchemes: 'All Schemes',
        central: 'Central',
        state: 'State',
        filters: 'Filters',
        searchPlaceholder: 'Search schemes...',
        noResults: 'No schemes found',
        noResultsSearch: 'Try adjusting your search terms',
        noResultsFilter: 'Try changing your filters',
        resultsFound: 'schemes found',
        knowMore: 'Know More',
        noDescription: 'No description available'
      },
      category: {
        health: 'Health',
        employment: 'Employment',
        agriculture: 'Agriculture',
        education: 'Education',
        housing: 'Housing',
        social: 'Social Welfare',
      },
      wizard: {
        title: 'Personalized Scheme Finder',
        subtitle: 'Answer a few questions to find schemes tailored for you.',
        gender: 'What is your gender?',
        age: 'What is your age group?',
        occupation: 'What is your occupation?',
        income: 'What is your income range?',
        caste: 'What is your caste?',
        state: 'Which state do you belong to?',
        findSchemes: 'Find Schemes',
      },
      genderOptions: {
        male: 'Male',
        female: 'Female',
        other: 'Other',
      },
      ageOptions: {
        '18-25': '18-25 years',
        '26-35': '26-35 years',
        '36-45': '36-45 years',
        '46+': '46 years and above',
      },
      occupationOptions: {
        student: 'Student',
        employed: 'Employed',
        selfEmployed: 'Self-Employed',
        unemployed: 'Unemployed',
        retired: 'Retired',
      },
      incomeOptions: {
        '0-100000': '₹0 - ₹1,00,000',
        '100001-300000': '₹1,00,001 - ₹3,00,000',
        '300001-500000': '₹3,00,001 - ₹5,00,000',
        '500000+': '₹5,00,000+',
      },
      casteOptions: {
        general: 'General',
        sc: 'Scheduled Caste (SC)',
        st: 'Scheduled Tribe (ST)',
        obc: 'Other Backward Classes (OBC)',
      },
      stateOptions: {
        ap: 'Andhra Pradesh',
        ts: 'Telangana',
        ka: 'Karnataka',
        tn: 'Tamil Nadu',
        kl: 'Kerala',
      },
      schemeDetail: {
        overview: 'Overview',
        eligibility: 'Eligibility',
        documents: 'Documents Required',
        howToApply: 'How to Apply',
        videoComingSoon: 'Video explanation coming soon',
        description: 'Description',
        noDescription: 'No description available',
        benefits: 'Benefits & Features',
        eligibilityCriteria: 'Eligibility Criteria',
        noEligibility: 'No eligibility criteria specified',
        requiredDocuments: 'Required Documents',
        noDocuments: 'No document requirements specified',
        applicationProcess: 'Application Process',
        step1: 'Review eligibility criteria and gather required documents',
        step2: 'Fill out the application form with accurate information',
        step3: 'Submit your application and track its progress',
        applyOnline: 'Apply Online',
        applyNow: 'Apply Now',
        downloadForm: 'Download Form'
      },
      application: {
        title: 'Scheme Application Form',
        step: 'Step',
        of: 'of',
        complete: 'Complete',
        personalInfo: 'Personal Information',
        documents: 'Documents',
        summary: 'Summary',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        dateOfBirth: 'Date of Birth',
        occupation: 'Occupation',
        income: 'Income',
        upload: 'Upload',
        uploading: 'Uploading...',
        invalidFile: 'Invalid file type',
        loginRequired: 'You must be logged in to apply for this scheme.',
        submitting: 'Submitting...',
        submitted: 'Application submitted successfully!',
        submitError: 'There was an error submitting your application. Please try again.',
      }
    },
    te: {
      common: {
        apply: 'ఇప్పుడే దరఖాస్తు చేయండి',
        learnMore: 'మరింత తెలుసుకోండి',
        eligibility: 'అర్హత',
        benefit: 'ప్రయోజనం',
        back: 'వెనుకకు',
        next: 'తరువాత',
        previous: 'మునుపటి',
        submit: 'సమర్పించండి',
        step: 'దశ',
        of: 'లో',
        complete: 'పూర్తి',
      },
      navbar: {
        schemeFinder: 'పథకం ఫైండర్',
        personalizedSchemeFinder: 'వ్యక్తిగతీకరించిన పథకం ఫైండర్',
        aboutUs: 'మా గురించి',
        contact: 'సంప్రదించండి',
        language: 'భాష',
      },
      schemeFinder: {
        title: 'మీకు సరిపోయే పథకాన్ని కనుగొనండి',
        subtitle: 'మీ అవసరాలకు అనుకూలంగా ప్రభుత్వ పథకాలను కనుగొనండి',
        personalizedResults: 'మీ వ్యక్తిగత పథకాలు',
        personalizedSubtitle: 'మీ ప్రొఫైల్ ఆధారంగా, మీ అర్హతకు సరిపోయే పథకాలు ఇవి',
        centralSchemes: 'కేంద్ర పథకాలు',
        stateSchemes: 'రాష్ట్ర్య పథకాలు',
        allSchemes: 'అన్ని పథకాలు',
        central: 'కేంద్రం',
        state: 'రాష్ట్రం',
        filters: 'ఫిల్టర్లు',
        searchPlaceholder: 'పథకాలను వెతకండి...',
        noResults: 'పథకాలు దొరకలేదు',
        noResultsSearch: 'మీ వెతుకుట పదాలను సర్దుబాటు చేయండి',
        noResultsFilter: 'మీ ఫిల్టర్లను మార్చండి',
        resultsFound: 'పథకాలు దొరికాయి',
        knowMore: 'మరిన్ని తెలుసుకోండి',
        noDescription: 'వివరణ అందుబాటులో లేదు'
      },
      category: {
        health: 'ఆరోగ్యం',
        employment: 'ఉద్యోగం',
        agriculture: 'వ్యవసాయం',
        education: 'విద్య',
        housing: 'గృహ',
        social: 'సాంఘిక సంక్షేమం',
      },
      wizard: {
        title: 'వ్యక్తిగతీకరించిన పథకం ఫైండర్',
        subtitle: 'మీ కోసం రూపొందించిన పథకాలను కనుగొనడానికి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి.',
        gender: 'మీ లింగం ఏమిటి?',
        age: 'మీ వయస్సు ఎంత?',
        occupation: 'మీ వృత్తి ఏమిటి?',
        income: 'మీ ఆదాయ పరిధి ఎంత?',
        caste: 'మీ కులం ఏమిటి?',
        state: 'మీరు ఏ రాష్ట్రానికి చెందినవారు?',
        findSchemes: 'పథకాలను కనుగొనండి',
      },
      genderOptions: {
        male: 'పురుషుడు',
        female: 'స్త్రీ',
        other: 'ఇతర',
      },
      ageOptions: {
        '18-25': '18-25 సంవత్సరాలు',
        '26-35': '26-35 సంవత్సరాలు',
        '36-45': '36-45 సంవత్సరాలు',
        '46+': '46 సంవత్సరాలు మరియు పైన',
      },
      occupationOptions: {
        student: 'విద్యార్థి',
        employed: 'ఉద్యోగం',
        selfEmployed: 'స్వయం ఉపాధి',
        unemployed: 'నిరుద్యోగి',
        retired: 'విరమణ',
      },
      incomeOptions: {
        '0-100000': '₹0 - ₹1,00,000',
        '100001-300000': '₹1,00,001 - ₹3,00,000',
        '300001-500000': '₹3,00,001 - ₹5,00,000',
        '500000+': '₹5,00,000+',
      },
      casteOptions: {
        general: 'సాధారణ',
        sc: 'షెడ్యూల్డ్ కులం (SC)',
        st: 'షెడ్యూల్డ్ తెగ (ST)',
        obc: 'ఇతర వెనుకబడిన తరగతులు (OBC)',
      },
      stateOptions: {
        ap: 'ఆంధ్రప్రదేశ్',
        ts: 'తెలంగాణ',
        ka: 'కర్ణాటక',
        tn: 'తమిళనాడు',
        kl: 'కేరళ',
      },
      schemeDetail: {
        overview: 'అవలోకనం',
        eligibility: 'అర్హత',
        documents: 'అవసరమైన పత్రాలు',
        howToApply: 'దరఖాస్తు ఎలా చేయాలి',
        videoComingSoon: 'వీడియో వివరణ త్వరలో',
        description: 'వివరణ',
        noDescription: 'వివరణ అందుబాటులో లేదు',
        benefits: 'ప్రయోజనాలు & లక్షణాలు',
        eligibilityCriteria: 'అర్హత ప్రమాణాలు',
        noEligibility: 'అర్హత ప్రమాణాలు పేర్కొనలేదు',
        requiredDocuments: 'అవసరమైన పత్రాలు',
        noDocuments: 'పత్రాల అవసరాలు పేర్కొనలేదు',
        applicationProcess: 'అప్లికేషన్ ప్రక్రియ',
        step1: 'అర్హత ప్రమాణాలను సమీక్షించండి మరియు అవసరమైన పత్రాలను సేకరించండి',
        step2: 'ఖచ్చితమైన సమాచారంతో దరఖాస్తు ఫారాన్ని పూరించండి',
        step3: 'మీ దరఖాస్తును సమర్పించండి మరియు దాని పురోగతిని ట్రాక్ చేయండి',
        applyOnline: 'ఆన్‌లైన్‌లో దరఖాస్తు చేయండి',
        applyNow: 'ఇప్పుడే దరఖాస్తు చేయండి',
        downloadForm: 'ఫారాన్ని డౌన్‌లోడ్ చేయండి'
      },
      application: {
        title: 'పథకం దరఖాస్తు ఫారం',
        step: 'దశ',
        of: 'లో',
        complete: 'పూర్తి',
        personalInfo: 'వ్యక్తిగత సమాచారం',
        documents: 'పత్రాలు',
        summary: 'సారాంశం',
        fullName: 'పూర్తి పేరు',
        email: 'ఇమెయిల్',
        phone: 'ఫోన్',
        address: 'చిరునామా',
        dateOfBirth: 'పుట్టిన తేది',
        occupation: 'వృత్తి',
        income: 'ఆదాయం',
        upload: 'అప్‌లోడ్',
        uploading: 'అప్‌లోడ్ చేస్తోంది...',
        invalidFile: 'చెల్లని ఫైల్ రకం',
        loginRequired: 'ఈ పథకానికి దరఖాస్తు చేయడానికి మీరు లాగిన్ అయి ఉండాలి.',
        submitting: 'సమర్పిస్తోంది...',
        submitted: 'దరఖాస్తు విజయవంతంగా సమర్పించబడింది!',
        submitError: 'మీ దరఖాస్తును సమర్పించడంలో లోపం ఉంది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
      }
    },
  };

  const t = (key: string, options: any = {}) => {
    let translation = key
      .split('.')
      .reduce((obj: any, i: string) => {
        if (obj && typeof obj === 'object' && i in obj) {
          return obj[i];
        } else {
          return undefined;
        }
      }, translations[language]);

    if (translation === undefined) {
      translation = key;
    }

    if (typeof translation === 'string') {
      Object.keys(options).forEach(optionKey => {
        translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
      });
    }

    return translation || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
