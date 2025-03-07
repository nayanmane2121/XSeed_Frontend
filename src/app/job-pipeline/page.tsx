/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Share2, UserPlus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PipelineBoard } from "@/components/pipeline/pipeline-board";
import { PipelineList } from "@/components/pipeline/pipeline-list";
import { pipelineData } from "@/lib/data";
import { CandidateModal } from "@/components/pipeline/candidate-modal";

export default function JobPipelinePage() {
  const [activeTab, setActiveTab] = useState("candidate-pipeline");
  const [activeStage, setActiveStage] = useState("all");
  const [view] = useState<"list" | "board">("list");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const currentCandidateIndex = selectedCandidate
    ? pipelineData.stages.find((s) => s.id === activeStage)?.candidates.findIndex((c) => c.id === selectedCandidate) ?? -1
    : -1;

  const currentStage = pipelineData.stages.find((s) => s.id === activeStage);
  const candidates = currentStage?.candidates ?? [];

  const handlePrevious = () => {
    if (currentCandidateIndex > 0) {
      setSelectedCandidate(candidates[currentCandidateIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setSelectedCandidate(candidates[currentCandidateIndex + 1].id);
    }
  };

  return (
    <>
      <div className="container py-6 space-y-6 m-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Java Developer</h1>
            <span className="text-sm text-muted-foreground">ID:213140</span>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="candidate-pipeline">Candidate Pipeline</TabsTrigger>
              <TabsTrigger value="job-detail">Job Detail</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3]?.map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-sm font-medium">
                +2
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Candidate
            </Button>
          </div>
        </div>

        {activeTab === "candidate-pipeline" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {pipelineData?.stages?.map((stage) => (
                <Button
                  key={stage.id}
                  variant={activeStage === stage.id ? "default" : "ghost"}
                  onClick={() => setActiveStage(stage.id)}
                  className="gap-2"
                >
                  {stage.label} ({stage.count})
                </Button>
              ))}
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
              <div className="flex items-center gap-2 border rounded-md p-1">
                <Button variant={view === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setView("list")}>
                  List
                </Button>
                <Button variant={view === "board" ? "secondary" : "ghost"} size="sm" onClick={() => setView("board")}>
                  Board
                </Button>
              </div>
            </div> */}

            {view === "list" ? (
              <PipelineList data={pipelineData} activeStage={activeStage} onCandidateClick={setSelectedCandidate} />
            ) : (
              <PipelineBoard data={pipelineData} onCandidateClick={setSelectedCandidate} />
            )}
          </div>
        )}
      </div>

      {selectedCandidate && currentStage && currentStage.candidates.find((c) => c.id === selectedCandidate) && (
        <CandidateModal
          open={!!selectedCandidate}
          onOpenChange={(open) => !open && setSelectedCandidate(null)}
          candidate={currentStage.candidates.find((c) => c.id === selectedCandidate) as any}
          prevCandidate={
            currentCandidateIndex > 0
              ? {
                  name: candidates[currentCandidateIndex - 1].name,
                  avatar: candidates[currentCandidateIndex - 1].avatar
                }
              : undefined
          }
          nextCandidate={
            currentCandidateIndex < candidates.length - 1
              ? {
                  name: candidates[currentCandidateIndex + 1].name,
                  avatar: candidates[currentCandidateIndex + 1].avatar
                }
              : undefined
          }
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </>
  );
}
