import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";

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
  const [requestId, setRequestId] = useState("");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    mobile: "",
    email: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobile || !formData.serviceType) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post("/requests", formData);
      setRequestId(res.data.requestId);
      setIsSuccess(true);
    } catch (error) {
      toast.error("Failed to submit request. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-8 rounded-3xl text-center shadow-lg max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-green-india mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {t("request.success.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("request.success.message")}
          </p>
          <div className="bg-saffron-light rounded-xl p-4">
            <p className="text-sm text-muted-foreground">
              {t("request.success.requestId")}
            </p>
            <p className="text-xl font-bold text-primary">{requestId}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card p-8 rounded-3xl shadow-medium space-y-6"
          >
            <h1 className="text-3xl font-bold text-center">
              {t("request.title")}
            </h1>

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t("request.form.fullName")}
              className="form-input"
              required
            />

            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="9876543210"
              className="form-input"
              maxLength={10}
              required
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="form-input"
            />

            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">{t("request.form.selectService")}</option>
              <option value="aadhaar">Aadhaar</option>
              <option value="janAadhaar">Jan Aadhaar</option>
              <option value="pan">PAN Card</option>
              <option value="billPayments">Bill Payments</option>
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("request.form.message")}
              className="form-input min-h-[120px]"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-hero-primary w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                t("request.form.submit")
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestPage;
