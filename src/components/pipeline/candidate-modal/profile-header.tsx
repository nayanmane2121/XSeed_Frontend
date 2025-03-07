import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, Phone, Plus, Verified } from "lucide-react";
import type { CandidateProfile } from "@/types/job-pipline/pipeline";
import { AIInterviewModal } from "@/components/interview/ai-interview-modal/ai-interview-modal";
import { ProfileStages } from "./profile-stages";

interface ProfileHeaderProps {
  candidate: CandidateProfile;
}
export function ProfileHeader({ candidate }: ProfileHeaderProps) {
  const [showAIInterview, setShowAIInterview] = useState(false);
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>{candidate.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{candidate.name}</h2>
              {candidate.verified && <Verified className="h-5 w-5 text-blue-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{candidate.title}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {candidate.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-2 py-1">
            {candidate.matchPercentage}% Match
          </Badge>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Java Developer</span>
            <br />
            <span className="text-muted-foreground">#{candidate.jobId}</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">{candidate.jobType}</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">{candidate.city}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Schedule Interview
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowAIInterview(true)}>AI Powered</DropdownMenuItem>
            <DropdownMenuItem>Live</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ProfileStages
        currentStage={candidate.currentStage}
        onMove={(stage) => {
          // Here you would typically update the candidate's stage in your backend
          console.log(`Moving candidate to ${stage}`);
        }}
        onReject={() => {
          // Here you would typically handle candidate rejection
          console.log("Rejecting candidate");
        }}
      />
      <AIInterviewModal
        open={showAIInterview}
        onOpenChange={setShowAIInterview}
        userId="sufi123"
        interviewId="interview123"
      />
    </div>
  );
}
