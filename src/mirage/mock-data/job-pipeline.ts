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
      id: "introduction",
      title: "Introduction",
      topics: [
        {
          id: "self-introduction",
          title: "Self introduction",
          addImprovisations: true,
          subTopics: [
            {
              id: "self-introduction-1",
              title: "Describe a project you worked on recently."
            },
            {
              id: "self-introduction-2",
              title: "What challenges did you face while working on this project?"
            }
          ],
          isSelected: true,
          questions: []
        },
        {
          id: "project-introduction",
          title: "Project introduction",
          addImprovisations: true,
          subTopics: [
            {
              id: "project-introduction-1",
              title: "Describe a project you worked on recently."
            },
            {
              id: "project-introduction-2",
              title: "What challenges did you face while working on this project?"
            },
            {
              id: "project-introduction-3",
              title: "What technologies did you use in this project?"
            }
          ],
          isSelected: true,
          questions: []
        }
      ]
    },
    {
      id: "technical-skills",
      title: "Technical Skills",
      topics: [
        {
          id: "java",
          title: "Questions on Java",
          addImprovisations: true,
          subTopics: [],
          isSelected: true,
          questions: []
        },
        {
          id: "python",
          title: "Questions on Python",
          addImprovisations: true,
          subTopics: [],
          isSelected: true,
          questions: []
        }
      ]
    }
  ]
};
