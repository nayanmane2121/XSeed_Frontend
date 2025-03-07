"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, FileText } from "lucide-react";
import type { Interview } from "@/types/job-pipline/candidate-modal";
import Image from "next/image";

const mockInterview: Interview = {
  id: "1",
  title: "First Technical Round with Hope Doe",
  reqId: "#447",
  client: "UKco - United Kingdom Co.",
  candidate: {
    name: "Hope Doe",
    avatar: "/placeholder.svg"
  },
  panel: [
    {
      name: "Brooklyn Simmons",
      avatar: "/placeholder.svg"
    },
    {
      name: "Jerome Bell",
      avatar: "/placeholder.svg"
    }
  ],
  date: "Mon, Dec 18, 2024",
  startTime: "08:00 AM",
  endTime: "09:00 AM",
  platform: {
    name: "Google Meet",
    icon: "/placeholder.svg"
  },
  attachments: [
    {
      name: "Resume-Hope-Doe.pdf",
      type: "pdf"
    },
    {
      name: "Job-Description-Java-Developer.docx",
      type: "docx"
    }
  ],
  status: "scheduled"
};

export function InterviewTab() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Live Interview</h2>
          <span className="text-sm text-red-500 font-medium">• Scheduled</span>
        </div>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Title</h3>
          <p>{mockInterview.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Req ID</h3>
            <p>{mockInterview.reqId}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Client</h3>
            <p>{mockInterview.client}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Candidate</h3>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={mockInterview.candidate.avatar} />
              <AvatarFallback>{mockInterview.candidate.name[0]}</AvatarFallback>
            </Avatar>
            <span>{mockInterview.candidate.name}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Panel</h3>
          <div className="flex items-center gap-4">
            {mockInterview.panel.map((member) => (
              <div key={member.name} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Date</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{mockInterview.date}</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Time</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {mockInterview.startTime} — {mockInterview.endTime}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Platform</h3>
          <div className="flex items-center gap-2">
            <Image
              src={mockInterview.platform.icon || "/placeholder.svg"}
              alt={mockInterview.platform.name}
              className="h-5 w-5"
            />
            <span>{mockInterview.platform.name}</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Attachments</h3>
          <div className="grid grid-cols-2 gap-4">
            {mockInterview.attachments.map((attachment) => (
              <Button key={attachment.name} variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                {attachment.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
