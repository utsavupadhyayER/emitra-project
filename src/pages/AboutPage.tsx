import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Award, Users, Building2 } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-primary font-medium">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Icon Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-saffron-light to-green-india-light rounded-3xl flex items-center justify-center">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-primary rounded-3xl flex items-center justify-center shadow-strong">
                <Building2 className="w-20 h-20 md:w-28 md:h-28 text-primary-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 rounded-2xl bg-saffron-light">
                <Award className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{t('about.owner')}</h3>
                <p className="text-sm text-muted-foreground">{t('about.experience')}</p>
              </div>

              <div className="p-6 rounded-2xl bg-green-india-light">
                <Clock className="w-8 h-8 text-green-india mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{t('about.workingHours')}</h3>
                <p className="text-sm text-muted-foreground">{t('about.workingHoursValue')}</p>
                <p className="text-sm text-muted-foreground">{t('about.closed')}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-6">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">5000+</span>
                <span className="text-sm text-muted-foreground">{t('stats.customers')}</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">10+</span>
                <span className="text-sm text-muted-foreground">{t('stats.services')}</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary">10+</span>
                <span className="text-sm text-muted-foreground">{t('stats.years')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
