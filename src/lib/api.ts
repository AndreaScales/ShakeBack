const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface ResumeAnalysis {
  skills: string[];
  strengths: string[];
  improvement_points: string[];
  career_overview?: string;
}

export interface CareerPlan {
  weeks: {
    week: number;
    focus: string;
    tasks: string[];
  }[];
}

export interface JobMatch {
  match_score: number;
  missing_keywords: string[];
  bullet_suggestions: string[];
  cover_letter?: string;
}

export interface InterviewQuestions {
  questions: string[];
}

export interface Application {
  id?: string;
  company: string;
  role: string;
  status: "Applied" | "Interviewing" | "Offer" | "Rejected";
  notes?: string;
  interview_date?: string;
  applied_date?: string;
}

export const api = {
  analyzeResume: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetch(`${API_BASE}/resume/analyze`, { method: "POST", body: formData })
      .then(r => { if (!r.ok) throw new Error("Failed"); return r.json() as Promise<ResumeAnalysis>; });
  },

  generatePlan: (data: { user_id?: string; career_goals: string; skills?: string[] }) =>
    request<CareerPlan>("/career/plan", { method: "POST", body: JSON.stringify(data) }),

  matchJob: (data: { resume_text: string; job_description_text: string }) =>
    request<JobMatch>("/job/match", { method: "POST", body: JSON.stringify(data) }),

  generateQuestions: (data: { job_description: string }) =>
    request<InterviewQuestions>("/interview/questions", { method: "POST", body: JSON.stringify(data) }),

  getApplications: () =>
    request<Application[]>("/applications/"),

  createApplication: (data: Omit<Application, "id">) =>
    request<Application>("/applications/", { method: "POST", body: JSON.stringify(data) }),

  updateApplication: (id: string, data: Partial<Application>) =>
    request<Application>(`/applications/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  deleteApplication: (id: string) =>
    request<void>(`/applications/${id}`, { method: "DELETE" }),
};
