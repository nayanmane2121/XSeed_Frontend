export interface InterviewConfig {
  title: string;
  client: string;
  reqId: string;
  candidate: CandidateDetails;
  expirationDays: number;
  steps: InterviewStep[];
}

export interface CandidateDetails {
  name: string;
  avatar: string;
}

export interface InterviewStep {
  id: string;
  title: string;
  topics?: InterviewTopic[] | null;
}

export interface InterviewTopic {
  id: string;
  title: string;
  addImprovisations?: boolean;
  subTopics?: InterviewSubTopic[] | null;
  questions?: InterviewQuestion[];
  isSelected?: boolean;
}

export interface InterviewSubTopic {
  id: string;
  title: string;
}

export interface InterviewQuestion {
  id: string;
  title: string;
  answer?: string | null;
  subTopic?: string | null;
  difficultyLevel?: string;
  isLocked?: boolean;
  isEditable?: boolean;
}
