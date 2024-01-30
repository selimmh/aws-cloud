"use client";

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-between gap-16">
        <Link
          href="/quiz"
          className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
        >
          QUIZ
        </Link>
        <Link
          href="/question/0"
          className="w-36 justify-center flex gap-1 border p-4 hover:bg-neutral-900 rounded-md cursor-pointer transition-all border-neutral-700"
        >
          QUESTIONS
        </Link>
      </div>
    </main>
  );
}
