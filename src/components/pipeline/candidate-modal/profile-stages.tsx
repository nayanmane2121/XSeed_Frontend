"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Move, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ProfileStagesProps {
  currentStage: string;
  onMove: (stage: string) => void;
  onReject: () => void;
}

const stages = ["Sourced", "Submitted to Client", "First Round", "Manager Round"];

export function ProfileStages({ currentStage, onMove }: ProfileStagesProps) {
  const [selectedStage, setSelectedStage] = useState(currentStage);
  const currentIndex = stages.indexOf(selectedStage);

  const handleStageChange = (stage: string) => {
    setSelectedStage(stage);
    onMove(stage);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-8">
          {stages.map((stage, index) => (
            <div key={stage} className={`text-sm ${index <= currentIndex ? "text-primary" : "text-muted-foreground"}`}>
              {stage}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Move className="mr-2 h-4 w-4" /> Move
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {stages.map((stage) => (
                <DropdownMenuItem key={stage} onClick={() => handleStageChange(stage)} className="flex items-center gap-2">
                  {stage}
                  {stage === selectedStage && <span className="ml-auto text-primary">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <X className="mr-2 h-4 w-4" /> Reject
          </Button>
        </div>
      </div>
      <div className="flex w-full">
        {stages.map((stage, index) => (
          <div key={stage} className="flex-1 h-2 first:rounded-l-full last:rounded-r-full relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full" />
            {index <= currentIndex && <div className="absolute inset-0 bg-blue-500 rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}
