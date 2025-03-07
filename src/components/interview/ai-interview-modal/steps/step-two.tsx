/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2, MoreVertical } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SearchAndSelect } from "./search-and-select";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePostData } from "@/hooks/fetch/usePostData ";
import { useState } from "react";
import GeneratingQuestionsLoading from "@/components/common/generating-questions-loading";
import type { InterviewConfig, InterviewStep, InterviewTopic } from "@/types/job-pipline/ai-interview";
import { ApiEndPoint } from "@/types/api/api-types";

interface StepTwoProps {
  config: InterviewConfig;
  onUpdateConfig: (config: InterviewConfig) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
  refetchInterviewData: () => void;
  userId: string;
  interviewId: string;
  totalSteps?: number;
}

export function StepTwo({
  config,
  onUpdateConfig,
  onNext,
  onBack,
  onCancel,
  refetchInterviewData,
  userId,
  interviewId,
  totalSteps
}: StepTwoProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchingTopicsForStep, setSearchingTopicsForStep] = useState<string | null>(null);
  const [searchingSubTopicsForTopic, setSearchingSubTopicsForTopic] = useState<string | null>(null);
  const [isStepIdExpanded, setIsStepIdExpanded] = useState<string | null>(null);
  const [isTopicIdExpanded, setIsTopicIdExpanded] = useState<string | null>(null);

  // API mutation for updating interview data
  const { mutate: updateInterview, isLoading: isUpdating } = usePostData<InterviewConfig, InterviewConfig>(
    ApiEndPoint.GET_INTERVIEW_AI_POWERED_USER_INTERVIEW_DATA,
    [userId, interviewId]
  );

  const handleStepExpand = (stepId: string) => {
    setIsStepIdExpanded(stepId === isStepIdExpanded ? null : stepId);
  };

  const handleTopicExpand = (topicId: string) => {
    setIsTopicIdExpanded(topicId === isTopicIdExpanded ? null : topicId);
  };

  const handleDeleteStep = (stepId: string) => {
    onUpdateConfig({
      ...config,
      steps: config.steps.filter((step) => step.id !== stepId)
    });
  };

  const handleDeleteTopic = (stepId: string, topicId: string) => {
    onUpdateConfig({
      ...config,
      steps: config.steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            topics: step?.topics?.filter((topic) => topic.id !== topicId)
          };
        }
        return step;
      })
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(config.steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onUpdateConfig({
      ...config,
      steps: items
    });
  };

  const handleStepsSelect = (selectedSteps: InterviewStep[]) => {
    onUpdateConfig({
      ...config,
      steps: [...config.steps, ...selectedSteps]
    });
    onUpdateConfig({
      ...config,
      steps: [
        ...config.steps,
        ...selectedSteps.map((el) => ({
          ...el,
          topics: el.topics ? el.topics : [] // Assuming "topics" is the correct property name
        }))
      ]
    });
  };

  const addSelectedTopicsUnderStep = (stepId: string, newSubtopics: InterviewTopic[]) => {
    onUpdateConfig({
      ...config,
      steps: config.steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            topics: [...(step?.topics || []), ...newSubtopics]
          };
        }
        return step;
      })
    });
  };

  const handleTopicSelectUnderSteps = (stepId: string, topicId: string) => {
    onUpdateConfig({
      ...config,
      steps: config.steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            topics: step?.topics?.map((topic) => {
              if (topic.id === topicId) {
                return { ...topic, isSelected: !topic.isSelected };
              }
              return topic;
            })
          };
        }
        return step;
      })
    });
  };

  const addSelectedSubtopicsUnderTopic = (stepId: string, topicId: string, newSubtopics: InterviewTopic[]) => {
    onUpdateConfig({
      ...config,
      steps: config.steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            topics: step?.topics?.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  subTopics: [...(topic?.subTopics || []), ...newSubtopics]
                };
              }
              return topic;
            })
          };
        }
        return step;
      })
    });
  };

  const handleDeleteSubtopic = (stepId: string, topicId: string, subtopicId: string) => {
    onUpdateConfig({
      ...config,
      steps: config.steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            topics: step?.topics?.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  subTopics: topic?.subTopics?.filter((subtopic) => subtopic.id !== subtopicId)
                };
              }
              return topic;
            })
          };
        }
        return step;
      })
    });
  };

  // **Post updated interview config and refetch**
  const handleNext = () => {
    updateInterview(config, {
      onSuccess: () => {
        refetchInterviewData(); // Refetch interview data after update
        // toast({
        //   title: "Success",
        //   description: "Interview steps updated successfully!",
        // });
        onNext(); // Proceed to next step after successful update
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to update interview: ${error}`,
          variant: "destructive"
        });
      }
    });
  };

  if (isUpdating) {
    return <GeneratingQuestionsLoading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Steps</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsSearching(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>

      {isSearching && <SearchAndSelect type="steps" onSelect={handleStepsSelect} onClose={() => setIsSearching(false)} />}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {config.steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="border rounded-lg">
                      <div className="flex items-center p-4">
                        <div {...provided.dragHandleProps} className="mr-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="flex-1">{step.title}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSearchingTopicsForStep(step.id)}>
                              <Plus className="h-4 w-4 mr-2" /> Add Topics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteStep(step.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" size="sm" onClick={() => handleStepExpand(step.id)}>
                          {isStepIdExpanded === step.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {isStepIdExpanded === step.id && (
                        <div className="pr-4 pb-4 space-y-1">
                          {searchingTopicsForStep === step.id && (
                            <div className="mb-4 ml-4">
                              <SearchAndSelect
                                type="topics"
                                onSelect={(topic) => {
                                  addSelectedTopicsUnderStep(step.id, topic);
                                  setSearchingTopicsForStep(null);
                                }}
                                onClose={() => setIsSearching(false)}
                                stepId={step.id}
                              />
                            </div>
                          )}
                          {step?.topics?.map((topic) => (
                            <div key={topic.id} className="group flex flex-col ml-4 p-1">
                              <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                  <input
                                    type="checkbox"
                                    checked={topic?.isSelected}
                                    onChange={() => handleTopicSelectUnderSteps(step.id, topic.id)}
                                    className="rounded border-gray-300"
                                  />
                                  <span className="flex-1">{topic.title}</span>
                                </div>
                                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setSearchingSubTopicsForTopic(topic.id)}
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Add Subtopic</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTopic(step.id, topic.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleTopicExpand(topic.id)}>
                                    {isTopicIdExpanded === topic.id ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              {/* Subtopic Search */}
                              {searchingSubTopicsForTopic === topic.id && (
                                <SearchAndSelect
                                  type="subtopics"
                                  onSelect={(subtopics) => {
                                    addSelectedSubtopicsUnderTopic(step.id, topic.id, subtopics);
                                    setSearchingSubTopicsForTopic(null);
                                  }}
                                  onClose={() => setSearchingSubTopicsForTopic(null)}
                                  stepId={step.id}
                                  topicId={topic.id}
                                />
                              )}

                              {/* Show Subtopics Under Topic */}
                              {isTopicIdExpanded === topic.id && (
                                <div className="ml-6 mt-2 flex flex-col space-y-2">
                                  {topic?.subTopics?.map((subtopic) => (
                                    <div
                                      key={subtopic.id}
                                      className="flex items-center justify-between p-1 border-l-2 border-gray-300 pl-2 "
                                    >
                                      <span>{subtopic.title}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteSubtopic(step.id, topic.id, subtopic.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">Step 2/{totalSteps}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isUpdating}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
