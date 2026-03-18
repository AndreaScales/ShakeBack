import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysisPage from "./pages/ResumeAnalysis";
import CareerStrategy from "./pages/CareerStrategy";
import JobMatchPage from "./pages/JobMatch";
import InterviewCoach from "./pages/InterviewCoach";
import ApplicationTracker from "./pages/ApplicationTracker";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/resume" element={<ResumeAnalysisPage />} />
					<Route path="/strategy" element={<CareerStrategy />} />
					<Route path="/match" element={<JobMatchPage />} />
					<Route path="/interview" element={<InterviewCoach />} />
					<Route path="/tracker" element={<ApplicationTracker />} />
				</Route>
				<Route path="/home" element={<Navigate to="/" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
