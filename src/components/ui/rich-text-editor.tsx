"use client"

import { Bold, Italic, Link, List, Quote, Heading1 } from 'lucide-react'
import { Button } from "./button"
import { Textarea } from "./textarea"
import { useState } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  error?: string
}

export function RichTextEditor({
  value,
  onChange,
  maxLength = 1000,
  error
}: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(maxLength - value.length)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      onChange(newValue)
      setCharCount(maxLength - newValue.length)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 border rounded-t-md p-2 bg-background">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <List className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={handleChange}
        className="min-h-[200px] rounded-t-none"
      />
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {charCount} characters left
        </span>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </div>
  )
}

