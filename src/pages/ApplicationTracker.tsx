import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { api, type Application } from "@/lib/api";
import { toast } from "sonner";

const statuses: Application["status"][] = ["Applied", "Interviewing", "Offer", "Rejected"];

const statusStyle = (s: Application["status"]) => {
  if (s === "Offer") return "text-success";
  if (s === "Rejected") return "text-rose";
  return "text-muted-foreground";
};

const ApplicationTracker = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", status: "Applied" as Application["status"], notes: "" });
  const [loading, setLoading] = useState(false);

  // Try loading from API, fallback to local state
  useEffect(() => {
    api.getApplications().then(setApps).catch(() => {});
  }, []);

  const handleAdd = async () => {
    if (!form.company || !form.role) return;
    setLoading(true);
    try {
      const newApp = await api.createApplication({ ...form, applied_date: new Date().toISOString().split("T")[0] });
      setApps((prev) => [...prev, newApp]);
      toast.success("Application added");
    } catch {
      // Fallback: add locally
      setApps((prev) => [...prev, { ...form, id: crypto.randomUUID(), applied_date: new Date().toISOString().split("T")[0] }]);
      toast.success("Application added locally");
    }
    setForm({ company: "", role: "", status: "Applied", notes: "" });
    setShowForm(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try { await api.deleteApplication(id); } catch {}
    setApps((prev) => prev.filter((a) => a.id !== id));
  };

  const handleStatusChange = async (id: string, status: Application["status"]) => {
    try { await api.updateApplication(id, { status }); } catch {}
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-serif text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-1">Track every application in one place.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </header>

      {/* Add form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border border-border rounded-xl p-5 bg-card mb-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <Input placeholder="Notes (optional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <div className="flex gap-2">
            <Button onClick={handleAdd} disabled={loading || !form.company || !form.role} size="sm">Save</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)} size="sm">Cancel</Button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      {apps.length === 0 ? (
        <div className="border border-border rounded-xl p-12 bg-card text-center">
          <p className="text-sm text-muted-foreground">No applications tracked yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-4 py-2.5 bg-secondary/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Company</span><span>Role</span><span>Status</span><span />
          </div>
          {apps.map((app, i) => (
            <div key={app.id || i} className={`grid grid-cols-[1fr_1fr_auto_auto] gap-4 items-center px-4 py-3 ${i < apps.length - 1 ? "border-b border-border" : ""}`}>
              <div>
                <p className="text-sm font-medium text-foreground">{app.company}</p>
                {app.notes && <p className="text-xs text-muted-foreground truncate">{app.notes}</p>}
              </div>
              <p className="text-sm text-foreground">{app.role}</p>
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app.id!, e.target.value as Application["status"])}
                className={`text-xs font-medium bg-transparent border-none cursor-pointer ${statusStyle(app.status)}`}
              >
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => handleDelete(app.id!)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ApplicationTracker;
