import {
  ReactNode,
  useRef,
  forwardRef,
  useLayoutEffect,
  useState,
} from "react";

export function ChipContainer() {
  const chips = ["This", "is", "a", "test", "longer chip here"];

  const containerRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<Record<string, HTMLDivElement>>({});
  const [visibleChips, setVisibleChips] = useState<string[]>([]);

  useLayoutEffect(() => {
    const containerDimensions = containerRef.current?.getBoundingClientRect();

    if (containerDimensions) {
      Object.entries(chipsRef.current).forEach(([key, node]) => {
        const chipDimensions = node?.getBoundingClientRect();

        const withinContainer =
          chipDimensions.width + chipDimensions.x <
          containerDimensions.width + containerDimensions.x;

        if (withinContainer) {
          setVisibleChips((state) => {
            // React renders twice in strict mode so
            // we need to dedupe here
            if (!state.includes(key)) {
              return [...state, key];
            }

            return state;
          });
        }
      });
    }
  }, []);

  // First render, we need to render everything.
  // All subsequent renders, we only render the visible chips.
  const chipsToRender = visibleChips.length > 0 ? visibleChips : chips;

  return (
    <div
      className="w-[200px] flex p-8 rounded-lg bg-slate-200"
      ref={containerRef}
    >
      {chipsToRender.map((chip, i) => (
        <Chip
          key={`${chip}-${i}`}
          ref={(node) => {
            // TypeScript says the node can be null here?
            if (node) {
              chipsRef.current[chip] = node;
            } else {
              delete chipsRef.current[chip];
            }
          }}
        >
          {chip}
        </Chip>
      ))}
    </div>
  );
}

interface ChipProps {
  children?: ReactNode;
}

const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(props, ref) {
  return (
    <div
      className="rounded-md py-1 px-3 min-w-[32px] mx-2 bg-slate-500 text-white whitespace-nowrap flex-shrink-0"
      ref={ref}
    >
      {props.children}
    </div>
  );
});
