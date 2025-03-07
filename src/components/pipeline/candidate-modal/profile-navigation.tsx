import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileNavigationProps {
  prevCandidate?: {
    name: string
    avatar: string
  }
  nextCandidate?: {
    name: string
    avatar: string
  }
  onPrevious: () => void
  onNext: () => void
}

export function ProfileNavigation({ prevCandidate, nextCandidate, onPrevious, onNext }: ProfileNavigationProps) {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <Button variant="ghost" className="flex items-center gap-2" onClick={onPrevious} disabled={!prevCandidate}>
        <ChevronLeft className="h-4 w-4" />
        {prevCandidate && (
          <>
            <Avatar className="h-6 w-6">
              <AvatarImage src={prevCandidate.avatar} />
              <AvatarFallback>{prevCandidate.name[0]}</AvatarFallback>
            </Avatar>
            <span>{prevCandidate.name}</span>
          </>
        )}
      </Button>
      <Button variant="ghost" className="flex items-center gap-2" onClick={onNext} disabled={!nextCandidate}>
        {nextCandidate && (
          <>
            <span>{nextCandidate.name}</span>
            <Avatar className="h-6 w-6">
              <AvatarImage src={nextCandidate.avatar} />
              <AvatarFallback>{nextCandidate.name[0]}</AvatarFallback>
            </Avatar>
          </>
        )}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

