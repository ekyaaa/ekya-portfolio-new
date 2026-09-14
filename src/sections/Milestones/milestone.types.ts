export type MilestoneType = 'competition' | 'award' | 'finalist' | 'showcase';
export type MilestoneScope = 'internal' | 'regional' | 'national';

export interface MilestoneSubEvent {
  id: string;
  title: string;
  event: string;
  date: string;
  type: MilestoneType;
  scope?: MilestoneScope;
  organizer?: string;
  location?: string;
  result?: string;
  role?: string;
  summary: string;
  projectOrChallenge: string;
  constraintOrHighlight?: string;
  outcome?: string;
  mediaKeys?: string[];
  certificateUrl?: string;
  projectUrl?: string;
  newsUrl?: string;
}

export interface ProgressionStage {
  step: string;
  title: string;
  tag: string;
  description: string;
}

export type MediaFit = 'auto' | 'cover' | 'contain';
export type MediaKind = 'photo' | 'screenshot' | 'certificate' | 'poster' | 'announcement';

export interface MilestoneMediaItem {
  filename: string;
  folder?: string;
  alt: string;
  caption?: string;
  isHero?: boolean;
  isDocument?: boolean;
  featured?: boolean;
  fit?: MediaFit;
  position?: string;
  aspectRatio?: string;
  kind?: MediaKind;
}

export interface MilestoneLinks {
  project?: string;
  projectLabel?: string;
  event?: string;
  verification?: string;
  verificationLabel?: string;
  certificate?: string;
  certificateLabel?: string;
}

export interface MilestoneStory {
  context: string;
  projectAndChallenge: string;
  roleContribution?: string;
  constraint?: string;
  outcome: string;
}

export interface Milestone {
  id: string;
  year: number;
  month: string;
  sortDate: string;
  title: string;
  subtitle?: string;
  type: MilestoneType;
  scope?: MilestoneScope;
  organizer?: string;
  location?: string;
  result?: string;
  role?: string;
  summary: string;
  story: MilestoneStory;
  subEvents?: MilestoneSubEvent[];
  progressionStages?: ProgressionStage[];
  highlights?: string[];
  links?: MilestoneLinks;
  mediaFolder: string;
  coverFilename?: string;
  coverMediaConfig?: Partial<MilestoneMediaItem>;
  gallery: MilestoneMediaItem[];
  relatedMilestoneId?: string;
  relatedMilestoneLabel?: string;
  emphasis: 'high' | 'standard';
  featured?: boolean;
  hidden?: boolean;
}
