"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, Link, List, ListOrdered } from "lucide-react"
import type { Note } from "@/types/job-pipline/candidate-modal"

const mockNotes: Note[] = [
  {
    id: "1",
    author: {
      name: "Jacob Jones",
      avatar: "/placeholder.svg",
    },
    content:
      "Candidate demonstrated strong problem-solving abilities during the screening call. Background in data analysis is impressive, and experience aligns well with the team's needs. However, they may need additional training in project management for a more senior role. Overall, a good fit for the team with potential for growth.",
    date: "10 Oct 2024 • 8:00 AM",
  },
  {
    id: "2",
    author: {
      name: "Arlene McCoy",
      avatar: "/placeholder.svg",
    },
    content:
      "Interview feedback highlighted excellent communication skills and a proactive approach to problem-solving.",
    date: "10 Oct 2024 • 8:00 AM",
  },
]

export function NotesTab() {
  const [notes] = useState<Note[]>(mockNotes)
  const [newNote, setNewNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle note submission
    setNewNote("")
  }

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="p-6 border-b space-y-4">
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
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">1000 characters left</span>
          <Button type="submit">Add Note</Button>
        </div>
      </form>

      <div className="flex-1 overflow-auto p-6">
        <h3 className="font-medium mb-4">Recent Notes</h3>
        <div className="space-y-6">
          {notes.map((note) => (
            <div key={note.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={note.author.avatar} />
                <AvatarFallback>{note.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{note.author.name}</span>
                  <span className="text-sm text-muted-foreground">{note.date}</span>
                </div>
                <p className="text-sm">{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

