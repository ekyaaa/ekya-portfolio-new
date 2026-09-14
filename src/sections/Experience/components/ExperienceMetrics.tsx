import { ExperienceMetric } from '../experience.types';

interface ExperienceMetricsProps {
  metrics?: ExperienceMetric[];
}

export function ExperienceMetrics({ metrics }: ExperienceMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="experience-metrics-group">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-unit">
          <span className="metric-val font-heading">{metric.value}</span>
          <span className="metric-lbl font-mono">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
