import type { PipelineData } from "@/types/job-pipline/pipeline"
import { CandidateCard } from "./candidate-card"

interface PipelineListProps {
  data: PipelineData
  activeStage: string
  onCandidateClick: (candidateId: string) => void
}

export function PipelineList({ data, activeStage, onCandidateClick }: PipelineListProps) {
  const stage = data.stages.find((s) => s.id === activeStage)
  if (!stage) return null

  return (
    <div className="space-y-3">
      {stage?.candidates?.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          view="list"
          onClick={() => onCandidateClick(candidate.id)}
        />
      ))}
    </div>
  )
}

