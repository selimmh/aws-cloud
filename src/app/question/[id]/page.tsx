"use client";

import React, { useEffect, useState } from "react";
import { useQuestion } from "@/hooks/question";

export default function Page({ params }: { params: { id: string } }) {
  // Custom hook
  const { question, total, handleNext, handlePrevious, handleRandom } =
    useQuestion(Number(params.id));

  // Keyboard listener
  const keyboardListener = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        handlePrevious();
        break;
      case "ArrowRight":
      case " ":
        handleNext();
        break;
      case "r":
        handleRandom();
        break;
    }
  };

  // Add keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", keyboardListener);
    return () => window.removeEventListener("keydown", keyboardListener);
  }, [question]);

  // State
  const [selected, setSelected] = useState<string[]>([]);

  // Handlers
  const handleSelect = (letter: string) => {
    if (selected.includes(letter)) {
      setSelected(selected.filter((item) => item !== letter));
    } else {
      setSelected([...selected, letter]);
    }
  };

  // Helpers
  const isCorrect = (letter: string) => {
    return question.correctAnswer.includes(letter);
  };

  // Check if the selected is correct, if so, select all the answers automatically
  useEffect(() => {
    const isCorrectAnswer = question.correctAnswer.every((letter) =>
      selected.includes(letter)
    );
    const newSelected = isCorrectAnswer
      ? question.answers.map((answer) => answer.letter)
      : selected;

    if (JSON.stringify(selected) !== JSON.stringify(newSelected)) {
      setSelected(newSelected);
    }
  }, [selected, question]);

  return (
    <div className="flex flex-col items-center justify-between p-24">
      {/* actions */}
      <div className="flex justify-between gap-16 mb-8">
        <div
          onClick={() => handlePrevious()}
          className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
        >
          PREVIOUS
        </div>
        <div
          onClick={handleRandom}
          className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
        >
          RANDOM
        </div>
        <div
          onClick={handleNext}
          className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
        >
          NEXT
        </div>
      </div>

      {/* question */}
      <div className="flex flex-col gap-12 border p-8 max-w-3xl rounded-md border-neutral-700">
        <div className="flex items-center gap-4">
          <div className="text-xs">{question.index}.</div>
          <div className="font-bold text-xl">{question.question}</div>
        </div>
        <div className="flex flex-col gap-4">
          {question.answers.map((answer, idx) => (
            <div
              onClick={() => handleSelect(answer.letter)}
              key={idx}
              className={`flex gap-1 border p-6 rounded-md cursor-pointer transition-all border-neutral-900 ${
                selected.includes(answer.letter)
                  ? `${
                      isCorrect(answer.letter) ? "bg-green-900" : "bg-red-900"
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
  );
}
