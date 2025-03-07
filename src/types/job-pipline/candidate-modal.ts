export interface Email {
  id: string
  from: {
    name: string
    email: string
    avatar?: string
  }
  to: {
    name: string
    email: string
    avatar?: string
  }
  subject: string
  message: string
  date: string
  attachments?: {
    name: string
    size: string
    type: string
  }[]
}

export interface Note {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  date: string
}

export interface Interview {
  id: string
  title: string
  reqId: string
  client: string
  candidate: {
    name: string
    avatar: string
  }
  panel: {
    name: string
    avatar: string
  }[]
  date: string
  startTime: string
  endTime: string
  platform: {
    name: string
    icon: string
  }
  attachments: {
    name: string
    type: string
  }[]
  status: "scheduled" | "completed" | "cancelled"
}

