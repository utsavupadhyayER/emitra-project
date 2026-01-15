import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface RequestResult {
  requestId: string;
  fullName: string;
  serviceType: string;
  status: 'pending' | 'inProgress' | 'completed';
  createdAt: string;
}

const TrackPage: React.FC = () => {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState('');
  const [requestId, setRequestId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<RequestResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check localStorage for demo
    const requests = JSON.parse(localStorage.getItem('emitraRequests') || '[]');
    const found = requests.find(
      (req: any) => req.requestId === requestId && req.mobile === mobile
    );

    if (found) {
      setResult(found);
    } else {
      setNotFound(true);
    }

    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-india" />;
      case 'inProgress':
        return <Loader2 className="w-6 h-6 text-primary animate-spin" />;
      default:
        return <Clock className="w-6 h-6 text-amber-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('track.status.completed');
      case 'inProgress':
        return t('track.status.inProgress');
      default:
        return t('track.status.pending');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-india-light text-green-india';
      case 'inProgress':
        return 'bg-saffron-light text-primary';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

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
            {t('track.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('track.subtitle')}
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleSearch} className="bg-card rounded-3xl p-6 md:p-8 shadow-medium mb-8">
            <div className="space-y-5">
              {/* Mobile */}
              <div>
                <label className="form-label">{t('track.form.mobile')} *</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="form-input"
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
              </div>

              {/* Request ID */}
              <div>
                <label className="form-label">{t('track.form.requestId')} *</label>
                <input
                  type="text"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value.toUpperCase())}
                  className="form-input"
                  placeholder="EMT123456ABC"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSearching}
                className="btn-hero-primary w-full"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>{t('track.form.submit')}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-6 md:p-8 shadow-medium"
            >
              <div className="flex items-center gap-4 mb-6">
                {getStatusIcon(result.status)}
                <div>
                  <p className="text-sm text-muted-foreground">{t('track.result.status')}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                    {getStatusText(result.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{t('request.success.requestId')}</span>
                  <span className="font-semibold text-primary">{result.requestId}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">{t('track.result.service')}</span>
                  <span className="font-medium">{t(`services.${result.serviceType}.name`)}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-muted-foreground">{t('track.result.lastUpdated')}</span>
                  <span className="font-medium">
                    {new Date(result.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Not Found */}
          {notFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 rounded-2xl p-6 text-center"
            >
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive font-medium">
                Request not found. Please check your details.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TrackPage;
