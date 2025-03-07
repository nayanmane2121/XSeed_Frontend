import type { InterviewTopic } from "@/types/job-pipline/ai-interview";

export const availableTopics: Record<string, InterviewTopic[]> = {
  introduction: [
    { id: "self-introduction", title: "Self Introduction" },
    { id: "project-introduction", title: "Project Introduction" },
    { id: "team-introduction", title: "Team Introduction" }
  ],
  "technical-javascript": [
    { id: "js-scope", title: "JavaScript Scope" },
    { id: "hoisting", title: "Hoisting" },
    { id: "closures", title: "Closures" },
    { id: "event-loop", title: "Event Loop & Async/Await" }
  ],
  "technical-skills": [
    {
      id: "java",
      title: "Questions on Java",
      isSelected: true,
    },
    {
      id: "python",
      title: "Questions on Python",
  
    },
    {
      id: "javascript",
      title: "Questions on JavaScript",
  
    },
    {
      id: "html",
      title: "Questions on HTML",
  
    },
    {
      id: "css",
      title: "Questions on CSS",
  
    }
  ],
  "technical-react": [
    { id: "react-hooks", title: "React Hooks" },
    { id: "performance-optimization", title: "Performance Optimization" },
    { id: "state-management", title: "State Management (Redux, Recoil)" },
    { id: "component-lifecycle", title: "Component Lifecycle" }
  ],
  "technical-databases": [
    { id: "sql-queries", title: "SQL Queries" },
    { id: "nosql-vs-sql", title: "NoSQL vs SQL" },
    { id: "database-indexing", title: "Database Indexing & Optimization" }
  ],
  "technical-data-structures": [
    { id: "arrays-linkedlists", title: "Arrays & Linked Lists" },
    { id: "stacks-queues", title: "Stacks & Queues" },
    { id: "trees-graphs", title: "Trees & Graphs" },
    { id: "hashing", title: "Hashing Techniques" }
  ],
  "technical-system-design": [
    { id: "scalability", title: "Scalability Principles" },
    { id: "database-sharding", title: "Database Sharding" },
    { id: "caching-strategies", title: "Caching Strategies" }
  ],
  behavioral: [
    { id: "team-collaboration", title: "Team Collaboration" },
    { id: "handling-feedback", title: "Handling Feedback & Criticism" },
    { id: "communication-skills", title: "Effective Communication" }
  ],
  "problem-solving": [
    { id: "logical-thinking", title: "Logical Thinking" },
    { id: "debugging-skills", title: "Debugging & Troubleshooting" }
  ],
  "final-round": [
    { id: "career-goals", title: "Career Goals & Aspirations" },
    { id: "final-assessment", title: "Final Interview Assessment" }
  ]
};
