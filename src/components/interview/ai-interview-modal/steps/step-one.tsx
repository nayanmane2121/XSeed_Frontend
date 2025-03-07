import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { InterviewConfig } from "@/types/job-pipline/ai-interview";

interface StepOneProps {
  config: InterviewConfig | null;
  onUpdateConfig: (config: InterviewConfig) => void;
  onNext: () => void;
  onCancel: () => void;
  totalSteps?: number;
}

export function StepOne({ config, onUpdateConfig, onNext, onCancel , totalSteps}: StepOneProps) {
  if (!config) {
    return <div className="text-center text-muted-foreground">Loading interview details...</div>;
  }

  const handleTitleChange = (value: string) => {
    onUpdateConfig({
      ...config,
      title: value,
    });
  };

  const handleExpirationChange = (value: string) => {
    onUpdateConfig({
      ...config,
      expirationDays: Number.parseInt(value),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input value={config.title} onChange={(e) => handleTitleChange(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Client</label>
          <Input value={config.client} disabled />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Req ID</label>
          <Input value={config.reqId} disabled />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Candidate</label>
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <Avatar>
              <AvatarImage src={config.candidate.avatar} />
              <AvatarFallback>{config.candidate.name[0]}</AvatarFallback>
            </Avatar>
            <span>{config.candidate.name}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Invitation Expiration</label>
          <Select value={config.expirationDays.toString()} onValueChange={handleExpirationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select expiration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 day</SelectItem>
              <SelectItem value="2">2 days</SelectItem>
              <SelectItem value="3">3 days</SelectItem>
              <SelectItem value="5">5 days</SelectItem>
              <SelectItem value="7">7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">Step 1/{totalSteps}</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}
