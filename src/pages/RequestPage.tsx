import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const serviceOptions = [
  { value: 'aadhaar', labelKey: 'services.aadhaar.name' },
  { value: 'janAadhaar', labelKey: 'services.janAadhaar.name' },
  { value: 'billPayments', labelKey: 'services.billPayments.name' },
  { value: 'birthCertificate', labelKey: 'services.birthCertificate.name' },
  { value: 'deathCertificate', labelKey: 'services.deathCertificate.name' },
  { value: 'incomeCertificate', labelKey: 'services.incomeCertificate.name' },
  { value: 'domicileCertificate', labelKey: 'services.domicileCertificate.name' },
  { value: 'casteCertificate', labelKey: 'services.casteCertificate.name' },
  { value: 'pension', labelKey: 'services.pension.name' },
  { value: 'formFilling', labelKey: 'services.formFilling.name' },
];

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  serviceType: string;
  message: string;
}

const RequestPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobile: '',
    email: '',
    serviceType: '',
    message: '',
  });

  const generateRequestId = () => {
    const prefix = 'EMT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      toast.error(t('request.form.fullName') + ' is required');
      return;
    }
    if (!formData.mobile.trim() || !/^[0-9]{10}$/.test(formData.mobile)) {
      toast.error('Valid 10-digit mobile number required');
      return;
    }
    if (!formData.serviceType) {
      toast.error(t('request.form.serviceType') + ' is required');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRequestId = generateRequestId();
    setRequestId(newRequestId);
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Save to localStorage for demo
    const requests = JSON.parse(localStorage.getItem('emitraRequests') || '[]');
    requests.push({
      ...formData,
      requestId: newRequestId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('emitraRequests', JSON.stringify(requests));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-india-light rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-india" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {t('request.success.title')}
            </h1>
            <p className="text-muted-foreground mb-6">
              {t('request.success.message')}
            </p>
            <div className="bg-saffron-light rounded-2xl p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                {t('request.success.requestId')}
              </p>
              <p className="text-2xl font-bold text-primary">{requestId}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('request.success.note')}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

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
            {t('request.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('request.subtitle')}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-6 md:p-10 shadow-medium">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="form-label">{t('request.form.fullName')} *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder={t('request.form.fullName')}
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="form-label">{t('request.form.mobile')} *</label>
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

              {/* Email */}
              <div>
                <label className="form-label">{t('request.form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="email@example.com"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="form-label">{t('request.form.serviceType')} *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">{t('request.form.selectService')}</option>
                  {serviceOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="form-label">{t('request.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input min-h-[120px] resize-none"
                  placeholder={t('request.form.message')}
                  rows={4}
                />
              </div>

              {/* Document Upload */}
              <div>
                <label className="form-label">{t('request.form.document')}</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-hero-primary w-full disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  t('request.form.submit')
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestPage;
