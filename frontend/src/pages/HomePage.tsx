import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  FileText,
  Receipt,
  FileCheck,
  DollarSign,
  Users,
  HeartHandshake,
  Zap,
  Shield,
  ThumbsUp,
} from 'lucide-react';

import HeroCarousel from '@/components/HeroCarousel';
import ServiceCard from '@/components/ServiceCard';
import StatCard from '@/components/StatCard';
import WhyUsCard from '@/components/WhyUsCard';

const services = [
  { icon: CreditCard, nameKey: 'services.aadhaar.name', descriptionKey: 'services.aadhaar.description' },
  { icon: Users, nameKey: 'services.janAadhaar.name', descriptionKey: 'services.janAadhaar.description' },
  { icon: Receipt, nameKey: 'services.billPayments.name', descriptionKey: 'services.billPayments.description' },
  { icon: FileCheck, nameKey: 'services.birthCertificate.name', descriptionKey: 'services.birthCertificate.description' },
  { icon: FileText, nameKey: 'services.deathCertificate.name', descriptionKey: 'services.deathCertificate.description' },
  { icon: DollarSign, nameKey: 'services.incomeCertificate.name', descriptionKey: 'services.incomeCertificate.description' },
];

const fintechServices = [
  'Financial Services',
  'Insurance',
  'Travel Booking (IRCTC)',
  'Bill Payments',
  'E-commerce (Amazon, Flipkart)',
  'Vouchers & OTT',
  'Mobile & DTH Recharges',
  'PAN Card Services',
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-saffron-light/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-primary font-medium mb-6"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/services" className="btn-hero-primary w-full sm:w-auto">
                {t('hero.viewServices')}
              </Link>
              <Link to="/request" className="btn-hero-secondary w-full sm:w-auto">
                {t('hero.submitRequest')}
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.nameKey}
                icon={service.icon}
                nameKey={service.nameKey}
                descriptionKey={service.descriptionKey}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              {t('hero.viewServices')} →
            </Link>
          </div>
        </div>
      </section>

      {/* FinTech Services Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white dark:bg-background rounded-2xl shadow-lg p-8 md:p-12">

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center text-sm font-semibold text-primary uppercase mb-2"
            >
              Growing Service Offering
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-center mb-6"
            >
              120+ Service Providers on Board
            </motion.h2>

            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
              Our on-ground presence helps us understand customer needs and continuously
              add new FinTech & Digital services to increase your convenience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {fintechServices.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-secondary/50 rounded-xl px-4 py-3"
                >
                  <FileCheck className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">{service}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/services" className="btn-hero-primary">
                View All Services
              </Link>
              <Link to="/contact" className="btn-hero-secondary">
                Apply Now
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title">{t('whyUs.title')}</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <WhyUsCard icon={Zap} title={t('whyUs.fast.title')} description={t('whyUs.fast.description')} delay={0} />
            <WhyUsCard icon={Shield} title={t('whyUs.trusted.title')} description={t('whyUs.trusted.description')} delay={0.1} />
            <WhyUsCard icon={ThumbsUp} title={t('whyUs.affordable.title')} description={t('whyUs.affordable.description')} delay={0.2} />
            <WhyUsCard icon={HeartHandshake} title={t('whyUs.support.title')} description={t('whyUs.support.description')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value="5000+" label={t('stats.requests')} delay={0} />
          <StatCard value="10+" label={t('stats.services')} delay={0.1} />
          <StatCard value="10+" label={t('stats.years')} delay={0.2} />
          <StatCard value="4500+" label={t('stats.customers')} delay={0.3} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {t('request.subtitle')}
          </h2>
          <Link
            to="/request"
            className="btn-hero-secondary bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            {t('hero.submitRequest')}
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
