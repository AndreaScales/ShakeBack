import { motion } from "framer-motion";

interface HealthScoreProps {
  score: number;
  size?: "sm" | "lg";
}

const HealthScore = ({ score, size = "lg" }: HealthScoreProps) => {
  const isLg = size === "lg";
  const dim = isLg ? 192 : 80;
  const r = isLg ? 88 : 34;
  const cx = dim / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className={`relative flex items-center justify-center ${isLg ? "w-48 h-48" : "w-20 h-20"}`}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${dim} ${dim}`}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="currentColor" strokeWidth={isLg ? 4 : 3} className="text-secondary" />
        <motion.circle
          cx={cx} cy={cx} r={r} fill="none" stroke="currentColor" strokeWidth={isLg ? 4 : 3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * score) / 100 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-success"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-serif tabular-nums text-foreground ${isLg ? "text-5xl" : "text-xl"}`}>{score}</span>
        {isLg && <span className="label-uppercase mt-1">Readiness</span>}
      </div>
    </div>
  );
};

export default HealthScore;
