import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Download, FileText } from "lucide-react";

interface Document {
  _id: string;
  title: string;
  category?: string;
  fileName: string;
}

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/documents")
      .then((res) => setDocuments(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading documents...</div>;
  }

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Download Documents
      </h1>

      {documents.length === 0 && (
        <p className="text-center text-muted-foreground">
          No documents available
        </p>
      )}

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="flex items-center justify-between bg-card p-5 rounded-xl shadow"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">{doc.title}</p>
                {doc.category && (
                  <p className="text-sm text-muted-foreground">
                    {doc.category}
                  </p>
                )}
              </div>
            </div>

            <a
              href={`http://localhost:5000/documents/${doc.fileName}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;
