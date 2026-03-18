import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const InterviewCoach = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleGenerate = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    setRevealed(new Set());
    try {
      const data = await api.generateQuestions({ job_description: jobDesc });
      setQuestions(data.questions);
      toast.success("Interview questions generated");
    } catch {
      toast.error("Failed to generate questions. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-foreground">Interview Coach</h1>
        <p className="text-muted-foreground mt-1">Practice with AI-generated questions tailored to your target role.</p>
      </header>

      <div className="border border-border rounded-xl p-6 bg-card space-y-4">
        <label className="label-uppercase block">Job Description</label>
        <Textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste the job description you're preparing for…"
          className="min-h-[120px] resize-none"
        />
        <Button onClick={handleGenerate} disabled={loading || !jobDesc.trim()}>
          {loading ? "Generating…" : "Generate Questions"}
        </Button>
      </div>

      {questions.length > 0 && (
        <motion.div className="mt-8 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="label-uppercase mb-4">Practice Questions</h2>
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-border rounded-xl p-5 bg-card cursor-pointer hover:border-primary/20 transition-colors"
              onClick={() => toggleReveal(i)}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{q}</p>
                  {revealed.has(i) ? (
                    <p className="text-xs text-muted-foreground mt-2 italic">Take a moment to formulate your answer using the STAR method.</p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-2">Click to reveal coaching tip</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default InterviewCoach;
