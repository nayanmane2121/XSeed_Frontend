"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { EmailComposer } from "./email-composer";
import type { Email } from "@/types/job-pipline/candidate-modal";

const mockEmails: Email[] = [
  {
    id: "1",
    from: {
      name: "Robert Doe",
      email: "robertdoe@mail.com",
      avatar: "/placeholder.svg"
    },
    to: {
      name: "Hope Doe",
      email: "hopedoe@mail.com",
      avatar: "/placeholder.svg"
    },
    subject: "Interview Follow-up",
    message: `Hello Hope,

I am eagerly looking forward to meeting with you and discussing the details of this position in greater depth.

If there is any additional information you require from me before the interview, please do not hesitate to let me know.

Thank you very much.

Sincerely,
Robert Doe
5532472424
robertdoe@mail.com`,
    date: "14-12-2023"
  },
  {
    id: "2",
    from: {
      name: "Hope Doe",
      email: "hopedoe@mail.com",
      avatar: "/placeholder.svg"
    },
    to: {
      name: "Robert Doe",
      email: "robertdoe@mail.com"
    },
    subject: "Re: Interview Follow-up",
    message: `Hello Robert,

If there is any additional information required for the interview, let me know.

Thank you very much.

Sincerely,
Hope Doe
hopedoe@mail.com`,
    date: "14-12-2023"
  }
];

export function EmailTab() {
  const [isComposing, setIsComposing] = useState(false);
  const [emails] = useState<Email[]>(mockEmails);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-lg font-semibold">Emails</h2>
        <Button onClick={() => setIsComposing(true)}>
          <Mail className="mr-2 h-4 w-4" /> New Mail
        </Button>
      </div>

      {isComposing ? (
        <EmailComposer onClose={() => setIsComposing(false)} />
      ) : (
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {emails.map((email) => (
            <div key={email.id} className="flex gap-4 p-4 rounded-lg border bg-card">
              <Avatar>
                <AvatarImage src={email.from.avatar} />
                <AvatarFallback>{email.from.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{email.from.name}</p>
                    <p className="text-sm text-muted-foreground">{email.date}</p>
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-sm">{email.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
