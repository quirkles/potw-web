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
  div {
    input {
      width: 100%;
      padding: 0.5rem;
      color: ${getColor("black")};
      background-color: ${getColor("white")};
      &::placeholder {
        color: ${getColor("grey")};
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

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const sub = fromEvent(ref.current, "keyup")
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
  }, [ref.current]);

  return (
    <StyledTypeAhead>
      <FlexBox $gap="small" $alignItems="center">
        <FlexItem $grow={1}>
          <input ref={ref} placeholder={placeholder} />
        </FlexItem>
        <Button buttonText="+" size="sm" color="green" />
      </FlexBox>
      <ul>
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </StyledTypeAhead>
  );
}

export default TypeAhead;
