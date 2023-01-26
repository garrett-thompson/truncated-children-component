import React from "react";

export function ChipContainer() {
  const chips = ["This", "is", "a", "test", "longer chip here"];

  return (
    <div className="w-[300px] flex p-8 rounded-lg bg-slate-200">
      {chips.map((chip) => (
        <Chip>{chip}</Chip>
      ))}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md py-1 px-3 min-w-[32px] mx-2 bg-slate-500 text-white whitespace-nowrap flex-shrink-0">
      {children}
    </div>
  );
}
