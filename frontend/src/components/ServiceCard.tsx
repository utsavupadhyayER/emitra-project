import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  nameKey: string;
  descriptionKey: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, nameKey, descriptionKey, delay = 0 }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
    >
      <Link to="/request">
        <div className="service-card group h-full">
          <div className="w-14 h-14 rounded-xl bg-saffron-light flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
            <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {t(nameKey)}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {t(descriptionKey)}
          </p>
          <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
            <span>{t('services.requestService')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
