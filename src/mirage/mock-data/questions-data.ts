import type { InterviewQuestion } from "@/types/job-pipline/ai-interview";

export const availableQuestions: Record<string, Record<string, InterviewQuestion[]>> = {
  introduction: {
    "self-introduction": [
      {
        id: "intro-1",
        title:
          "Hello Hope! I'm Co-recruit, your virtual interview assistant today. I'll be guiding you through a few questions to get to know you better. This is meant to be a relaxed start, so take your time. Ready to begin?",
        isLocked: true
      },
      {
        id: "intro-2",
        title: "Tell me a little about yourself beyond your resume—what are some of your hobbies or interests?",
        isEditable: true
      },
      {
        id: "intro-3",
        title: "What inspired you to apply for this role or industry?",
        isEditable: true
      },
      {
        id: "intro-4",
        title: "If you could work on any project in the world, what would it be and why?",
        isEditable: true
      },
      {
        id: "intro-5",
        title: "What's something you're proud of achieving recently, either personally or professionally?",
        isEditable: true
      },
      {
        id: "intro-6",
        title:
          "Thank you for sharing, Hope! Now, we'll move into questions more specific to your skills and experience. Take a deep breath, and let's continue!",
        isLocked: true
      }
    ],
    "project-introduction": [
      { id: "project-introduction-1", title: "Describe a project you worked on recently.", isEditable: true },
      {
        id: "project-introduction-2",
        title: "What challenges did you face while working on this project?",
        isEditable: true
      },
      { id: "project-introduction-3", title: "What technologies did you use in this project?", isEditable: true }
    ],
    "team-introduction": [
      { id: "team-introduction-1", title: "Describe a project you worked on recently.", isEditable: true },
      {
        id: "team-introduction-2",
        title: "What challenges did you face while working on this project?",
        isEditable: true
      },
      { id: "team-introduction-3", title: "What technologies did you use in this project?", isEditable: true }
    ]
  },

  "technical-javascript": {
    "js-scope": [
      { id: "js-scope-1", title: "Explain the concept of JavaScript scope.", isEditable: true },
      { id: "js-scope-2", title: "How does lexical scope work in JavaScript?", isEditable: true },
      { id: "js-scope-3", title: "Provide an example of closures in JavaScript.", isEditable: true }
    ],
    hoisting: [
      { id: "hoisting-1", title: "How does hoisting work in JavaScript?", isEditable: true },
      {
        id: "hoisting-2",
        title: "What is the difference between variable hoisting and function hoisting?",
        isEditable: true
      },
      { id: "hoisting-3", title: "What are some gotchas when working with hoisting in JavaScript?", isEditable: true }
    ],
    closures: [
      { id: "closures-1", title: "What is a closure in JavaScript and how does it work?", isEditable: true },
      { id: "closures-2", title: "Explain the advantages and disadvantages of using closures.", isEditable: true },
      {
        id: "closures-3",
        title: "Provide an example of closures in a real-world JavaScript application.",
        isEditable: true
      }
    ],
    "event-loop": [
      { id: "event-loop-1", title: "How does the JavaScript event loop work?", isEditable: true },
      {
        id: "event-loop-2",
        title: "What is the difference between microtasks and macrotasks in the event loop?",
        isEditable: true
      },
      { id: "event-loop-3", title: "Explain how async/await interacts with the event loop.", isEditable: true }
    ]
  },
  "technical-skills": {
    java: [
      { id: "java-1", title: "What is Java and how is it different from other programming languages?", isEditable: true },
      { id: "java-2", title: "Explain the concept of object-oriented programming in Java.", isEditable: true },
      { id: "java-3", title: "How do you handle exceptions in Java?", isEditable: true }
    ],
    python: [
      {
        id: "python-1",
        title: "What is Python and how is it different from other programming languages?",
        isEditable: true
      },
      { id: "python-2", title: "Explain the concept of object-oriented programming in Python.", isEditable: true },
      { id: "python-3", title: "How do you handle exceptions in Python?", isEditable: true }
    ],
    javascript: [
      {
        id: "javascript-1",
        title: "What is JavaScript and how is it different from other programming languages?",
        isEditable: true
      },
      { id: "javascript-2", title: "Explain the concept of object-oriented programming in JavaScript.", isEditable: true },
      { id: "javascript-3", title: "How do you handle exceptions in JavaScript?", isEditable: true }
    ],
    html: [
      { id: "html-1", title: "What is HTML and how is it different from other programming languages?", isEditable: true },
      { id: "html-2", title: "Explain the concept of object-oriented programming in HTML.", isEditable: true },
      { id: "html-3", title: "How do you handle exceptions in HTML?", isEditable: true },
      { id: "html-4", title: "How do you handle exceptions in HTML?", isEditable: true }
    ],
    css: [
      {
        id: "css-1",
        title: "What is CSS and how is it different from other programming languages?",
        isEditable: true
      },
      { id: "css-2", title: "Explain the concept of object-oriented programming in CSS.", isEditable: true },
      { id: "css-3", title: "How do you handle exceptions in CSS?", isEditable: true },
      { id: "css-4", title: "How do you handle exceptions in CSS?", isEditable: true }
    ]
  },

  "technical-react": {
    "react-hooks": [
      { id: "react-hooks-1", title: "What are React Hooks and why are they important?", isEditable: true },
      { id: "react-hooks-2", title: "Explain the difference between useState and useReducer.", isEditable: true },
      { id: "react-hooks-3", title: "When should you use useEffect in a component?", isEditable: true }
    ],
    "state-management": [
      { id: "state-management-1", title: "What are the different ways to manage state in React?", isEditable: true },
      {
        id: "state-management-2",
        title: "Explain the difference between useState and useReducer.",
        isEditable: true
      },
      { id: "state-management-3", title: "When should you use a library like Redux?", isEditable: true }
    ],
    "performance-optimization": [
      {
        id: "performance-optimization-1",
        title: "What are some tips for optimizing React performance?",
        isEditable: true
      },
      { id: "performance-optimization-2", title: "Explain the concept of memoization.", isEditable: true },
      { id: "performance-optimization-3", title: "How can you use React Profiler?", isEditable: true }
    ],
    "component-lifecycle": [
      { id: "component-lifecycle-1", title: "What are the different lifecycle methods in React?", isEditable: true },
      {
        id: "component-lifecycle-2",
        title: "Explain the difference between componentDidMount and componentDidUpdate.",
        isEditable: true
      },
      { id: "component-lifecycle-3", title: "When should you use useEffect in a component?", isEditable: true },
      { id: "component-lifecycle-4", title: "Explain the concept of shouldComponentUpdate.", isEditable: true }
    ]
  },

  "technical-databases": {
    "sql-queries": [
      { id: "sql-queries-1", title: "What are the different types of SQL joins?", isEditable: true },
      { id: "sql-queries-2", title: "How do you optimize SQL queries for performance?", isEditable: true },
      { id: "sql-queries-3", title: "What is an index in SQL, and how does it work?", isEditable: true }
    ],

    "nosql-vs-sql": [
      { id: "nosql-vs-sql-1", title: "What are the main differences between SQL and NoSQL databases?", isEditable: true },
      {
        id: "nosql-vs-sql-2",
        title: "What are the advantages and disadvantages of using NoSQL databases?",
        isEditable: true
      },
      { id: "nosql-vs-sql-3", title: "When should you use SQL or NoSQL databases?", isEditable: true }
    ],
    "database-indexing": [
      {
        id: "database-indexing-1",
        title: "What is database indexing, and how does it improve query performance?",
        isEditable: true
      },
      { id: "database-indexing-2", title: "What are the different types of indexes in a database?", isEditable: true },
      { id: "database-indexing-3", title: "When should you use indexes in a database?", isEditable: true }
    ]
  },

  "technical-data-structures": {
    "arrays-linkedlists": [
      { id: "arrays-linkedlists-1", title: "Explain the differences between arrays and linked lists.", isEditable: true },
      {
        id: "arrays-linkedlists-2",
        title: "What are the advantages and disadvantages of using linked lists?",
        isEditable: true
      },
      {
        id: "arrays-linkedlists-3",
        title: "Provide an example where linked lists perform better than arrays.",
        isEditable: true
      }
    ],

    "stacks-queues": [
      { id: "stacks-queues-1", title: "Explain the differences between stacks and queues.", isEditable: true },
      {
        id: "stacks-queues-2",
        title: "What are the advantages and disadvantages of using queues?",
        isEditable: true
      }
    ],
    "trees-graphs": [
      { id: "trees-graphs-1", title: "Explain the differences between binary trees and graphs.", isEditable: true },
      { id: "trees-graphs-2", title: "What are the advantages and disadvantages of using graphs?", isEditable: true },
      {
        id: "trees-graphs-3",
        title: "Provide an example where graphs perform better than binary trees.",
        isEditable: true
      }
    ],
    hashing: [
      { id: "hashing-1", title: "Explain the concept of hashing and its importance.", isEditable: true },
      { id: "hashing-2", title: "What are the different types of hash functions?", isEditable: true },
      { id: "hashing-3", title: "What are the advantages and disadvantages of using hashing?", isEditable: true }
    ]
  },

  "technical-system-design": {
    scalability: [
      { id: "scalability-1", title: "How does scalability compare to other similar concepts?", isEditable: true },
      { id: "scalability-2", title: "Describe a real-world use case of scalability.", isEditable: true },
      { id: "scalability-3", title: "Explain the concept of scalability and its importance.", isEditable: true }
    ],
    "database-sharding": [
      {
        id: "database-sharding-1",
        title: "How does database sharding compare to other similar concepts?",
        isEditable: true
      },
      {
        id: "database-sharding-2",
        title: "Explain the concept of database sharding and its importance.",
        isEditable: true
      },
      { id: "database-sharding-3", title: "What are the common challenges in database sharding?", isEditable: true }
    ],
    "caching-strategies": [
      {
        id: "caching-strategies-1",
        title: "Explain the concept of caching strategies and its importance.",
        isEditable: true
      },
      { id: "caching-strategies-2", title: "What are the common challenges in caching strategies?", isEditable: true },
      {
        id: "caching-strategies-3",
        title: "Describe a real-world scenario where caching strategies are useful.",
        isEditable: true
      }
    ]
  },

  behavioral: {
    "team-collaboration": [
      {
        id: "team-collaboration-1",
        title: "Describe a time when you had to work collaboratively with a team.",
        isEditable: true
      },
      {
        id: "team-collaboration-2",
        title: "How do you handle conflicts in a team setting?",
        isEditable: true
      },
      {
        id: "team-collaboration-3",
        title: "What strategies do you use for improving teamwork?",
        isEditable: true
      }
    ],
    "handling-feedback": [
      {
        id: "handling-feedback-1",
        title: "Describe a time when you received constructive feedback.",
        isEditable: true
      },
      {
        id: "handling-feedback-2",
        title: "How do you respond to constructive feedback?",
        isEditable: true
      }
    ],
    "communication-skills": [
      {
        id: "communication-skills-1",
        title: "Describe a time when you had to communicate effectively with others.",
        isEditable: true
      },
      {
        id: "communication-skills-2",
        title: "What strategies do you use for effective communication?",
        isEditable: true
      }
    ]
  },

  "problem-solving": {
    "logical-thinking": [
      { id: "logical-thinking-1", title: "Describe a problem you solved using logical reasoning.", isEditable: true },
      {
        id: "logical-thinking-2",
        title: "How do you approach complex problems with a structured approach?",
        isEditable: true
      },
      { id: "logical-thinking-3", title: "What steps do you take when debugging an issue?", isEditable: true }
    ],

    "debugging-skills": [
      { id: "debugging-skills-1", title: "Describe a time when you encountered a debugging challenge.", isEditable: true },
      { id: "debugging-skills-2", title: "What steps do you take when debugging an issue?", isEditable: true }
    ]
  },

  "final-round": {
    "career-goals": [
      { id: "career-goals-1", title: "Where do you see yourself in 5 years?", isEditable: true },
      { id: "career-goals-2", title: "What are your long-term career aspirations?", isEditable: true },
      { id: "career-goals-3", title: "How does this role fit into your career path?", isEditable: true }
    ],
    "final-assessment": [
      { id: "final-assessment-1", title: "What are your key strengths and weaknesses?", isEditable: true },
      { id: "final-assessment-2", title: "What are your goals for this role?", isEditable: true },
      { id: "final-assessment-3", title: "What are your expectations for the interview process?", isEditable: true }
    ]
  }
};
