"use client";

import { useQuiz } from "@/hooks/quiz";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { quizChunks } = useQuiz();
  const currentQuiz = quizChunks[Number(params.id) - 1];
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);

  const activeQuestion = currentQuiz[currentQuestionIdx];

  const handleNextQuestion = () => {
    if (currentQuestionIdx < currentQuiz.length - 1) {
      setSelected([]);
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIdx > 0) {
      setSelected([]);
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleSelect = (letter: string) => {
    if (selected.includes(letter)) {
      setSelected(selected.filter((item) => item !== letter));
    } else {
      setSelected([...selected, letter]);
    }
  };

  const isGreen = (letter: string) => {
    return activeQuestion.correctAnswer.includes(letter);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-between gap-16 w-[48rem]">
        {/* actions */}
        <div className="flex justify-between gap-16 mb-8">
          <div
            onClick={handlePreviousQuestion}
            className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
          >
            PREVIOUS
          </div>
          <div
            onClick={handleNextQuestion}
            className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
          >
            NEXT
          </div>
        </div>

        {/* question */}
        <div className="flex flex-col gap-12 border p-8 max-w-3xl rounded-md border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="font-extrabold text-sm">
              {currentQuestionIdx + 1}.
            </div>
            <div
              className="font-bold text-xl"
              dangerouslySetInnerHTML={{ __html: activeQuestion.question }}
            />
          </div>
          <div className="flex flex-col gap-4">
            {activeQuestion.answers.map((answer, idx) => (
              <div
                onClick={() => handleSelect(answer.letter)}
                key={idx}
                className={`flex gap-1 border p-6 rounded-md cursor-pointer transition-all border-neutral-900 ${
                  selected.includes(answer.letter)
                    ? `${
                        isGreen(answer.letter) ? "bg-green-900" : "bg-red-900"
                      }`
                    : "hover:bg-neutral-900"
                }`}
              >
                <div>{answer.letter} - </div>
                <div>{answer.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <div className="flex flex-col justify-between gap-16 max-w-3xl">
  //       {currentQuiz.map((question, index) => (
  //         <div className="flex flex-col gap-4">
  //           <div className="font-bold text-xl">{`${index + 1}. ${
  //             question.question
  //           }`}</div>
  //           <div className="flex flex-col gap-2">
  //             {question.answers.map((answer, index) => (
  //               <div>{`${answer.letter}. ${answer.text}`}</div>
  //             ))}
  //           </div>
  //           <div className="flex py-4 cursor-pointer">
  //             <div onClick={() => handleToggleAnswer(index)}>Answer</div>
  //             {showAnswer === index && (
  //               <div>{`: ${question.correctAnswer}`}</div>
  //             )}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </main>
  // );
}
