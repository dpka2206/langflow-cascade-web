
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'te';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    'nav.title': 'MyScheme Portal',
    'nav.home': 'Home',
    'nav.schemes': 'Schemes',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.language': 'Language',
    
    // Hero Section
    'hero.title': 'Government Schemes Portal',
    'hero.subtitle': 'Discover and apply for government schemes tailored for you',
    'hero.search.placeholder': 'Search for schemes...',
    'hero.search.button': 'Search',
    
    // Schemes Section
    'schemes.title': 'Popular Schemes',
    'schemes.viewAll': 'View All Schemes',
    
    // Scheme Cards
    'scheme.pmkisan.title': 'PM-KISAN',
    'scheme.pmkisan.description': 'Financial support to small and marginal farmers',
    'scheme.pmkisan.eligibility': 'Small & marginal farmers',
    'scheme.pmkisan.benefit': '₹6,000 per year',
    
    'scheme.pmjay.title': 'PM-JAY',
    'scheme.pmjay.description': 'Health insurance coverage for poor families',
    'scheme.pmjay.eligibility': 'BPL families',
    'scheme.pmjay.benefit': '₹5 lakh coverage',
    
    'scheme.pmay.title': 'PM-AWY',
    'scheme.pmay.description': 'Housing scheme for economically weaker sections',
    'scheme.pmay.eligibility': 'EWS families',
    'scheme.pmay.benefit': 'Financial assistance',
    
    'scheme.mudra.title': 'MUDRA Yojana',
    'scheme.mudra.description': 'Micro finance loans for small businesses',
    'scheme.mudra.eligibility': 'Small entrepreneurs',
    'scheme.mudra.benefit': 'Up to ₹10 lakh loan',
    
    // Common
    'common.apply': 'Apply Now',
    'common.learnMore': 'Learn More',
    'common.eligibility': 'Eligibility',
    'common.benefit': 'Benefit',
    
    // Categories
    'categories.title': 'Scheme Categories',
    'category.agriculture': 'Agriculture',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.housing': 'Housing',
    'category.employment': 'Employment',
    'category.social': 'Social Welfare',
    
    // Footer
    'footer.about': 'About Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.help': 'Help & Support',
    'footer.copyright': '© 2024 Government of India. All rights reserved.'
  },
  te: {
    // Navbar
    'nav.title': 'మై స్కీమ్ పోర్టల్',
    'nav.home': 'హోమ్',
    'nav.schemes': 'పథకాలు',
    'nav.about': 'గురించి',
    'nav.contact': 'సంప్రదింపులు',
    'nav.language': 'భాష',
    
    // Hero Section
    'hero.title': 'ప్రభుత్వ పథకాల పోర్టల్',
    'hero.subtitle': 'మీకు అనుకూలమైన ప్రభుత్వ పథకాలను కనుగొని దరఖాస్తు చేసుకోండి',
    'hero.search.placeholder': 'పథకాలను వెతకండి...',
    'hero.search.button': 'వెతకండి',
    
    // Schemes Section
    'schemes.title': 'ప్రముఖ పథకాలు',
    'schemes.viewAll': 'అన్ని పథకాలను చూడండి',
    
    // Scheme Cards
    'scheme.pmkisan.title': 'పిఎం-కిసాన్',
    'scheme.pmkisan.description': 'చిన్న మరియు అంచు రైతులకు ఆర్థిక సహాయం',
    'scheme.pmkisan.eligibility': 'చిన్న మరియు అంచు రైతులు',
    'scheme.pmkisan.benefit': 'సంవత్సరానికి ₹6,000',
    
    'scheme.pmjay.title': 'పిఎం-జే',
    'scheme.pmjay.description': 'పేద కుటుంబాలకు ఆరోగ్య బీమా కవరేజీ',
    'scheme.pmjay.eligibility': 'బిపిఎల్ కుటుంబాలు',
    'scheme.pmjay.benefit': '₹5 లక్షల కవరేజీ',
    
    'scheme.pmay.title': 'పిఎం-ఏడబ్ల్యూవై',
    'scheme.pmay.description': 'ఆర్థికంగా బలహీన వర్గాలకు గృహ పథకం',
    'scheme.pmay.eligibility': 'ఇడబ్ల్యూఎస్ కుటుంబాలు',
    'scheme.pmay.benefit': 'ఆర్థిక సహాయం',
    
    'scheme.mudra.title': 'ముద్రా యోజన',
    'scheme.mudra.description': 'చిన్న వ్యాపారాలకు మైక్రో ఫైనాన్స్ రుణాలు',
    'scheme.mudra.eligibility': 'చిన్న వ్యవసాయులు',
    'scheme.mudra.benefit': '₹10 లక్షల వరకు రుణం',
    
    // Common
    'common.apply': 'ఇప్పుడే దరఖాస్తు చేసుకోండి',
    'common.learnMore': 'మరింత తెలుసుకోండి',
    'common.eligibility': 'అర్హత',
    'common.benefit': 'ప్రయోజనం',
    
    // Categories
    'categories.title': 'పథక వర్గాలు',
    'category.agriculture': 'వ్యవసాయం',
    'category.health': 'ఆరోగ్యం',
    'category.education': 'విద్య',
    'category.housing': 'గృహనిర్మాణం',
    'category.employment': 'ఉపాధి',
    'category.social': 'సామాజిక సంక్షేమం',
    
    // Footer
    'footer.about': 'మా గురించి',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'నిబంధనలు మరియు షరతులు',
    'footer.help': 'సహాయం మరియు మద్దతు',
    'footer.copyright': '© 2024 భారత ప్రభుత్వం. అన్ని హక్కులు సురక్షితం.'
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'te')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
