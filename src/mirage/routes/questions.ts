import { Server, Response } from "miragejs";
import { availableQuestions } from "../mock-data/questions-data";

export default function questionsRoutes(server: Server) {
  // Fetch all questions for a given step and subtopic
  server.get("/interview-questions/steps/:stepId", (schema, request) => {
    const { stepId, subtopicId } = request.params;
    const questions = availableQuestions[stepId]?.[subtopicId] || [];

    return questions.length ? questions : new Response(404, {}, { error: "No questions found" });
  });

  // Add a new question to a step & subtopic
  server.post("/interview-questions/:stepId/:subtopicId", (schema, request) => {
    const { stepId, subtopicId } = request.params;
    const newQuestion = JSON.parse(request.requestBody);

    if (!newQuestion.id || !newQuestion.content) {
      return new Response(400, {}, { error: "Invalid question data" });
    }

    if (!availableQuestions[stepId]) {
      availableQuestions[stepId] = {};
    }
    if (!availableQuestions[stepId][subtopicId]) {
      availableQuestions[stepId][subtopicId] = [];
    }

    availableQuestions[stepId][subtopicId].push(newQuestion);
    return new Response(201, {}, newQuestion);
  });

  // Delete a question from a step & subtopic
  server.delete("/interview-questions/steps/:stepId/topics/:subtopicId/questions/:questionId", (schema, request) => {
    const { stepId, subtopicId, questionId } = request.params;

    if (!availableQuestions[stepId] || !availableQuestions[stepId][subtopicId]) {
      return new Response(404, {}, { error: "Step or subtopic not found" });
    }

    availableQuestions[stepId][subtopicId] = availableQuestions[stepId][subtopicId].filter((q) => q.id !== questionId);
    return new Response(204);
  });
}
