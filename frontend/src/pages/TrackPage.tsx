import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, Clock, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { api } from "@/services/api";

interface RequestResult {
  requestId: string;
  serviceType: string;
  status: "pending" | "inProgress" | "completed";
  createdAt: string;
}

const TrackPage: React.FC = () => {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState("");
  const [requestId, setRequestId] = useState("");
  const [result, setResult] = useState<RequestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const res = await api.get("/requests/track", {
        params: { mobile, requestId },
      });
      setResult(res.data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-md">
        <form
          onSubmit={handleSearch}
          className="bg-card p-6 rounded-3xl shadow-medium mb-6 space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">
            {t("track.title")}
          </h1>

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="form-input"
            maxLength={10}
            required
          />

          <input
            value={requestId}
            onChange={(e) => setRequestId(e.target.value.toUpperCase())}
            placeholder="Request ID"
            className="form-input"
            required
          />

          <button type="submit" className="btn-hero-primary w-full">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                {t("track.form.submit")}
              </>
            )}
          </button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-6 rounded-3xl shadow-medium"
          >
            <div className="flex items-center gap-3 mb-4">
              {result.status === "completed" ? (
                <CheckCircle className="text-green-india w-6 h-6" />
              ) : result.status === "inProgress" ? (
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
              ) : (
                <Clock className="w-6 h-6 text-amber-500" />
              )}
              <span className="font-semibold capitalize">
                {result.status}
              </span>
            </div>

            <p>
              <strong>Request ID:</strong> {result.requestId}
            </p>
            <p>
              <strong>Service:</strong> {result.serviceType}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(result.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        )}

        {notFound && (
          <div className="bg-destructive/10 p-4 rounded-xl text-center">
            <AlertCircle className="mx-auto text-destructive w-10 h-10 mb-2" />
            <p className="text-destructive font-medium">
              Request not found. Please check details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPage;
