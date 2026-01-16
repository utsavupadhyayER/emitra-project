import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminDocumentsPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !file) {
      toast.error("Title and PDF file are required");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("Not authorized");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file);

    setLoading(true);

    try {
      await api.post("/documents/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Document uploaded successfully");
      setTitle("");
      setCategory("");
      setFile(null);
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin – Upload Document
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-3xl shadow space-y-5"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
          className="form-input"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (Aadhaar / PAN / Pension)"
          className="form-input"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="form-input"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-hero-primary w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload Document
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminDocumentsPage;
