"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"

export function ResumeTab() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Resume</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDownload} disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Request New Resume
          </Button>
        </div>
      </div>
      <div className="aspect-[8.5/11] w-full rounded-lg border bg-muted">
        <iframe src="/placeholder.pdf" className="h-full w-full rounded-lg" title="Resume Preview" />
      </div>
    </div>
  )
}

