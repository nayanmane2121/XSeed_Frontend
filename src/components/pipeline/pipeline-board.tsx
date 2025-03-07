/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import type { PipelineData } from "@/types/job-pipline/pipeline"
import { CandidateCard } from "./candidate-card"

interface PipelineBoardProps {
  data: PipelineData
  onCandidateClick: (candidateId: string) => void
}

export function PipelineBoard({ data, onCandidateClick }: PipelineBoardProps) {
  const handleDragEnd = (result: any) => {
    // Handle drag and drop logic here
    console.log(result)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-4">
        {data.stages.slice(1)?.map((stage) => (
          <Droppable key={stage.id} droppableId={stage.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-muted/50 p-4 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{stage.label}</h3>
                  <span className="text-sm text-muted-foreground">{stage.count}</span>
                </div>
                <div className="space-y-4">
                  {stage?.candidates?.map((candidate, index) => (
                    <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <CandidateCard
                            candidate={candidate}
                            view="board"
                            onClick={() => onCandidateClick(candidate.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

