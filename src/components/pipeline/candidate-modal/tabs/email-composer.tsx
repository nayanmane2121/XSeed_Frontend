"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, Link, List, ListOrdered, X } from "lucide-react"

interface EmailComposerProps {
  onClose: () => void
}

export function EmailComposer({ onClose }: EmailComposerProps) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Email to Hope Doe</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Email Templates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interview">Interview Invitation</SelectItem>
              <SelectItem value="offer">Offer Letter</SelectItem>
              <SelectItem value="rejection">Rejection</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1 pb-2 border-b">
            <Button variant="ghost" size="icon">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Link className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Write your message here..."
            className="min-h-[200px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>1000 characters left</span>
            <Button size="sm" variant="outline">
              Co-recruit
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Send</Button>
      </div>
    </form>
  )
}

