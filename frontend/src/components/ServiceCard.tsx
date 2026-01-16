import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  icon: React.ElementType;
  nameKey: string;
  descriptionKey: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  nameKey,
  descriptionKey,
  delay = 0,
}) => {
  const { t } = useTranslation();

  const phoneNumber = "919785358031";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card p-6 rounded-2xl shadow-card flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 bg-saffron-light rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        <h3 className="text-lg font-semibold mb-2">
          {t(nameKey)}
        </h3>

        <p className="text-muted-foreground text-sm">
          {t(descriptionKey)}
        </p>
      </div>

      {/* Call Now Button */}
      <a
        href={`tel:+${phoneNumber}`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
    </motion.div>
  );
};

export default ServiceCard;
