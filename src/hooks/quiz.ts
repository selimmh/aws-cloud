import { Questions } from "@/types/question";
import { useQuestion } from "./question";

export const useQuiz = () => {
  const { allQuestions } = useQuestion(0);

  const quizChunks = allQuestions.reduce(
    (resultArray: any, item: any, index: number) => {
      const chunkIndex = Math.floor(index / 50);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray as Questions[];
    },
    []
  );

  return { quizChunks };
};
