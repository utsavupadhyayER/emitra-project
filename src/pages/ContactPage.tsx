import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageCircle, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully!');
    setFormData({ name: '', mobile: '', message: '' });
    setIsSubmitting(false);
  };

  const whatsappNumber = '919876543210';
  const whatsappMessage = encodeURIComponent('Hello! I need help with eMitra services.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

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
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.address')}</h3>
                  <p className="text-muted-foreground">
                    eMitra Seva Kendra<br />
                    Main Market, Near Bus Stand<br />
                    Jaipur, Rajasthan 302001
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('contact.phone')}</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('about.workingHours')}</h3>
                  <p className="text-muted-foreground">{t('about.workingHoursValue')}</p>
                  <p className="text-muted-foreground">{t('about.closed')}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp & Map */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex-1 justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                {t('contact.whatsapp')}
              </a>
              <a
                href="https://maps.google.com/?q=Jaipur,Rajasthan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary flex-1 justify-center text-center"
              >
                <MapPin className="w-5 h-5" />
                {t('contact.mapLink')}
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-6 md:p-8 shadow-medium">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {t('contact.subtitle')}
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="form-label">{t('contact.form.name')} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t('contact.form.name')}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">{t('contact.form.mobile')} *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="9876543210"
                    maxLength={10}
                    required
                  />
                </div>

                <div>
                  <label className="form-label">{t('contact.form.message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input min-h-[120px] resize-none"
                    placeholder={t('contact.form.message')}
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-hero-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('contact.form.submit')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
