
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Navigation
    'nav.title': 'SarkarSaathi',
    'nav.home': 'Home',
    'nav.schemes': 'Schemes',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.dashboard': 'Dashboard',
    'nav.signout': 'Sign Out',

    // Hero Section
    'hero.title': 'Discover Government Schemes Made Easy',
    'hero.subtitle': 'Find the perfect government schemes and benefits tailored for you. Simple, fast, and in your language.',
    'hero.search.placeholder': 'Search for schemes, benefits, or categories...',
    'hero.search.button': 'Search',

    // Categories
    'categories.title': 'Browse by Category',
    'category.agriculture': 'Agriculture',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.housing': 'Housing',
    'category.employment': 'Employment',
    'category.social': 'Social Welfare',

    // Schemes
    'schemes.title': 'Popular Schemes',
    'schemes.viewAll': 'View All Schemes',

    // Scheme Details
    'scheme.pmkisan.title': 'PM-KISAN Scheme',
    'scheme.pmkisan.description': 'Direct income support to farmers for agricultural needs',
    'scheme.pmkisan.eligibility': 'Small & marginal farmers',
    'scheme.pmkisan.benefit': '₹6,000 per year',

    'scheme.pmjay.title': 'Ayushman Bharat - PM-JAY',
    'scheme.pmjay.description': 'Health insurance coverage for economically vulnerable families',
    'scheme.pmjay.eligibility': 'As per SECC database',
    'scheme.pmjay.benefit': 'Up to ₹5 lakhs per family',

    'scheme.pmay.title': 'Pradhan Mantri Awas Yojana',
    'scheme.pmay.description': 'Affordable housing scheme for urban and rural areas',
    'scheme.pmay.eligibility': 'EWS, LIG, MIG families',
    'scheme.pmay.benefit': 'Up to ₹2.67 lakhs subsidy',

    'scheme.mudra.title': 'Mudra Yojana',
    'scheme.mudra.description': 'Micro-finance scheme for small businesses and entrepreneurs',
    'scheme.mudra.eligibility': 'Non-corporate businesses',
    'scheme.mudra.benefit': 'Up to ₹10 lakhs loan',

    // Common
    'common.eligibility': 'Eligibility',
    'common.benefit': 'Benefit',
    'common.apply': 'Apply Now',
    'common.learnMore': 'Learn More',

    // Authentication
    'auth.welcome': 'Welcome to SarkarSaathi',
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.signingIn': 'Signing In...',
    'auth.signingUp': 'Signing Up...',
    'auth.signout': 'Sign Out',

    // Dashboard
    'dashboard.welcome': 'Welcome to Your Dashboard',
    'dashboard.subtitle': 'Manage your schemes and applications',
    'dashboard.mySchemes': 'My Schemes',
    'dashboard.schemesDescription': 'View schemes you are eligible for',
    'dashboard.viewSchemes': 'View Schemes',
    'dashboard.applications': 'My Applications',
    'dashboard.applicationsDescription': 'Track your scheme applications',
    'dashboard.viewApplications': 'View Applications',
    'dashboard.profile': 'My Profile',
    'dashboard.profileDescription': 'Update your personal information',
    'dashboard.editProfile': 'Edit Profile',

    // Admin
    'admin.title': 'Admin Panel',
    'admin.dashboard': 'Admin Dashboard',
    'admin.dashboardSubtitle': 'Manage schemes, content, and users',
    'admin.welcomeAdmin': 'Welcome Admin',
    'admin.manageSchemes': 'Manage Schemes',
    'admin.schemesDescription': 'Add, edit, and manage government schemes',
    'admin.viewSchemes': 'Manage Schemes',
    'admin.manageContent': 'Manage Content',
    'admin.contentDescription': 'Edit content in multiple languages',
    'admin.editContent': 'Edit Content',
    'admin.userAnalytics': 'User Analytics',
    'admin.analyticsDescription': 'View user engagement and statistics',
    'admin.viewAnalytics': 'View Analytics',
    'admin.manageUsers': 'Manage Users',
    'admin.usersDescription': 'View and manage citizen accounts',
    'admin.viewUsers': 'View Users',
  },
  te: {
    // Navigation
    'nav.title': 'సర్కార్‌సాధి',
    'nav.home': 'హోమ్',
    'nav.schemes': 'పథకాలు',
    'nav.about': 'గురించి',
    'nav.contact': 'సంప్రదించండి',
    'nav.login': 'లాగిన్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.signout': 'సైన్ అవుట్',

    // Hero Section
    'hero.title': 'ప్రభుత్వ పథకాలను సులభంగా కనుగొనండి',
    'hero.subtitle': 'మీకు అనువైన ప్రభుత్వ పథకాలు మరియు ప్రయోజనాలను కనుగొనండి. సరళంగా, వేగంగా మరియు మీ భాషలో.',
    'hero.search.placeholder': 'పథకాలు, ప్రయోజనాలు లేదా వర్గాల కోసం వెతకండి...',
    'hero.search.button': 'వెతకండి',

    // Categories
    'categories.title': 'వర్గాల ప్రకారం బ్రౌజ్ చేయండి',
    'category.agriculture': 'వ్యవసాయం',
    'category.health': 'ఆరోగ్యం',
    'category.education': 'విద్య',
    'category.housing': 'గృహనిర్మాణం',
    'category.employment': 'ఉపాధి',
    'category.social': 'సామాజిక సంక్షేమం',

    // Schemes
    'schemes.title': 'ప్రసిద్ధ పథకాలు',
    'schemes.viewAll': 'అన్ని పథకాలను చూడండి',

    // Scheme Details
    'scheme.pmkisan.title': 'పిఎం-కిసాన్ పథకం',
    'scheme.pmkisan.description': 'వ్యవసాయ అవసరాల కోసం రైతులకు ప్రత్యక్ష ఆదాయ మద్దతు',
    'scheme.pmkisan.eligibility': 'చిన్న మరియు అంతమ రైతులు',
    'scheme.pmkisan.benefit': 'సంవత్సరానికి ₹6,000',

    'scheme.pmjay.title': 'ఆయుష్మాన్ భారత్ - పిఎం-జేఏవై',
    'scheme.pmjay.description': 'ఆర్థికంగా బలహీన కుటుంబాలకు ఆరోగ్య బీమా కవరేజ్',
    'scheme.pmjay.eligibility': 'ఎస్‌ఈసిసి డేటాబేస్ ప్రకారం',
    'scheme.pmjay.benefit': 'కుటుంబానికి ₹5 లక్షల వరకు',

    'scheme.pmay.title': 'ప్రధాన మంత్రి ఆవాస్ యోజన',
    'scheme.pmay.description': 'పట్టణ మరియు గ్రామీణ ప్రాంతాలకు సరసమైన గృహనిర్మాణ పథకం',
    'scheme.pmay.eligibility': 'ఈడబ్ల్యూఎస్, ఎల్‌ఐజి, ఎంఐజి కుటుంబాలు',
    'scheme.pmay.benefit': '₹2.67 లక్షల వరకు సబ్సిడీ',

    'scheme.mudra.title': 'ముద్ర యోజన',
    'scheme.mudra.description': 'చిన్న వ్యాపారాలు మరియు వ్యవస్థాపకుల కోసం మైక్రో-ఫైనాన్స్ పథకం',
    'scheme.mudra.eligibility': 'కార్పొరేట్ కాని వ్యాపారాలు',
    'scheme.mudra.benefit': '₹10 లక్షల వరకు రుణం',

    // Common
    'common.eligibility': 'అర్హత',
    'common.benefit': 'ప్రయోజనం',
    'common.apply': 'ఇప్పుడే దరఖాస్తు చేయండి',
    'common.learnMore': 'మరింత తెలుసుకోండి',

    // Authentication
    'auth.welcome': 'సర్కార్‌సాధికి స్వాగతం',
    'auth.signin': 'సైన్ ఇన్',
    'auth.signup': 'సైన్ అప్',
    'auth.email': 'ఇమెయిల్',
    'auth.password': 'పాస్‌వర్డ్',
    'auth.fullName': 'పూర్తి పేరు',
    'auth.phone': 'ఫోన్ నంబర్',
    'auth.signingIn': 'సైన్ ఇన్ అవుతున్నది...',
    'auth.signingUp': 'సైన్ అప్ అవుతున్నది...',
    'auth.signout': 'సైన్ అవుట్',

    // Dashboard
    'dashboard.welcome': 'మీ డాష్‌బోర్డ్‌కు స్వాగతం',
    'dashboard.subtitle': 'మీ పథకాలు మరియు దరఖాస్తులను నిర్వహించండి',
    'dashboard.mySchemes': 'నా పథకాలు',
    'dashboard.schemesDescription': 'మీకు అర్హత ఉన్న పథకాలను చూడండి',
    'dashboard.viewSchemes': 'పథకాలను చూడండి',
    'dashboard.applications': 'నా దరఖాస్తులు',
    'dashboard.applicationsDescription': 'మీ పథక దరఖాస్తులను ట్రాక్ చేయండి',
    'dashboard.viewApplications': 'దరఖాస్తులను చూడండి',
    'dashboard.profile': 'నా ప్రొఫైల్',
    'dashboard.profileDescription': 'మీ వ్యక్తిగత సమాచారాన్ని అప్‌డేట్ చేయండి',
    'dashboard.editProfile': 'ప్రొఫైల్ సవరించండి',

    // Admin
    'admin.title':  'అడ్మిన్ ప్యానెల్',
    'admin.dashboard': 'అడ్మిన్ డాష్‌బోర్డ్',
    'admin.dashboardSubtitle': 'పథకాలు, కంటెంట్ మరియు వినియోగదారులను నిర్వహించండి',
    'admin.welcomeAdmin': 'అడ్మిన్‌కు స్వాగతం',
    'admin.manageSchemes': 'పథకాలను నిర్వహించండి',
    'admin.schemesDescription': 'ప్రభుత్వ పథకాలను జోడించండి, సవరించండి మరియు నిర్వహించండి',
    'admin.viewSchemes': 'పథకాలను నిర్వహించండి',
    'admin.manageContent': 'కంటెంట్‌ను నిర్వహించండి',
    'admin.contentDescription': 'బహుళ భాషలలో కంటెంట్‌ను సవరించండి',
    'admin.editContent': 'కంటెంట్ సవరించండి',
    'admin.userAnalytics': 'వినియోగదారు విశ్లేషణలు',
    'admin.analyticsDescription': 'వినియోగదారుల నిమగ్నత మరియు గణాంకాలను చూడండి',
    'admin.viewAnalytics': 'విశ్లేషణలను చూడండి',
    'admin.manageUsers': 'వినియోగదారులను నిర్వహించండి',
    'admin.usersDescription': 'పౌర ఖాతాలను చూడండి మరియు నిర్వహించండి',
    'admin.viewUsers': 'వినియోగదారులను చూడండి',
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};
