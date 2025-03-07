export interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  status: string;
  expPayRate: string;
  dateAdded: string;
  source: string;
  views: number;
  matchPercentage: number;
  skills: string[];
  jobId: string;
  jobType: string;
  city: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  count: number;
  candidates: Candidate[];
}

export interface PipelineData {
  stages: PipelineStage[];
  totalCandidates: number;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  verified: boolean;
  phone: string;
  location: string;
  jobId: string;
  jobType: string;
  city: string;
  matchPercentage: number;
  currentStage: string;
  otherApplications: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
  }[];
  experience: {
    startDate: string;
    endDate: string;
    company: string;
    title: string;
    description: string;
  }[];
}
