import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, type ResumeAnalysis as ResumeResult } from "@/lib/api";
import { toast } from "sonner";

const ResumeAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await api.analyzeResume(file);
      setResult(data);
      toast.success("Resume analyzed successfully");
    } catch {
      toast.error("Failed to analyze resume. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-foreground">Resume Analysis</h1>
        <p className="text-muted-foreground mt-1">Upload your resume for an AI-powered breakdown.</p>
      </header>

      {/* Upload area */}
      <div
        className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card hover:border-primary/30 transition-colors cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById("resume-input")?.click()}
      >
        <input id="resume-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        {file ? (
          <p className="text-sm font-medium text-foreground flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> {file.name}
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground">Drop your resume here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX supported</p>
          </>
        )}
      </div>

      {file && (
        <Button onClick={handleUpload} disabled={loading} className="mt-4">
          {loading ? "Analyzing…" : "Analyze Resume"}
        </Button>
      )}

      {/* Results */}
      {result && (
        <motion.div className="mt-8 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {result.career_overview && (
            <section className="border border-border rounded-xl p-6 bg-card">
              <h2 className="label-uppercase mb-3">Career Overview</h2>
              <p className="text-sm text-foreground leading-relaxed">{result.career_overview}</p>
            </section>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <section className="border border-border rounded-xl p-6 bg-card">
              <h2 className="label-uppercase mb-3">Skills Identified</h2>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-md">{s}</span>
                ))}
              </div>
            </section>

            <section className="border border-border rounded-xl p-6 bg-card">
              <h2 className="label-uppercase mb-3 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-success" /> Strengths</h2>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-success mt-2 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="border border-border rounded-xl p-6 bg-card">
            <h2 className="label-uppercase mb-3 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-warning" /> Areas to Improve</h2>
            <ul className="space-y-2">
              {result.improvement_points.map((s, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-warning mt-2 shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </section>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeAnalysisPage;
