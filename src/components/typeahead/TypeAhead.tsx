import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from "rxjs";
import { getColor } from "@/utils/color";
import { FlexBox, FlexItem } from "@/components/layout/Flexbox";
import Button from "@/components/button/Button";

interface ITypeAheadProps<T extends string | number> {
  debounceMs?: number;
  placeholder?: string;
  onValueChange: (newVal: string) => Promise<T[]>;
  onError?: (error: Error) => void;
}

const StyledTypeAhead = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    padding: 0.5rem;
    color: ${getColor("black")};
    background-color: ${getColor("white")};
    &::placeholder {
      color: ${getColor("grey")};
    }
  }
  ul {
    margin-top: 1rem;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    max-width: 100%;
    overflow: auto;
    scrollbar-width: none;
    &.canScrollLeft {
      mask: linear-gradient(to right, transparent 0%, black 10%);
    }
    &.canScrollRight {
      mask: linear-gradient(to left, transparent 0%, black 10%);
    }

    &.canScrollLeft.canScrollRight {
      mask: linear-gradient(
        to right,
        transparent,
        black 10%,
        black 90%,
        transparent
      );
    }

    li {
      font-size: x-small;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: ${getColor("blue")};
      color: ${getColor("blue", "font")};
      cursor: pointer;
      &:hover {
        background-color: ${getColor("green")};
      }
    }
  }
`;

function TypeAhead<T extends string | number>(props: ITypeAheadProps<T>) {
  const {
    debounceMs = 300,
    placeholder = "Search...",
    onValueChange,
    onError = console.error,
  } = props;

  const [results, setResults] = useState<T[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const sub = fromEvent(inputRef.current, "keyup")
      .pipe(
        debounceTime(debounceMs),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap((v) => {
          return v.length
            ? onValueChange(v).catch((err) => {
                console.log("error", err);
                return [];
              })
            : Promise.resolve([]);
        }),
      )
      .subscribe({
        next: (v) => {
          setResults(v);
        },
        error: onError,
      });
    return () => {
      sub.unsubscribe();
    };
  }, [inputRef.current]);

  useEffect(() => {
    handleScroll();
  }, [results.length]);

  const handleScroll = () => {
    if (ulRef.current === null) {
      return;
    }
    setCanScrollLeft(ulRef.current.scrollLeft > 0);
    setCanScrollRight(
      ulRef.current.scrollLeft + ulRef.current.clientWidth <
        ulRef.current.scrollWidth,
    );
  };

  return (
    <StyledTypeAhead>
      <FlexBox $gap="small" $alignItems="center">
        <FlexItem $grow={1}>
          <input ref={inputRef} placeholder={placeholder} />
        </FlexItem>
        <Button buttonText="+" size="sm" color="green" />
      </FlexBox>
      <ul
        ref={ulRef}
        onScroll={handleScroll}
        className={`${canScrollLeft ? "canScrollLeft" : ""} ${canScrollRight ? "canScrollRight" : ""}`}
      >
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </StyledTypeAhead>
  );
}

export default TypeAhead;
