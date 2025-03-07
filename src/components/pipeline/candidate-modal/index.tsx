import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { CandidateProfile } from "@/types/job-pipline/pipeline";
import { ProfileHeader } from "./profile-header";

interface CandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: CandidateProfile;
  prevCandidate?: {
    name: string;
    avatar: string;
  };
  nextCandidate?: {
    name: string;
    avatar: string;
  };
  onPrevious: () => void;
  onNext: () => void;
}

export function CandidateModal({ open, onOpenChange, candidate }: CandidateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <ProfileHeader candidate={candidate} />
      </DialogContent>
    </Dialog>
  );
}
