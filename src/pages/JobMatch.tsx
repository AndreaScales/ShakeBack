import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api, type JobMatch as JobMatchResult } from "@/lib/api";
import { toast } from "sonner";

const JobMatchPage = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  const handleMatch = async () => {
    if (!resumeText.trim() || !jobDesc.trim()) return;
    setLoading(true);
    try {
      const data = await api.matchJob({ resume_text: resumeText, job_description_text: jobDesc });
      setResult(data);
      toast.success("Match analysis complete");
    } catch {
      toast.error("Failed to analyze. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-foreground">Job Match Analyzer</h1>
        <p className="text-muted-foreground mt-1">Compare your resume against any job description.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-card p-6">
          <label className="label-uppercase mb-3 block">Your Resume</label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here…"
            className="min-h-[240px] resize-none border-none focus-visible:ring-0 bg-transparent"
          />
        </div>
        <div className="bg-secondary/30 p-6">
          <label className="label-uppercase mb-3 block">Job Description</label>
          <Textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here…"
            className="min-h-[240px] resize-none border-none focus-visible:ring-0 bg-transparent"
          />
        </div>
      </div>

      <Button onClick={handleMatch} disabled={loading || !resumeText.trim() || !jobDesc.trim()} className="mt-4">
        {loading ? "Analyzing…" : "Analyze Match"}
      </Button>

      {result && (
        <motion.div className="mt-8 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Score */}
          <div className="border border-border rounded-xl p-6 bg-card">
            <div className="flex justify-between items-end mb-3">
              <span className="label-uppercase">Match Score</span>
              <span className="text-3xl font-serif text-success tabular-nums">{result.match_score}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.match_score}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-success rounded-full"
              />
            </div>
          </div>

          {/* Missing keywords */}
          {result.missing_keywords.length > 0 && (
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="label-uppercase mb-3">Missing Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 bg-destructive/10 text-destructive text-xs font-medium rounded-md">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Bullet suggestions */}
          {result.bullet_suggestions.length > 0 && (
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="label-uppercase mb-3">Resume Bullet Suggestions</h2>
              <ul className="space-y-2">
                {result.bullet_suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cover letter */}
          {result.cover_letter && (
            <div className="border border-border rounded-xl p-6 bg-card">
              <h2 className="label-uppercase mb-3">Generated Cover Letter</h2>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{result.cover_letter}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobMatchPage;
