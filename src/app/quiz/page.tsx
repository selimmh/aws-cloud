"use client";

import React from "react";
import { useQuiz } from "@/hooks/quiz";
import Link from "next/link";

export default function Page() {
  const { quizChunks } = useQuiz();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-4">
        {quizChunks.map((chunk, index) => (
          <Link
            href={`/quiz/${index + 1}`}
            key={index}
            className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
          >
            {`QUIZ ${index + 1}`}
          </Link>
        ))}
      </div>
    </main>
  );
}
