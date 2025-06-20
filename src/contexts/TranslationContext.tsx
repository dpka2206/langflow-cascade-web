
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
        findSchemes: 'Find Schemes',
        gender: {
          title: 'What is your gender?',
          subtitle: 'Please select your gender to help us find relevant schemes',
          male: 'Male',
          female: 'Female',
          other: 'Other',
        },
        age: {
          title: 'What is your age group?',
          subtitle: 'Select your age group to filter age-specific schemes',
          under18: 'Under 18 years',
          young: '18-35 years',
          middle: '36-60 years',
          senior: 'Above 60 years',
        },
        occupation: {
          title: 'What is your occupation?',
          subtitle: 'Your occupation helps us find employment and skill-based schemes',
          farmer: 'Farmer',
          student: 'Student',
          employed: 'Employed',
          selfEmployed: 'Self-Employed',
          unemployed: 'Unemployed',
          healthcare: 'Healthcare Worker',
        },
        income: {
          title: 'What is your annual income range?',
          subtitle: 'Income information helps us find schemes based on economic criteria',
          below2lakh: 'Below ₹2,00,000',
          between2and5lakh: '₹2,00,000 - ₹5,00,000',
          between5and10lakh: '₹5,00,000 - ₹10,00,000',
          above10lakh: 'Above ₹10,00,000',
        },
        caste: {
          title: 'What is your social category?',
          subtitle: 'This helps us find schemes specific to different social categories',
          general: 'General',
          obc: 'Other Backward Classes (OBC)',
          sc: 'Scheduled Caste (SC)',
          st: 'Scheduled Tribe (ST)',
        },
        state: {
          title: 'Which state do you belong to?',
          subtitle: 'Your state helps us find relevant state-specific schemes',
        },
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
        stateSchemes: 'రాష్ట్ర పథకాలు',
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
        findSchemes: 'పథకాలను కనుగొనండి',
        gender: {
          title: 'మీ లింగం ఏమిటి?',
          subtitle: 'సంబంధిత పథకాలను కనుగొనడానికి దయచేసి మీ లింగాన్ని ఎంచుకోండి',
          male: 'పురుషుడు',
          female: 'స్త్రీ',
          other: 'ఇతర',
        },
        age: {
          title: 'మీ వయస్సు ఎంత?',
          subtitle: 'వయస్సు-నిర్దిష్ట పథకాలను ఫిల్టర్ చేయడానికి మీ వయస్సు సమూహాన్ని ఎంచుకోండి',
          under18: '18 సంవత్సరాలకు తక్కువ',
          young: '18-35 సంవత్సరాలు',
          middle: '36-60 సంవత్సరాలు',
          senior: '60 సంవత్సరాలకు మించి',
        },
        occupation: {
          title: 'మీ వృత్తి ఏమిటి?',
          subtitle: 'మీ వృత్తి ఉపాధి మరియు నైపుణ్య-ఆధారిత పథకాలను కనుగొనడంలో సహాయపడుతుంది',
          farmer: 'రైతు',
          student: 'విద్యార్థి',
          employed: 'ఉద్యోగి',
          selfEmployed: 'స్వయం ఉపాధి',
          unemployed: 'నిరుద్యోగి',
          healthcare: 'ఆరోగ్య కార్యకర్త',
        },
        income: {
          title: 'మీ వార్షిక ఆదాయ పరిధి ఎంత?',
          subtitle: 'ఆర్థిక ప్రమాణాల ఆధారంగా పథకాలను కనుగొనడంలో ఆదాయ సమాచారం సహాయపడుతుంది',
          below2lakh: '₹2,00,000 కంటే తక్కువ',
          between2and5lakh: '₹2,00,000 - ₹5,00,000',
          between5and10lakh: '₹5,00,000 - ₹10,00,000',
          above10lakh: '₹10,00,000 కంటే ఎక్కువ',
        },
        caste: {
          title: 'మీ సామాజిక వర్గం ఏమిటి?',
          subtitle: 'ఇది వివిధ సామాజిక వర్గాలకు నిర్దిష్టమైన పథకాలను కనుగొనడంలో సహాయపడుతుంది',
          general: 'సాధారణ',
          obc: 'ఇతర వెనుకబడిన తరగతులు (OBC)',
          sc: 'షెడ్యూల్డ్ కులం (SC)',
          st: 'షెడ్యూల్డ్ తెగ (ST)',
        },
        state: {
          title: 'మీరు ఏ రాష్ట్రానికి చెందినవారు?',
          subtitle: 'మీ రాష్ట్రం సంబంధిత రాష్ట్ర-నిర్దిష్ట పథకాలను కనుగొనడంలో సహాయపడుతుంది',
        },
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
        applicationProcess: 'దరఖాస్తు ప్రక్రియ',
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
