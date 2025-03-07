/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server, Response } from "miragejs";
import { availableSteps } from "../mock-data/steps-data";
import { availableTopics } from "../mock-data/topics-data";
import { availableQuestions } from "../mock-data/questions-data";
import { defaultAiPoweredInterviewData } from "../mock-data/job-pipeline";

export default function interviewRoutes(server: Server) {
  let storedInterviewData = { ...defaultAiPoweredInterviewData }; // Store updated data

  // Fetch AI-powered interview data by user and interview ID (GET)
  server.get("/interview/ai-powered/user/:userId/interview/:interviewId", (schema, request) => {
    const { userId, interviewId } = request.params;

    if (!userId || !interviewId) {
      return new Response(400, {}, { error: "User ID and Interview ID are required" });
    }

    return new Response(200, {}, storedInterviewData);
  });

  // Update interview data and add questions (POST)
  server.post("/interview/ai-powered/user/:userId/interview/:interviewId", (schema, request) => {
    const { userId, interviewId } = request.params;
    const updatedInterviewData = JSON.parse(request.requestBody);

    if (!updatedInterviewData) {
      return new Response(400, {}, { error: "Invalid interview data" });
    }

    // Add questions to each topic in the steps
    const updatedSteps = updatedInterviewData.steps.map((step: any) => {
      return {
        ...step,
        topics: step.topics.map((topic: any) => {
          const questionsForTopic = availableQuestions[step.id]?.[topic.id] || []; // Get available questions
          return {
            ...topic,
            questions: questionsForTopic // Assign fetched questions
          };
        })
      };
    });

    // Store updated interview data with questions
    storedInterviewData = {
      ...updatedInterviewData,
      steps: updatedSteps
    };

    return new Response(200, {}, storedInterviewData);
  });

  // Search interview steps with query
  server.get("/interview-steps/search", (schema, request) => {
    const { query } = request.queryParams;
    const queryString = Array.isArray(query) ? query[0] : query;

    if (!queryString || queryString?.trim() === "") {
      // Return first few available steps when query is empty
      return availableSteps.slice(0, 5); // Adjust limit as needed
    }

    const filteredSteps = availableSteps.filter((step) => step.title.toLowerCase().includes(queryString.toLowerCase()));

    return filteredSteps.length ? filteredSteps : new Response(404, {}, { error: "No steps found" });
  });

  // Search topics for a given step based on query
  server.get("/interview-topics/:stepId/search", (schema, request) => {
    const { stepId } = request.params;
    const { query } = request.queryParams;

    const topics = availableTopics[stepId] || [];
    const queryString = Array.isArray(query) ? query[0] : query;

    if (!queryString || queryString.trim() === "") {
      // Return first few topics for the given step
      return topics.slice(0, 5);
    }

    const filteredSubtopics = (availableTopics[stepId] || []).filter((subtopic) =>
      subtopic.title.toLowerCase().includes(queryString.toLowerCase())
    );

    return filteredSubtopics.length ? filteredSubtopics : new Response(404, {}, { error: "No subtopics found" });
  });

  // Search subtopics for a given step and topics based on query

  // Search interview subtopics for a given step and topic
  server.get("/interview-subtopics/:stepId/:topicId/search", (schema, request) => {
    const { query } = request.queryParams;

    const availableTopics = [
      { id: 1, title: "What is your experience with JavaScript?" },
      { id: 2, title: "Explain closures in JavaScript" },
      { id: 3, title: "How do you handle asynchronous code?" },

      { id: 4, title: "Describe your experience with React." },
      { id: 5, title: "Explain component lifecycle in React." },
      { id: 6, title: "What are React hooks?" },

      { id: 7, title: "Explain SQL JOIN operations." },
      { id: 8, title: "What is normalization in databases?" },
      { id: 9, title: "How would you optimize database queries?" },

      { id: 10, title: "What is Agile methodology?" },
      { id: 11, title: "Explain Scrum process." },
      { id: 12, title: "What are the roles in Agile teams?" }
    ];
    const queryString = Array.isArray(query) ? query[0] : query;

    if (!queryString || queryString.trim() === "") {
      // Return first few subtopics when queryString is empty
      return availableTopics.slice(0, 5);
    }

    const filteredSubtopics = availableTopics.filter((subtopic) =>
      subtopic.title.toLowerCase().includes(queryString?.toLowerCase())
    );

    return filteredSubtopics.length ? filteredSubtopics : new Response(404, {}, { error: "No subtopics found" });
  });

  // API: Refresh a single question
  server.post("/interview/refresh-question/:reqId/:stepId/:topicId/:questionId", (schema, request) => {
    const { stepId, topicId, questionId } = request.params;

    // Find a new question for the given topic (Simulating AI-based question update)
    const availableTopicQuestions = availableQuestions[stepId]?.[topicId] || [];

    if (!availableTopicQuestions.length) {
      return new Response(404, {}, { error: "No available questions found for this topic" });
    }

    // Simulating updated question (replace the old one with a new random one)
    const newQuestion = {
      ...availableTopicQuestions[Math.floor(Math.random() * availableTopicQuestions.length)],
      id: questionId // Keep the same ID
    };

    return new Response(200, {}, newQuestion);
  });

  server.post("/interview-scheduled/ai-powered/user/:userId/interview/:interviewId", (schema, request) => {


    return new Response(200, {});
  });


  // `/interview-scheduled/ai-powered/user/${userId}/interview/${interviewId}`

}
