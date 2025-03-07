import type { InterviewConfig } from "@/types/job-pipline/ai-interview";

export const defaultAiPoweredInterviewData: InterviewConfig = {
  title: "Python Developer",
  client: "UKco - United Kingdom Co.",
  reqId: "447",
  candidate: {
    name: "Hope Doe",
    avatar: "/placeholder.svg"
  },
  expirationDays: 3,
  steps: [
    {
      id: "84d49a0f-0199-4ac4-a240-d57f5ff22c55",
      title: "Introduction",
      topics: [
        {
          id: "d784677c-2f28-4ff4-be25-8a6d527fc881",
          title: "Personal Introduction",
          addImprovisations: true,
          subTopics: [],
          questions: [
            {
              id: "q1",
              title: "Can you briefly introduce yourself?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Easy",
              isLocked: false
            },
            {
              id: "q2",
              title: "What are your key strengths?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Medium",
              isLocked: false
            }
          ]
        },
        {
          id: "453f029d-84e5-471c-916d-c53ea2c876e6",
          title: "Role Introduction",
          addImprovisations: true,
          subTopics: [],
          questions: [
            {
              id: "q3",
              title: "What interests you about this role?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Medium",
              isLocked: false
            },
            {
              id: "q4",
              title: "How does this role align with your career goals?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Hard",
              isLocked: false
            }
          ]
        }
      ]
    },
    {
      id: "9cd706a9-503b-415a-aaf8-395f22749e8d",
      title: "Analytical",
      topics: [
        {
          id: "79455f0b-3547-4197-b42c-1933e5f089a3",
          title: "Teamwork and Collaboration",
          addImprovisations: true,
          subTopics: [],
          questions: [
            {
              id: "q5",
              title: "Describe a time when you successfully worked in a team.",
              answer: null,
              subTopic: null,
              difficultyLevel: "Medium",
              isLocked: false
            },
            {
              id: "q6",
              title: "How do you handle conflicts in a team setting?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Hard",
              isLocked: false
            }
          ]
        },
        {
          id: "78d8f60c-6106-409c-9f1f-11ccfcd4e8a5",
          title: "Leadership & Ownership",
          addImprovisations: true,
          subTopics: [],
          questions: [
            {
              id: "q7",
              title: "Can you share an experience where you took ownership of a project?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Medium",
              isLocked: false
            },
            {
              id: "q8",
              title: "What leadership style do you prefer, and why?",
              answer: null,
              subTopic: null,
              difficultyLevel: "Hard",
              isLocked: false
            }
          ]
        }
      ]
    }
  ]
};
