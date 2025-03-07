"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { StepOne } from "./steps/step-one";
import { StepTwo } from "./steps/step-two";
import { StepQuestions } from "./steps/step-questions";
import type { InterviewConfig, InterviewQuestion } from "@/types/job-pipline/ai-interview";
import { useToast } from "@/components/ui/use-toast";
import { useFetchData } from "@/hooks/fetch/useFetchData";
import { usePostData } from "@/hooks/fetch/usePostData ";
import Image from "next/image";
import { ApiEndPoint } from "@/types/api/api-types";
import CacheKeys from "@/types/enums/cache-keys-enum";

interface AIInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  interviewId: string;
}

export function AIInterviewModal({ open, onOpenChange, userId, interviewId }: AIInterviewModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [interviewData, setInterviewData] = useState<InterviewConfig | null>(null);
  const { toast } = useToast();

  // Fetch interview data
  const {
    data,
    isLoadingData: isLoading,
    refetch
  } = useFetchData<InterviewConfig>(
    ApiEndPoint.GET_INTERVIEW_AI_POWERED_USER_INTERVIEW_DATA,
    CacheKeys.GET_INTERVIEW_AI_POWERED_USER_INTERVIEW_DATA,
    [userId, interviewId],
    undefined,
    open // Fetch only when modal is open
  );

  const { mutate: scheduledInterview } = usePostData<InterviewQuestion, InterviewConfig>(
    ApiEndPoint.POST_INTERVIEW_SCHEDULED_AI_POWERED_USER_INTERVIEW,
    [userId, interviewId]
  );

  // Update `interviewData` once `data` is fetched
  useEffect(() => {
    if (data) {
      setInterviewData(data);
    }
  }, [data]);

  console.log(interviewData);

  const totalSteps = interviewData?.steps?.length ? interviewData.steps.length + 2 : 0; // +2 for initial steps

  const handleNext = () => {
    console.log("first");
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleConfirmAndSchedule = () => {
    if (!interviewData) {
      toast({
        title: "Error",
        description: "Interview data is missing.",
        variant: "destructive"
      });
      return;
    }

    scheduledInterview(interviewData, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Interview Scheduled  successfully!"
        });
        console.log("Interview scheduled successfully!");
        // Proceed to next step after successful update
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to update interview: ${error}`,
          variant: "destructive"
        });
        console.log("Interview scnot!");
      }
    });

    onOpenChange(false);
    toast({
      title: "Success",
      description: "Interview scheduled successfully!"
    });
  };

  const renderStep = () => {
    // if (!interviewData && !isLoading) {
    //   return <div className="text-center text-muted-foreground">Failed to load interview data.</div>;
    // }

    if (currentStep === 1) {
      return (
        <StepOne
          config={interviewData}
          onUpdateConfig={setInterviewData}
          onNext={handleNext}
          onCancel={() => onOpenChange(false)}
          totalSteps={totalSteps}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <StepTwo
          config={interviewData!}
          onUpdateConfig={setInterviewData}
          onNext={handleNext}
          onBack={handleBack}
          onCancel={() => onOpenChange(false)}
          // onAddStep={handleAddStep}
          refetchInterviewData={refetch}
          userId={userId}
          interviewId={interviewId}
          totalSteps={totalSteps}
        />
      );
    }

    const stepIndex = currentStep - 3;
    const step = interviewData!.steps[stepIndex];
    const isLastStep = currentStep === totalSteps;

    return (
      <StepQuestions
        step={step}
        config={interviewData}
        onUpdateConfig={setInterviewData}
        onNext={isLastStep ? handleConfirmAndSchedule : handleNext}
        onBack={handleBack}
        onCancel={() => onOpenChange(false)}
        isLastStep={isLastStep}
        isLoading={isLoading}
        totalSteps={totalSteps}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Image src="/logo/ai-stars.svg" alt="Ai Stars" className="inline" width={24} height={24} />
          <h2 className="text-xl font-semibold">AI Powered</h2>
        </div>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
