import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, FileText, Zap, Users } from 'lucide-react';

interface CarouselSlide {
  id: number;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  gradient: string;
  link: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    titleKey: 'carousel.slide1.title',
    descriptionKey: 'carousel.slide1.description',
    icon: <CreditCard className="w-12 h-12" />,
    gradient: 'from-orange-500 to-amber-400',
    link: '/services',
  },
  {
    id: 2,
    titleKey: 'carousel.slide2.title',
    descriptionKey: 'carousel.slide2.description',
    icon: <FileText className="w-12 h-12" />,
    gradient: 'from-green-600 to-emerald-400',
    link: '/services',
  },
  {
    id: 3,
    titleKey: 'carousel.slide3.title',
    descriptionKey: 'carousel.slide3.description',
    icon: <Zap className="w-12 h-12" />,
    gradient: 'from-blue-600 to-sky-400',
    link: '/services',
  },
  {
    id: 4,
    titleKey: 'carousel.slide4.title',
    descriptionKey: 'carousel.slide4.description',
    icon: <Users className="w-12 h-12" />,
    gradient: 'from-purple-600 to-violet-400',
    link: '/services',
  },
];

const HeroCarousel: React.FC = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Duplicate slides for infinite scroll effect
  const allSlides = [...slides, ...slides];

  return (
    <section className="py-6 overflow-hidden bg-gradient-to-b from-saffron-light to-background">
      <div
        ref={scrollRef}
        className="scroll-container px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {allSlides.map((slide, index) => (
          <motion.div
            key={`${slide.id}-${index}`}
            className="scroll-item"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={slide.link}>
              <div className={`carousel-card bg-gradient-to-br ${slide.gradient} text-white`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div className="opacity-80">{slide.icon}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {t(slide.titleKey)}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
                      {t(slide.descriptionKey)}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>{t('services.learnMore')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
