import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="stats-card"
    >
      <span className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
};

export default StatCard;
