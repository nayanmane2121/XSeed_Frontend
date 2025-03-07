import { Eye, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Candidate } from "@/types/job-pipline/pipeline";

interface CandidateCardProps {
  candidate: Candidate;
  view: "list" | "board";
  onClick: () => void;
}

export function CandidateCard({ candidate, view, onClick }: CandidateCardProps) {
  if (view === "board") {
    return (
      <div
        className="bg-white p-4 rounded-lg shadow-sm border space-y-3 cursor-pointer hover:border-primary transition-colors"
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{candidate.title}</p>
          <p className="text-sm">
            Exp Pay Rate: <span className="font-medium">{candidate.expPayRate}</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white mb-5 border flex items-center gap-4 p-4 hover:bg-accent rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={candidate.avatar} />
        <AvatarFallback>{candidate.name[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-[200px]">
        <h3 className="font-medium">{candidate.name}</h3>
        <p className="text-sm text-muted-foreground">{candidate.email}</p>
      </div>
      <div className="flex-1 grid grid-cols-5 gap-4 items-center">
        <Badge
          variant="outline"
          className={candidate.status === "Submitted to Client" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}
        >
          {candidate.status}
        </Badge>
        <div className="flex flex-col justify-center items-center">
          <span className="text-sm">Expc Pay Rate</span>
          <span className="text-md">{candidate.expPayRate}</span>
        </div>
        <span className="text-sm">{candidate.dateAdded}</span>
        <span className="text-sm">{candidate.source}</span>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{candidate.views} views</span>
        </div>
      </div>
      <Badge variant="secondary" className="px-2 py-1">
        {candidate.matchPercentage}%
      </Badge>
      <div className="flex gap-1">
        {candidate.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
      <Button variant="ghost" size="icon" className="ml-auto">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}
