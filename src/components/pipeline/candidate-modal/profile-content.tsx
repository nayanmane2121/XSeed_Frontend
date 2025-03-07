import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { CandidateProfile } from "@/types/job-pipline/pipeline"
import { Copy, MoreHorizontal } from "lucide-react"
import { ResumeTab } from "./tabs/resume-tab"
import { EmailTab } from "./tabs/email-tab"
import { InterviewTab } from "./tabs/interview-tab"
import { NotesTab } from "./tabs/notes-tab"

interface ProfileContentProps {
  candidate: CandidateProfile
}

export function ProfileContent({ candidate }: ProfileContentProps) {
  return (
    <div className="flex-1 overflow-auto">
      <Tabs defaultValue="summary" className="h-full flex flex-col">
        <TabsList className="px-6 border-b">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="flex-1 p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Other Applications ({candidate.otherApplications?.length || 0})</h3>
            </div>
            <div className="space-y-2">
              {candidate.otherApplications?.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{application.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>ID:{application.id}</span>
                      <span>{application.company}</span>
                      <span>{application.location}</span>
                      <span>{application.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Profile</h3>
              <Button variant="outline">View Resume</Button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Experience</h4>
                <div className="space-y-4">
                  {candidate.experience?.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p className="font-medium">{exp.company}</p>
                          <p className="text-sm">{exp.title}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resume" className="flex-1">
          <ResumeTab />
        </TabsContent>

        <TabsContent value="email" className="flex-1">
          <EmailTab />
        </TabsContent>

        <TabsContent value="interview" className="flex-1">
          <InterviewTab />
        </TabsContent>

        <TabsContent value="notes" className="flex-1">
          <NotesTab />
        </TabsContent>

        <TabsContent value="attachments" className="flex-1 p-6">
          <h2 className="text-lg font-semibold mb-4">Attachments</h2>
          <p className="text-muted-foreground">No attachments found.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

