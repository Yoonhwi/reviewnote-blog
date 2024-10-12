"use client";

import { Stacks } from "@/app/constants/stacks";
const BaseLayoutFooter = () => {
  return (
    <div className="w-full flex justify-center bg-slate-50 py-12">
      <div className={"w-[960px] flex flex-col gap-6"}>
        <h1 className="font-bold text-3xl">Stacks</h1>
        <div className="flex w-full">
          {Stacks.map((v) => {
            return (
              <div className="flex flex-col gap-2 flex-1" key={v.title}>
                <h1 className="font-bold text-xl">{v.title}</h1>
                {v.stacks.map((s) => {
                  return (
                    <span
                      key={s.title}
                      onClick={() => {
                        window.open(s.url, "_blank");
                      }}
                      className="hover:cursor-pointer hover:underline decoration-2 underline-offset-4"
                    >
                      {s.title}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BaseLayoutFooter;
