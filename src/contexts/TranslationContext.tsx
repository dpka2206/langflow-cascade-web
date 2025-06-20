
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
      nav: {
        title: 'Government Schemes Portal',
        home: 'Home',
        schemes: 'Browse Schemes',
        about: 'About Us',
        contact: 'Contact Us',
        login: 'Sign In',
        signup: 'Sign Up',
        signout: 'Sign Out',
        dashboard: 'My Dashboard',
        admin: 'Admin Panel',
        language: 'Language',
      },
      hero: {
        title: 'Discover Government Schemes Made for You',
        subtitle: 'Find and apply for government schemes and benefits that match your profile. Simplifying access to government services for every citizen.',
        getStarted: 'Get Started',
        exploreSchemes: 'Explore All Schemes',
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
        centralSchemes: 'Central Government Schemes',
        stateSchemes: 'State Government Schemes',
        allSchemes: 'All Available Schemes',
        central: 'Central',
        state: 'State',
        filters: 'Filter Options',
        searchPlaceholder: 'Search for schemes by name or keyword...',
        noResults: 'No schemes found matching your criteria',
        noResultsSearch: 'Try adjusting your search terms or filters',
        noResultsFilter: 'Try changing your filter selections',
        resultsFound: 'schemes found',
        knowMore: 'View Details',
        noDescription: 'Description not available'
      },
      category: {
        health: 'Healthcare & Medical',
        employment: 'Employment & Skills',
        agriculture: 'Agriculture & Farming',
        education: 'Education & Learning',
        housing: 'Housing & Shelter',
        social: 'Social Welfare',
      },
      wizard: {
        title: 'Find Schemes That Match Your Profile',
        subtitle: 'Answer a few questions to discover government schemes designed specifically for your situation.',
        findSchemes: 'Find My Schemes',
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
          title: 'What is your current occupation?',
          subtitle: 'Your occupation helps us find relevant employment and skill-based schemes',
          farmer: 'Farmer/Agricultural Worker',
          student: 'Student',
          employed: 'Employed (Private/Government)',
          selfEmployed: 'Self-Employed/Business Owner',
          unemployed: 'Currently Unemployed',
          healthcare: 'Healthcare Professional',
        },
        income: {
          title: 'What is your annual household income?',
          subtitle: 'Income information helps us find schemes based on economic eligibility criteria',
          below2lakh: 'Below ₹2,00,000',
          between2and5lakh: '₹2,00,000 - ₹5,00,000',
          between5and10lakh: '₹5,00,000 - ₹10,00,000',
          above10lakh: 'Above ₹10,00,000',
        },
        caste: {
          title: 'What is your social category?',
          subtitle: 'This helps us find schemes available for specific social categories',
          general: 'General Category',
          obc: 'Other Backward Classes (OBC)',
          sc: 'Scheduled Caste (SC)',
          st: 'Scheduled Tribe (ST)',
        },
        state: {
          title: 'Which state/union territory do you belong to?',
          subtitle: 'Your location helps us find relevant state-specific schemes and programs',
        },
      },
      schemeDetail: {
        overview: 'Scheme Overview',
        eligibility: 'Eligibility Requirements',
        documents: 'Required Documents',
        howToApply: 'Application Process',
        videoComingSoon: 'Video tutorial coming soon',
        description: 'Scheme Description',
        noDescription: 'Scheme description not available',
        benefits: 'Benefits & Features',
        eligibilityCriteria: 'Who Can Apply',
        noEligibility: 'Eligibility criteria not specified',
        requiredDocuments: 'Documents You Need',
        noDocuments: 'Document requirements not specified',
        applicationProcess: 'How to Apply',
        step1: 'Review eligibility criteria and gather all required documents',
        step2: 'Fill out the application form with accurate information',
        step3: 'Submit your application and track its progress online',
        applyOnline: 'Apply Online',
        applyNow: 'Start Application',
        downloadForm: 'Download Application Form'
      },
      application: {
        title: 'Government Scheme Application',
        step: 'Step',
        of: 'of',
        complete: 'Application Complete',
        personalInfo: 'Personal Information',
        documents: 'Document Upload',
        summary: 'Application Summary',
        fullName: 'Full Name as per Aadhaar',
        email: 'Email Address',
        phone: 'Mobile Number',
        address: 'Residential Address',
        dateOfBirth: 'Date of Birth',
        occupation: 'Current Occupation',
        income: 'Annual Income',
        upload: 'Upload Document',
        uploading: 'Uploading document...',
        invalidFile: 'Invalid file format. Please upload PDF, JPG, or PNG files only.',
        loginRequired: 'Please sign in to your account to apply for this scheme.',
        submitting: 'Submitting your application...',
        submitted: 'Application submitted successfully! You will receive updates via email and SMS.',
        submitError: 'Failed to submit application. Please check your details and try again.',
      },
      footer: {
        about: 'About This Portal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        help: 'Help & Support',
        copyright: '© 2024 Government Schemes Portal. All rights reserved.',
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
      nav: {
        title: 'ప్రభుత్వ పథకాల పోర్టల్',
        home: 'హోమ్',
        schemes: 'పథకాలను చూడండి',
        about: 'మా గురించి',
        contact: 'సంప్రదించండి',
        login: 'లాగిన్',
        signup: 'సైన్ అప్',
        signout: 'లాగ్ అవుట్',
        dashboard: 'నా డాష్‌బోర్డ్',
        admin: 'అడ్మిన్ ప్యానెల్',
        language: 'భాష',
      },
      hero: {
        title: 'మీ కోసం రూపొందించిన ప్రభుత్వ పథకాలను కనుగొనండి',
        subtitle: 'మీ ప్రొఫైల్‌కు సరిపోయే ప్రభుత్వ పథకాలు మరియు ప్రయోజనాలను కనుగొని దరఖాస్తు చేయండి. ప్రతి పౌరుడికి ప్రభుత్వ సేవల యాక్సెస్‌ను సులభతరం చేస్తోంది.',
        getStarted: 'ప్రారంభించండి',
        exploreSchemes: 'అన్ని పథకాలను అన్వేషించండి',
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
        centralSchemes: 'కేంద్ర ప్రభుత్వ పథకాలు',
        stateSchemes: 'రాష్ట్ర ప్రభుత్వ పథకాలు',
        allSchemes: 'అన్ని అందుబాటులో ఉన్న పథకాలు',
        central: 'కేంద్రం',
        state: 'రాష్ట్రం',
        filters: 'ఫిల్టర్ ఎంపికలు',
        searchPlaceholder: 'పేరు లేదా కీవర్డ్ ద్వారా పథకాలను వెతకండి...',
        noResults: 'మీ ప్రమాణాలకు సరిపోయే పథకాలు దొరకలేదు',
        noResultsSearch: 'మీ వెతుకుట పదాలు లేదా ఫిల్టర్లను సర్దుబాటు చేయండి',
        noResultsFilter: 'మీ ఫిల్టర్ ఎంపికలను మార్చండి',
        resultsFound: 'పథకాలు దొరికాయి',
        knowMore: 'వివరాలు చూడండి',
        noDescription: 'వివరణ అందుబాటులో లేదు'
      },
      category: {
        health: 'ఆరోగ్య సంరక్షణ & వైద్యం',
        employment: 'ఉపాధి & నైపుణ్యాలు',
        agriculture: 'వ్యవసాయం & కృషి',
        education: 'విద్య & అభ్యాసం',
        housing: 'గృహాలు & ఆశ్రయం',
        social: 'సామాజిక సంక్షేమం',
      },
      wizard: {
        title: 'మీ ప్రొఫైల్‌కు సరిపోయే పథకాలను కనుగొనండి',
        subtitle: 'మీ పరిస్థితికి ప్రత్యేకంగా రూపొందించిన ప్రభుత్వ పథకాలను కనుగొనడానికి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి.',
        findSchemes: 'నా పథకాలను కనుగొనండి',
        gender: {
          title: 'మీ లింగం ఏమిటి?',
          subtitle: 'సంబంధిత పథకాలను కనుగొనడానికి దయచేసి మీ లింగాన్ని ఎంచుకోండి',
          male: 'పురుషుడు',
          female: 'స్త్రీ',
          other: 'ఇతర',
        },
        age: {
          title: 'మీ వయస్సు సమూహం ఏమిటి?',
          subtitle: 'వయస్సు-నిర్దిష్ట పథకాలను ఫిల్టర్ చేయడానికి మీ వయస్సు సమూహాన్ని ఎంచుకోండి',
          under18: '18 సంవత్సరాలకు తక్కువ',
          young: '18-35 సంవత్సరాలు',
          middle: '36-60 సంవత్సరాలు',
          senior: '60 సంవత్సరాలకు మించి',
        },
        occupation: {
          title: 'మీ ప్రస్తుత వృత్తి ఏమిటి?',
          subtitle: 'మీ వృత్తి సంబంధిత ఉపాధి మరియు నైపుణ్య-ఆధారిత పథకాలను కనుగొనడంలో సహాయపడుతుంది',
          farmer: 'రైతు/వ్యవసాయ కార్మికుడు',
          student: 'విద్యార్థి',
          employed: 'ఉద్యోగి (ప్రైవేట్/ప్రభుత్వం)',
          selfEmployed: 'స్వయం ఉపాధి/వ్యాపార యజమాని',
          unemployed: 'ప్రస్తుతం నిరుద్యోగి',
          healthcare: 'ఆరోగ్య సంరక్షణ వృత్తిపరుడు',
        },
        income: {
          title: 'మీ వార్షిక కుటుంబ ఆదాయం ఎంత?',
          subtitle: 'ఆర్థిక అర్హత ప్రమాణాల ఆధారంగా పథకాలను కనుగొనడంలో ఆదాయ సమాచారం సహాయపడుతుంది',
          below2lakh: '₹2,00,000 కంటే తక్కువ',
          between2and5lakh: '₹2,00,000 - ₹5,00,000',
          between5and10lakh: '₹5,00,000 - ₹10,00,000',
          above10lakh: '₹10,00,000 కంటే ఎక్కువ',
        },
        caste: {
          title: 'మీ సామాజిక వర్గం ఏమిటి?',
          subtitle: 'ఇది నిర్దిష్ట సామాజిక వర్గాలకు అందుబాటులో ఉన్న పథకాలను కనుగొనడంలో సహాయపడుతుంది',
          general: 'సాధారణ వర్గం',
          obc: 'ఇతర వెనుకబడిన తరగతులు (OBC)',
          sc: 'షెడ్యూల్డ్ కులం (SC)',
          st: 'షెడ్యూల్డ్ తెగ (ST)',
        },
        state: {
          title: 'మీరు ఏ రాష్ట్రం/కేంద్రపాలిత ప్రాంతానికి చెందినవారు?',
          subtitle: 'మీ స్థానం సంబంధిత రాష్ట్ర-నిర్దిష్ట పథకాలు మరియు కార్యక్రమాలను కనుగొనడంలో సహాయపడుతుంది',
        },
      },
      schemeDetail: {
        overview: 'పథకం అవలోకనం',
        eligibility: 'అర్హత అవసరాలు',
        documents: 'అవసరమైన పత్రాలు',
        howToApply: 'దరఖాస్తు ప్రక్రియ',
        videoComingSoon: 'వీడియో ట్యుటోరియల్ త్వరలో',
        description: 'పథకం వివరణ',
        noDescription: 'పథకం వివరణ అందుబాటులో లేదు',
        benefits: 'ప్రయోజనాలు & లక్షణాలు',
        eligibilityCriteria: 'ఎవరు దరఖాస్తు చేయవచ్చు',
        noEligibility: 'అర్హత ప్రమాణాలు పేర్కొనలేదు',
        requiredDocuments: 'మీకు అవసరమైన పత్రాలు',
        noDocuments: 'పత్రాల అవసరాలు పేర్కొనలేదు',
        applicationProcess: 'ఎలా దరఖాస్తు చేయాలి',
        step1: 'అర్హత ప్రమాణాలను సమీక్షించండి మరియు అవసరమైన అన్ని పత్రాలను సేకరించండి',
        step2: 'ఖచ్చితమైన సమాచారంతో దరఖాస్తు ఫారాన్ని పూరించండి',
        step3: 'మీ దరఖాస్తును సమర్పించండి మరియు దాని పురోగతిని ఆన్‌లైన్‌లో ట్రాక్ చేయండి',
        applyOnline: 'ఆన్‌లైన్‌లో దరఖాస్తు చేయండి',
        applyNow: 'దరఖాస్తు ప్రారంభించండి',
        downloadForm: 'దరఖాస్తు ఫారాన్ని డౌన్‌లోడ్ చేయండి'
      },
      application: {
        title: 'ప్రభుత్వ పథకం దరఖాస్తు',
        step: 'దశ',
        of: 'లో',
        complete: 'దరఖాస్తు పూర్తి',
        personalInfo: 'వ్యక్తిగత సమాచారం',
        documents: 'పత్రాల అప్‌లోడ్',
        summary: 'దరఖాస్తు సారాంశం',
        fullName: 'ఆధార్ ప్రకారం పూర్తి పేరు',
        email: 'ఇమెయిల్ చిరునామా',
        phone: 'మొబైల్ నంబర్',
        address: 'నివాస చిరునామా',
        dateOfBirth: 'పుట్టిన తేది',
        occupation: 'ప్రస్తుత వృత్తి',
        income: 'వార్షిక ఆదాయం',
        upload: 'పత్రం అప్‌లోడ్',
        uploading: 'పత్రం అప్‌లోడ్ చేస్తోంది...',
        invalidFile: 'చెల్లని ఫైల్ ఫార్మాట్. దయచేసి PDF, JPG, లేదా PNG ఫైల్స్ మాత్రమే అప్‌లోడ్ చేయండి.',
        loginRequired: 'ఈ పథకానికి దరఖాస్తు చేయడానికి దయచేసి మీ ఖాతాలోకి సైన్ ఇన్ చేయండి.',
        submitting: 'మీ దరఖాస్తును సమర్పిస్తోంది...',
        submitted: 'దరఖాస్తు విజయవంతంగా సమర్పించబడింది! మీకు ఇమెయిల్ మరియు SMS ద్వారా అప్‌డేట్‌లు వస్తాయి.',
        submitError: 'దరఖాస్తు సమర్పించడంలో విఫలమైంది. దయచేసి మీ వివరాలను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',
      },
      footer: {
        about: 'ఈ పోర్టల్ గురించి',
        privacy: 'గోప్యతా విధానం',
        terms: 'సేవా నిబంధనలు',
        help: 'సహాయం & మద్దతు',
        copyright: '© 2024 ప్రభుత్వ పథకాల పోర్టల్. అన్ని హక్కులు రక్షించబడ్డాయి.',
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
