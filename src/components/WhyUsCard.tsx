import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface WhyUsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const WhyUsCard: React.FC<WhyUsCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-16 h-16 rounded-full bg-green-india-light flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-green-india" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default WhyUsCard;
