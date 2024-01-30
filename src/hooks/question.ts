import { useCallback } from "react";
import { Questions } from "@/types/question";
import questionsRaw from "@/data/practice-exam-all.json";
import { useRouter } from "next/navigation";

export const useQuestion = (index: number) => {
  const router = useRouter();
  const questions = questionsRaw as Questions;
  const currentQuestion = questions[index];

  const handleNext = useCallback(() => {
    if (index < questions.length - 1) {
      router.push(`/question/${index + 1}`);
    }
  }, [index, router]);

  const handlePrevious = useCallback(() => {
    if (index > 0) {
      router.push(`/question/${index - 1}`);
    }
  }, [index, router]);

  const handleRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    router.push(`/question/${randomIndex}`);
  }, [router]);

  return {
    question: currentQuestion,
    allQuestions: questions,
    total: questions.length,
    handleNext,
    handlePrevious,
    handleRandom,
  };
};
