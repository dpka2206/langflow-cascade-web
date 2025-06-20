import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.title': 'Government Schemes Portal',
    'nav.home': 'Home',
    'nav.schemes': 'Find Schemes',
    'nav.personalizedSchemes': 'Personalized Schemes',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.dashboard': 'My Dashboard',
    'nav.admin': 'Admin Panel',
    'nav.signout': 'Sign Out',
    
    // Wizard
    'wizard.title': 'Personalized Scheme Finder',
    'wizard.subtitle': 'Answer a few questions to find schemes tailored for you.',
    'wizard.gender.title': 'Select Your Gender',
    'wizard.gender.subtitle': 'This helps us find schemes specifically for your gender.',
    'wizard.gender.male': 'Male',
    'wizard.gender.female': 'Female',
    'wizard.gender.other': 'Other',
    'wizard.age.title': 'Select Your Age Group',
    'wizard.age.subtitle': 'This helps us find schemes relevant to your age.',
    'wizard.age.under18': 'Under 18',
    'wizard.age.young': '18-35',
    'wizard.age.middle': '36-60',
    'wizard.age.senior': 'Above 60',
    'wizard.occupation.title': 'Select Your Occupation',
    'wizard.occupation.subtitle': 'This helps us find schemes based on your employment status.',
    'wizard.occupation.farmer': 'Farmer',
    'wizard.occupation.student': 'Student',
    'wizard.occupation.employed': 'Employed',
    'wizard.occupation.selfEmployed': 'Self-Employed',
    'wizard.occupation.unemployed': 'Unemployed',
    'wizard.occupation.healthcare': 'Healthcare Professional',
    'wizard.income.title': 'Select Your Income Group',
    'wizard.income.subtitle': 'This helps us find schemes based on your income level.',
    'wizard.income.below2lakh': 'Below 2 Lakh',
    'wizard.income.between2and5lakh': '2-5 Lakh',
    'wizard.income.between5and10lakh': '5-10 Lakh',
    'wizard.income.above10lakh': 'Above 10 Lakh',
    'wizard.caste.title': 'Select Your Caste Category',
    'wizard.caste.subtitle': 'This helps us find schemes specific to your caste.',
    'wizard.caste.general': 'General',
    'wizard.caste.obc': 'OBC',
    'wizard.caste.sc': 'SC',
    'wizard.caste.st': 'ST',
    'wizard.state.title': 'Select Your State',
    'wizard.state.subtitle': 'This helps us find schemes available in your state.',
    'wizard.findSchemes': 'Find Schemes',

    // Common
    'common.next': 'Next',
    'common.back': 'Back',

    // Scheme Cards
    'scheme.eligibility': 'Eligibility',
    'scheme.benefits': 'Benefits',
    'scheme.applyNow': 'Apply Now',
    'scheme.viewDetails': 'View Details',

    // Footer
    'footer.copyright': '© 2024 Government Schemes Portal. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    //Home Page
    'home.title': 'Empowering Citizens with Information on Government Schemes',
    'home.subtitle': 'Your one-stop destination to discover and access government schemes.',
    'home.featuredSchemes': 'Featured Schemes',
    'home.browseSchemes': 'Browse All Schemes',
    'home.aboutUs': 'About Us',
    'home.contactUs': 'Contact Us',
    'home.about.title': 'About the Government Schemes Portal',
    'home.about.content': 'The Government Schemes Portal is designed to provide citizens with easy access to information about various government schemes. Our mission is to empower citizens by making it simple to discover and understand the schemes available to them.',
    'home.contact.title': 'Contact Us',
    'home.contact.content': 'Have questions or need assistance? Contact us using the information below.',
    'home.contact.email': 'Email: support@govtschemes.com',
    'home.contact.phone': 'Phone: +91-800-123-4567',

    //Schemes Page
    'schemes.title': 'Explore Government Schemes',
    'schemes.subtitle': 'Discover a wide range of government schemes designed to support various aspects of life.',
    'schemes.search': 'Search Schemes',
    'schemes.filter': 'Filter Schemes',
    'schemes.category': 'Category',
    'schemes.age': 'Age Group',
    'schemes.gender': 'Gender',
    'schemes.occupation': 'Occupation',
    'schemes.income': 'Income',
    'schemes.caste': 'Caste',
    'schemes.state': 'State',
    'schemes.applyFilters': 'Apply Filters',
    'schemes.resetFilters': 'Reset Filters',
  },
  te: {
    // Navigation
    'nav.title': 'ప్రభుత్వ పథకాల పోర్టల్',
    'nav.home': 'ముఖ్యపేజీ',
    'nav.schemes': 'పథకాలు కనుగొనండి',
    'nav.personalizedSchemes': 'వ్యక్తిగత పథకాలు',
    'nav.about': 'మా గురించి',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'లాగిన్',
    'nav.dashboard': 'నా డాష్‌బోర్డ్',
    'nav.admin': 'నిర్వాహక ప్యానెల్',
    'nav.signout': 'లాగౌట్',
    
    // Wizard
    'wizard.title': 'వ్యక్తిగతీకరించిన పథకం ఫైండర్',
    'wizard.subtitle': 'మీ కోసం రూపొందించిన పథకాలను కనుగొనడానికి కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి.',
    'wizard.gender.title': 'మీ లింగాన్ని ఎంచుకోండి',
    'wizard.gender.subtitle': 'ఇది మీ లింగానికి ప్రత్యేకంగా పథకాలను కనుగొనడానికి మాకు సహాయపడుతుంది.',
    'wizard.gender.male': 'పురుషుడు',
    'wizard.gender.female': 'స్త్రీ',
    'wizard.gender.other': 'ఇతర',
    'wizard.age.title': 'మీ వయస్సు సమూహాన్ని ఎంచుకోండి',
    'wizard.age.subtitle': 'ఇది మీ వయస్సుకు సంబంధించిన పథకాలను కనుగొనడానికి మాకు సహాయపడుతుంది.',
    'wizard.age.under18': '18 ఏళ్లలోపు',
    'wizard.age.young': '18-35',
    'wizard.age.middle': '36-60',
    'wizard.age.senior': '60 పైన',
    'wizard.occupation.title': 'మీ వృత్తిని ఎంచుకోండి',
    'wizard.occupation.subtitle': 'ఇది మీ ఉద్యోగ స్థితి ఆధారంగా పథకాలను కనుగొనడానికి మాకు సహాయపడుతుంది.',
    'wizard.occupation.farmer': 'రైతు',
    'wizard.occupation.student': 'విద్యార్థి',
    'wizard.occupation.employed': 'ఉద్యోగం',
    'wizard.occupation.selfEmployed': 'స్వయం ఉపాధి',
    'wizard.occupation.unemployed': 'నిరుద్యోగి',
    'wizard.occupation.healthcare': 'హెల్త్‌కేర్ ప్రొఫెషనల్',
    'wizard.income.title': 'మీ ఆదాయ సమూహాన్ని ఎంచుకోండి',
    'wizard.income.subtitle': 'ఇది మీ ఆదాయ స్థాయి ఆధారంగా పథకాలను కనుగొనడానికి మాకు సహాయపడుతుంది.',
    'wizard.income.below2lakh': '2 లక్షల దిగువన',
    'wizard.income.between2and5lakh': '2-5 లక్షలు',
    'wizard.income.between5and10lakh': '5-10 లక్షలు',
    'wizard.income.above10lakh': '10 లక్షల పైన',
    'wizard.caste.title': 'మీ కుల వర్గాన్ని ఎంచుకోండి',
    'wizard.caste.subtitle': 'ఇది మీ కులానికి సంబంధించిన పథకాలను కనుగొనడానికి మాకు సహాయపడుతుంది.',
    'wizard.caste.general': 'జనరల్',
    'wizard.caste.obc': 'ఓబీసీ',
    'wizard.caste.sc': 'ఎస్సీ',
    'wizard.caste.st': 'ఎస్టీ',
    'wizard.state.title': 'మీ రాష్ట్రాన్ని ఎంచుకోండి',
    'wizard.state.subtitle': 'ఇది మీ రాష్ట్రంలో అందుబాటులో ఉన్న పథకాలను కనుగొనడానికి మాకు సహాయపడుతుంది.',
    'wizard.findSchemes': 'పథకాలను కనుగొనండి',

    // Common
    'common.next': 'తరువాత',
    'common.back': 'వెనుకకు',

    // Scheme Cards
    'scheme.eligibility': 'అర్హత',
    'scheme.benefits': 'ప్రయోజనాలు',
    'scheme.applyNow': 'ఇప్పుడే దరఖాస్తు చేయండి',
    'scheme.viewDetails': 'వివరాలు చూడండి',

    // Footer
    'footer.copyright': '© 2024 ప్రభుత్వ పథకాల పోర్టల్. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'సేవల నిబంధనలు',

    //Home Page
    'home.title': 'ప్రభుత్వ పథకాల సమాచారంతో పౌరులకు సాధికారత కల్పించడం',
    'home.subtitle': 'ప్రభుత్వ పథకాలను కనుగొనడానికి మరియు యాక్సెస్ చేయడానికి మీ వన్-స్టాప్ గమ్యం.',
    'home.featuredSchemes': 'ఫీచర్ చేసిన పథకాలు',
    'home.browseSchemes': 'అన్ని పథకాలను బ్రౌజ్ చేయండి',
    'home.aboutUs': 'మా గురించి',
    'home.contactUs': 'సంప్రదించండి',
    'home.about.title': 'ప్రభుత్వ పథకాల పోర్టల్ గురించి',
    'home.about.content': 'ప్రభుత్వ పథకాల గురించి పౌరులకు సులభంగా సమాచారం అందించడానికి ప్రభుత్వ పథకాల పోర్టల్ రూపొందించబడింది. పౌరులకు అందుబాటులో ఉన్న పథకాలను కనుగొనడం మరియు అర్థం చేసుకోవడం సులభతరం చేయడం ద్వారా వారిని శక్తివంతం చేయడమే మా లక్ష్యం.',
    'home.contact.title': 'మమ్మల్ని సంప్రదించండి',
    'home.contact.content': 'ప్రశ్నలు ఉన్నాయా లేదా సహాయం కావాలా? దిగువ సమాచారాన్ని ఉపయోగించి మమ్మల్ని సంప్రదించండి.',
    'home.contact.email': 'ఇమెయిల్: support@govtschemes.com',
    'home.contact.phone': 'ఫోన్: +91-800-123-4567',

    //Schemes Page
    'schemes.title': 'ప్రభుత్వ పథకాలను అన్వేషించండి',
    'schemes.subtitle': 'జీవితంలోని వివిధ అంశాలకు మద్దతు ఇవ్వడానికి రూపొందించిన అనేక ప్రభుత్వ పథకాలను కనుగొనండి.',
    'schemes.search': 'పథకాలను శోధించండి',
    'schemes.filter': 'పథకాలను ఫిల్టర్ చేయండి',
    'schemes.category': 'వర్గం',
    'schemes.age': 'వయస్సు గుంపు',
    'schemes.gender': 'లింగం',
    'schemes.occupation': 'వృత్తి',
    'schemes.income': 'ఆదాయం',
    'schemes.caste': 'కులం',
    'schemes.state': 'రాష్ట్రం',
    'schemes.applyFilters': 'ఫిల్టర్‌లను వర్తించండి',
    'schemes.resetFilters': 'ఫిల్టర్‌లను రీసెట్ చేయండి',
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
