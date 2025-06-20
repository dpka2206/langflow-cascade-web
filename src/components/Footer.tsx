
import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { key: 'footer.about', href: '#' },
    { key: 'footer.privacy', href: '#' },
    { key: 'footer.terms', href: '#' },
    { key: 'footer.help', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{t('nav.title')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.contact')}</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: info@myscheme.gov.in</p>
              <p>Phone: 1800-123-456</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
