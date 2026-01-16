import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", mobile: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "9785358031";
  const whatsappMessage = encodeURIComponent(
    "Hello! I need help with eMitra services."
  );
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-saffron-light rounded-xl flex items-center justify-center">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {t("contact.address")}
                  </h3>
                  <p className="text-muted-foreground">
                    Raj Computers <br />
                    Near Bank Of India, NH21 <br />
                    Chhonkarwara Kalan, Bharatpur, Rajasthan 321407
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-saffron-light rounded-xl flex items-center justify-center">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {t("contact.phone")}
                  </h3>
                  <p className="text-muted-foreground">+91 9785358031</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-card p-6 rounded-2xl shadow-card">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-saffron-light rounded-xl flex items-center justify-center">
                  <Clock className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {t("about.workingHours")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("about.workingHoursValue")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("about.closed")}
                  </p>
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
                {t("contact.whatsapp")}
              </a>
              <a
                href="https://www.google.co.in/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary flex-1 justify-center"
              >
                <MapPin className="w-5 h-5" />
                {t("contact.mapLink")}
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card p-6 md:p-8 rounded-3xl shadow-medium"
            >
              <h3 className="text-xl font-semibold mb-6">
                {t("contact.subtitle")}
              </h3>

              <div className="space-y-5">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.form.name")}
                  className="form-input"
                  required
                />

                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9785358031"
                  maxLength={10}
                  className="form-input"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message")}
                  className="form-input min-h-[120px]"
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-hero-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("contact.form.submit")}
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
