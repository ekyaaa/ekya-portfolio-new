export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Internship'
  | 'Freelance'
  | 'Contract';

export type ExperienceMetric = {
  value: string;
  label: string;
};

export type Experience = {
  id: string;
  company: string;
  affiliation?: string;
  companyUrl?: string;
  role: string;
  scope?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  featured?: boolean;
  employmentType: EmploymentType;
  location?: string;
  remote?: boolean;
  summary: string;
  responsibilities: string[];
  metrics?: ExperienceMetric[];
  tools: string[];
  logo?: string;
  previewImages?: string[];
  previewCaption?: string;
};

export type ToolboxCategory = {
  category: string;
  items: string[];
  supporting?: string[];
};
