import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api, type CareerPlan } from "@/lib/api";
import { toast } from "sonner";

const CareerStrategy = () => {
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<CareerPlan | null>(null);

  const handleGenerate = async () => {
    if (!goals.trim()) return;
    setLoading(true);
    try {
      const data = await api.generatePlan({ career_goals: goals });
      setPlan(data);
      toast.success("Career plan generated");
    } catch {
      toast.error("Failed to generate plan. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-foreground">Career Strategy</h1>
        <p className="text-muted-foreground mt-1">Get a personalized 30-day job search plan.</p>
      </header>

      <div className="border border-border rounded-xl p-6 bg-card space-y-4">
        <label className="label-uppercase block">Your Career Goals</label>
        <Textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="e.g., Transition from data analyst to product manager at a mid-stage startup…"
          className="min-h-[120px] resize-none"
        />
        <Button onClick={handleGenerate} disabled={loading || !goals.trim()}>
          {loading ? "Generating…" : "Generate Plan"}
        </Button>
      </div>

      {plan && (
        <motion.div className="mt-8 space-y-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="label-uppercase mb-4">Your 30-Day Roadmap</h2>
          {plan.weeks.map((week, i) => (
            <div key={i} className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-primary bg-card mt-1.5" />
                {i < plan.weeks.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-6">
                <span className="text-xs font-bold text-primary">Week {week.week}</span>
                <p className="text-sm font-medium text-foreground mt-0.5">{week.focus}</p>
                <ul className="mt-2 space-y-1">
                  {week.tasks.map((task, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0" /> {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CareerStrategy;
