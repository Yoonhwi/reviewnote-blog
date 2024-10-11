"use client";

import RoundCard from "./home/round-card";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center bg-stone-600"></section>
      <section className="flex-1 flex items-center justify-center bg-stone-300">
        <div className="flex gap-12">
          <RoundCard />
          <div className="w-40 h-40 rounded-full bg-white shadow-xl border-solid border-stone-200 border-2 flex items-center justify-center"></div>
          <div className="w-40 h-40 rounded-full bg-white shadow-xl border-solid border-stone-200 border-2 flex items-center justify-center"></div>
        </div>
      </section>
    </div>
  );
}
