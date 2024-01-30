export type QuestionType = "single" | "multiple";

export type QuestionAnswers = {
  letter: string;
  text: string;
};

export type Question = {
  index: number;
  question: string;
  questionType: QuestionType;
  answers: QuestionAnswers[];
  correctAnswer: string[];
};

export type Questions = Question[];
