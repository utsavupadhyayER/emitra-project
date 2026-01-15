import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  FileText, 
  Receipt, 
  FileCheck, 
  FilePlus,
  DollarSign,
  Home,
  Users,
  HeartHandshake,
  ClipboardList
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const services = [
  { icon: CreditCard, nameKey: 'services.aadhaar.name', descriptionKey: 'services.aadhaar.description' },
  { icon: Users, nameKey: 'services.janAadhaar.name', descriptionKey: 'services.janAadhaar.description' },
  { icon: Receipt, nameKey: 'services.billPayments.name', descriptionKey: 'services.billPayments.description' },
  { icon: FileCheck, nameKey: 'services.birthCertificate.name', descriptionKey: 'services.birthCertificate.description' },
  { icon: FileText, nameKey: 'services.deathCertificate.name', descriptionKey: 'services.deathCertificate.description' },
  { icon: DollarSign, nameKey: 'services.incomeCertificate.name', descriptionKey: 'services.incomeCertificate.description' },
  { icon: Home, nameKey: 'services.domicileCertificate.name', descriptionKey: 'services.domicileCertificate.description' },
  { icon: FilePlus, nameKey: 'services.casteCertificate.name', descriptionKey: 'services.casteCertificate.description' },
  { icon: HeartHandshake, nameKey: 'services.pension.name', descriptionKey: 'services.pension.description' },
  { icon: ClipboardList, nameKey: 'services.formFilling.name', descriptionKey: 'services.formFilling.description' },
];

const ServicesPage: React.FC = () => {
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
            {t('services.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.nameKey}
              icon={service.icon}
              nameKey={service.nameKey}
              descriptionKey={service.descriptionKey}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
