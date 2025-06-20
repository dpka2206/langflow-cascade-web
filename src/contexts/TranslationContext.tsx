
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
    'nav.title': 'SchemeFinder',
    'nav.home': 'Home',
    'nav.schemes': 'Browse Schemes',
    'nav.personalizedSchemes': 'Find My Schemes',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Sign In',
    'nav.dashboard': 'My Account',
    'nav.admin': 'Admin',
    'nav.signout': 'Sign Out',
    
    // Wizard
    'wizard.title': 'Find Schemes for You',
    'wizard.subtitle': 'Tell us about yourself to discover relevant government schemes.',
    'wizard.gender.title': 'What is your gender?',
    'wizard.gender.subtitle': 'This helps us find schemes designed for your specific needs.',
    'wizard.gender.male': 'Male',
    'wizard.gender.female': 'Female',
    'wizard.gender.other': 'Other',
    'wizard.age.title': 'What is your age?',
    'wizard.age.subtitle': 'Different schemes are available for different age groups.',
    'wizard.age.under18': 'Under 18 years',
    'wizard.age.young': '18 to 35 years',
    'wizard.age.middle': '36 to 60 years',
    'wizard.age.senior': 'Above 60 years',
    'wizard.occupation.title': 'What do you do for work?',
    'wizard.occupation.subtitle': 'We\'ll find schemes that match your employment situation.',
    'wizard.occupation.farmer': 'Farmer',
    'wizard.occupation.student': 'Student',
    'wizard.occupation.employed': 'Working Professional',
    'wizard.occupation.selfEmployed': 'Business Owner',
    'wizard.occupation.unemployed': 'Looking for Work',
    'wizard.occupation.healthcare': 'Healthcare Worker',
    'wizard.income.title': 'What is your yearly income?',
    'wizard.income.subtitle': 'This helps us find schemes based on income eligibility.',
    'wizard.income.below2lakh': 'Less than ₹2 Lakh',
    'wizard.income.between2and5lakh': '₹2 to ₹5 Lakh',
    'wizard.income.between5and10lakh': '₹5 to ₹10 Lakh',
    'wizard.income.above10lakh': 'More than ₹10 Lakh',
    'wizard.caste.title': 'Which category do you belong to?',
    'wizard.caste.subtitle': 'Some schemes are reserved for specific communities.',
    'wizard.caste.general': 'General Category',
    'wizard.caste.obc': 'Other Backward Classes (OBC)',
    'wizard.caste.sc': 'Scheduled Caste (SC)',
    'wizard.caste.st': 'Scheduled Tribe (ST)',
    'wizard.state.title': 'Which state are you from?',
    'wizard.state.subtitle': 'We\'ll show schemes available in your state.',
    'wizard.findSchemes': 'Show My Schemes',

    // Common
    'common.next': 'Continue',
    'common.back': 'Go Back',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',

    // Scheme Cards
    'scheme.eligibility': 'Who Can Apply',
    'scheme.benefits': 'What You Get',
    'scheme.applyNow': 'Apply Now',
    'scheme.viewDetails': 'Learn More',
    'scheme.documents': 'Required Documents',
    'scheme.howToApply': 'How to Apply',

    // Footer
    'footer.copyright': '© 2024 SchemeFinder. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.help': 'Help & Support',

    // Home Page
    'home.title': 'Find Government Schemes Made for You',
    'home.subtitle': 'Discover benefits, subsidies, and support programs you qualify for.',
    'home.featuredSchemes': 'Popular Schemes',
    'home.browseSchemes': 'Explore All Schemes',
    'home.aboutUs': 'About SchemeFinder',
    'home.contactUs': 'Get Help',
    'home.about.title': 'Making Government Schemes Accessible',
    'home.about.content': 'SchemeFinder helps you discover and apply for government schemes easily. We simplify the process so you can focus on what matters - getting the support you deserve.',
    'home.contact.title': 'Need Help?',
    'home.contact.content': 'Our support team is here to help you navigate government schemes.',
    'home.contact.email': 'Email: help@schemefinder.com',
    'home.contact.phone': 'Phone: 1800-123-HELP',

    // Schemes Page
    'schemes.title': 'Government Schemes & Benefits',
    'schemes.subtitle': 'Browse all available schemes or use filters to find what\'s right for you.',
    'schemes.search': 'Search schemes...',
    'schemes.filter': 'Filter Results',
    'schemes.category': 'Scheme Type',
    'schemes.age': 'Age Group',
    'schemes.gender': 'Gender',
    'schemes.occupation': 'Occupation',
    'schemes.income': 'Income Range',
    'schemes.caste': 'Category',
    'schemes.state': 'State',
    'schemes.applyFilters': 'Apply Filters',
    'schemes.resetFilters': 'Clear All',
    'schemes.noResults': 'No schemes found',
    'schemes.resultsCount': 'schemes found',

    // Authentication
    'auth.login': 'Sign In to Your Account',
    'auth.signup': 'Create New Account',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.signInButton': 'Sign In',
    'auth.signUpButton': 'Create Account',
  },
  te: {
    // Navigation
    'nav.title': 'స్కీమ్‌ఫైండర్',
    'nav.home': 'హోం',
    'nav.schemes': 'పథకాలు చూడండి',
    'nav.personalizedSchemes': 'నా పథకాలు కనుగొనండి',
    'nav.about': 'మా గురించి',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'లాగిన్',
    'nav.dashboard': 'నా ఖాతా',
    'nav.admin': 'అడ్మిన్',
    'nav.signout': 'లాగౌట్',
    
    // Wizard
    'wizard.title': 'మీ కోసం పథకాలు కనుగొనండి',
    'wizard.subtitle': 'మీకు సంబంధించిన ప్రభుత్వ పథకాలను కనుగొనడానికి మీ గురించి చెప్పండి.',
    'wizard.gender.title': 'మీ లింగం ఏమిటి?',
    'wizard.gender.subtitle': 'ఇది మీ ప్రత్యేక అవసరాలకు రూపొందించిన పథకాలను కనుగొనడంలో సహాయపడుతుంది.',
    'wizard.gender.male': 'పురుషుడు',
    'wizard.gender.female': 'స్త్రీ',
    'wizard.gender.other': 'ఇతర',
    'wizard.age.title': 'మీ వయస్సు ఎంత?',
    'wizard.age.subtitle': 'వివిధ వయస్సుల వర్గాలకు వేర్వేరు పథకాలు అందుబాటులో ఉన్నాయి.',
    'wizard.age.under18': '18 సంవత్సరాలలోపు',
    'wizard.age.young': '18 నుండి 35 సంవత్సరాలు',
    'wizard.age.middle': '36 నుండి 60 సంవత్సరాలు',
    'wizard.age.senior': '60 సంవత్సరాలకు మించి',
    'wizard.occupation.title': 'మీ పని ఏమిటి?',
    'wizard.occupation.subtitle': 'మీ ఉపాధి పరిస్థితికి సరిపోయే పథకాలను మేము కనుగొంటాము.',
    'wizard.occupation.farmer': 'రైతు',
    'wizard.occupation.student': 'విద్యార్థి',
    'wizard.occupation.employed': 'ఉద్యోగి',
    'wizard.occupation.selfEmployed': 'వ్యాపారి',
    'wizard.occupation.unemployed': 'ఉద్యోగం వెతుకుతున్న',
    'wizard.occupation.healthcare': 'ఆరోగ్య కార్యకర్త',
    'wizard.income.title': 'మీ వార్షిక ఆదాయం ఎంత?',
    'wizard.income.subtitle': 'ఇది ఆదాయ అర్హత ఆధారంగా పథకాలను కనుగొనడంలో సహాయపడుతుంది.',
    'wizard.income.below2lakh': '₹2 లక్షలకు తక్కువ',
    'wizard.income.between2and5lakh': '₹2 నుండి ₹5 లక్షలు',
    'wizard.income.between5and10lakh': '₹5 నుండి ₹10 లక్షలు',
    'wizard.income.above10lakh': '₹10 లక్షలకు మించి',
    'wizard.caste.title': 'మీరు ఏ వర్గానికి చెందినవారు?',
    'wizard.caste.subtitle': 'కొన్ని పథకాలు నిర్దిష్ట కమ్యూనిటీలకు రిజర్వు చేయబడ్డాయి.',
    'wizard.caste.general': 'సాధారణ వర్గం',
    'wizard.caste.obc': 'వెనుకబడిన తరగతులు (OBC)',
    'wizard.caste.sc': 'షెడ్యూల్డ్ కాస్ట్ (SC)',
    'wizard.caste.st': 'షెడ్యూల్డ్ ట్రైబ్ (ST)',
    'wizard.state.title': 'మీరు ఏ రాష్ట్రానికి చెందినవారు?',
    'wizard.state.subtitle': 'మీ రాష్ట్రంలో అందుబాటులో ఉన్న పథకాలను మేము చూపిస్తాము.',
    'wizard.findSchemes': 'నా పథకాలు చూపించండి',

    // Common
    'common.next': 'కొనసాగించండి',
    'common.back': 'వెనుకకు వెళ్ళండి',
    'common.loading': 'లోడవుతోంది...',
    'common.error': 'ఏదో తప్పు జరిగింది',
    'common.retry': 'మళ్ళీ ప్రయత్నించండి',

    // Scheme Cards
    'scheme.eligibility': 'ఎవరు దరఖాస్తు చేసుకోవచ్చు',
    'scheme.benefits': 'మీకు ఏమి లభిస్తుంది',
    'scheme.applyNow': 'ఇప్పుడే దరఖాస్తు చేయండి',
    'scheme.viewDetails': 'మరిన్ని వివరాలు',
    'scheme.documents': 'అవసరమైన పత్రాలు',
    'scheme.howToApply': 'ఎలా దరఖాస్తు చేయాలి',

    // Footer
    'footer.copyright': '© 2024 స్కీమ్‌ఫైండర్. అన్ని హక్కులు రక్షితం.',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'సేవా నిబంధనలు',
    'footer.help': 'సహాయం & మద్దతు',

    // Home Page
    'home.title': 'మీ కోసం రూపొందించిన ప్రభుత్వ పథకాలను కనుగొనండి',
    'home.subtitle': 'మీరు అర్హులైన ప్రయోజనాలు, సబ్సిడీలు మరియు మద్దతు కార్యక్రమాలను కనుగొనండి.',
    'home.featuredSchemes': 'ప్రముఖ పథకాలు',
    'home.browseSchemes': 'అన్ని పథకాలను అన్వేషించండి',
    'home.aboutUs': 'స్కీమ్‌ఫైండర్ గురించి',
    'home.contactUs': 'సహాయం పొందండి',
    'home.about.title': 'ప్రభుత్వ పథకాలను అందుబాటులో చేయడం',
    'home.about.content': 'స్కీమ్‌ఫైండర్ మీకు ప్రభుత్వ పథకాలను సులభంగా కనుగొని దరఖాస్తు చేసుకోవడంలో సహాయపడుతుంది. మీరు అర్హమైన మద్దతును పొందడంపై దృష్టి పెట్టేలా మేము ప్రక్రియను సరళీకృతం చేస్తాము.',
    'home.contact.title': 'సహాయం కావాలా?',
    'home.contact.content': 'ప్రభుత్వ పథకాలను నావిగేట్ చేయడంలో మా మద్దతు బృందం మీకు సహాయం చేయడానికి ఇక్కడ ఉంది.',
    'home.contact.email': 'ఇమెయిల్: help@schemefinder.com',
    'home.contact.phone': 'ఫోన్: 1800-123-HELP',

    // Schemes Page
    'schemes.title': 'ప్రభుత్వ పథకాలు & ప్రయోజనాలు',
    'schemes.subtitle': 'అందుబాటులో ఉన్న అన్ని పథకాలను చూడండి లేదా మీకు సరైనవి కనుగొనడానికి ఫిల్టర్‌లను ఉపయోగించండి.',
    'schemes.search': 'పథకాలను వెతకండి...',
    'schemes.filter': 'ఫలితాలను ఫిల్టర్ చేయండి',
    'schemes.category': 'పథకం రకం',
    'schemes.age': 'వయస్సు వర్గం',
    'schemes.gender': 'లింగం',
    'schemes.occupation': 'వృత్తి',
    'schemes.income': 'ఆదాయ పరిధి',
    'schemes.caste': 'వర్గం',
    'schemes.state': 'రాష్ట్రం',
    'schemes.applyFilters': 'ఫిల్టర్‌లను వర్తింపజేయండి',
    'schemes.resetFilters': 'అన్నీ క్లియర్ చేయండి',
    'schemes.noResults': 'పథకాలు కనుగొనబడలేదు',
    'schemes.resultsCount': 'పథకాలు కనుగొనబడ్డాయి',

    // Authentication
    'auth.login': 'మీ ఖాతాలోకి సైన్ ఇన్ చేయండి',
    'auth.signup': 'కొత్త ఖాతా సృష్టించండి',
    'auth.forgotPassword': 'పాస్‌వర్డ్ మర్చిపోయారా?',
    'auth.email': 'ఇమెయిల్ చిరునామా',
    'auth.password': 'పాస్‌వర్డ్',
    'auth.confirmPassword': 'పాస్‌వర్డ్‌ను నిర్ధారించండి',
    'auth.signInButton': 'సైన్ ఇన్',
    'auth.signUpButton': 'ఖాతా సృష్టించండి',
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
