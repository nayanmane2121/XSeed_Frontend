"use client";

import { Button } from "@/components/ui/button";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { GripVertical, Trash2, RefreshCcw, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { usePostData } from "@/hooks/fetch/usePostData ";
import { useToast } from "@/components/ui/use-toast";
import GeneratingQuestionsLoading from "@/components/common/generating-questions-loading";
import type { InterviewConfig, InterviewStep, InterviewQuestion, CandidateDetails } from "@/types/job-pipline/ai-interview";

interface StepQuestionsProps {
  step: InterviewStep | null;
  config: InterviewConfig | null;
  onUpdateConfig: (config: InterviewConfig) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
  isLastStep: boolean;
  isLoading?: boolean;
  totalSteps?: number;
}

export function StepQuestions({
  step,
  config,
  onUpdateConfig,
  onNext,
  onBack,
  onCancel,
  isLastStep,
  isLoading,
  totalSteps
}: StepQuestionsProps) {
  const [activeTab, setActiveTab] = useState<string | undefined>((step?.topics ?? [])[0]?.id || "");
  const [loadingQuestionId, setLoadingQuestionId] = useState<string | null>(null); // Track loading for specific questions
  const { toast } = useToast();

  // API Hook to refresh a single question
  const { mutate: refreshQuestion } = usePostData<InterviewQuestion, InterviewQuestion>(
    `/interview/refresh-question/${config?.reqId}/${step?.id}/${activeTab}/${loadingQuestionId}`
  );

  const topics = useMemo(() => {
    return step?.topics ?? [];
  }, [step]);

  useEffect(() => {
    if (step && topics.length > 0) {
      setActiveTab(topics[0].id);
    } else {
      setActiveTab(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Find the active topic based on activeTab
  const activeTopic = topics.find((topic) => topic.id === activeTab);

  const handleRefreshQuestion = (question: InterviewQuestion) => {
    setLoadingQuestionId(question.id); // Set loading state

    refreshQuestion(
      { ...question },
      {
        onSuccess: (updatedQuestion) => {
          // Update only the refreshed question in state
          const updatedState: InterviewConfig = {
            title: config?.title ?? "", // Ensure title is always a string
            client: config?.client ?? "", // Ensure client is always a string
            reqId: config?.reqId ?? "", // Ensure reqId is always a string
            candidate: config?.candidate ?? ({} as CandidateDetails), // Provide a default object
            expirationDays: config?.expirationDays ?? 0, // Provide a default number
            steps:
              config?.steps?.map((s) =>
                s.id === step?.id
                  ? {
                      ...s,
                      topics: s?.topics?.map((topic) =>
                        topic.id === activeTab
                          ? {
                              ...topic,
                              questions: topic?.questions?.map((q) => (q.id === question.id ? updatedQuestion : q))
                            }
                          : topic
                      )
                    }
                  : s
              ) ?? []
          };

          onUpdateConfig(updatedState);
          setLoadingQuestionId(null); // Remove loading state

          toast({ title: "Question Updated", description: "The question has been refreshed successfully!" });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to refresh question. Please try again." });
          setLoadingQuestionId(null);
        }
      }
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (activeTopic) {
      const updatedConfig: InterviewConfig = {
        title: config?.title ?? "", // Ensure title is always a string
        client: config?.client ?? "", // Ensure client is always a string
        reqId: config?.reqId ?? "", // Ensure reqId is always a string
        candidate: config?.candidate ?? ({} as CandidateDetails), // Ensure candidate is an object
        expirationDays: config?.expirationDays ?? 0, // Ensure expirationDays is a number
        steps:
          config?.steps?.map((s) =>
            s.id === step?.id
              ? {
                  ...s,
                  topics: s?.topics?.map((topic) =>
                    topic.id === activeTab
                      ? {
                          ...topic,
                          questions: topic?.questions?.filter((q) => q.id !== questionId)
                        }
                      : topic
                  )
                }
              : s
          ) ?? []
      };

      onUpdateConfig(updatedConfig);

      toast({
        title: "Question Deleted",
        description: "The selected question has been removed."
      });

      // Save updated questions to backend
      // updateQuestions(updatedConfig);
    }
  };

  if (isLoading) {
    return <GeneratingQuestionsLoading />;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{step?.title}</h3>

      {step?.topics && step.topics.length > 0 ? (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {step?.topics?.map((topic) => (
              <TabsTrigger key={topic.id} value={topic.id}>
                {topic.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {step?.topics?.map((topic) => (
            <TabsContent key={topic.id} value={topic.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Questions</h4>
              </div>

              <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId={`questions-${topic.id}`}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {topic.questions?.map((question, index) => (
                        <Draggable key={question.id} draggableId={question.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...(!question.isLocked ? provided.draggableProps : {})} // Prevent dragging if locked
                              className={`group flex items-start gap-2 p-3 rounded-lg ${
                                question.isLocked ? "bg-gray-200 cursor-not-allowed" : "bg-white border"
                              }`}
                            >
                              {/* Drag handle only if the question is NOT locked */}
                              {!question.isLocked && (
                                <div {...provided.dragHandleProps} className="mt-1">
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}

                              {/* Show loading skeleton while refreshing */}
                              {loadingQuestionId === question.id ? (
                                <div className="flex-1">
                                  <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>
                                </div>
                              ) : (
                                <p className="flex-1">{question.title}</p>
                              )}

                              {/* Hide Refresh & Delete buttons if question is locked */}
                              {!question.isLocked && question.isEditable !== false && (
                                <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRefreshQuestion(question)}
                                    disabled={loadingQuestionId === question.id}
                                  >
                                    {loadingQuestionId === question.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    ) : (
                                      <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(question.id)}>
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                  </Button>
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
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <p className="text-center text-muted-foreground py-4">No topics available.</p>
      )}

      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          Step {config!.steps.indexOf(step!) + 3} / {totalSteps}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>{isLastStep ? "Confirm & Schedule" : "Next"}</Button>
        </div>
      </div>
    </div>
  );
}
