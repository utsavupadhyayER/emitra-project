import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building2, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('hero.title')}</h3>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t('nav.home')}
              </Link>
              <Link to="/services" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t('nav.services')}
              </Link>
              <Link to="/request" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t('hero.submitRequest')}
              </Link>
              <Link to="/track" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t('nav.track')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70">
                  eMitra Seva Kendra, Main Market, Jaipur, Rajasthan 302001
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70">{t('about.workingHoursValue')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
