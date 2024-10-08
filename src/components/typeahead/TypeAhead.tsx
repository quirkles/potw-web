import { F } from "@mobily/ts-belt";
import { useEffect, useRef, useState } from "react";
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  tap,
} from "rxjs";
import { styled } from "styled-components";

import { Colors } from "@/app/styles/colors";

import Button from "@/components/button/Button";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import Spacer from "@/components/spacer/Spacer";

import { getColorVariant } from "@/utils/color";

interface ITypeAheadProps<
  T extends
    | string
    | number
    | {
        displayText: string | number;
        value: string | number;
      },
> {
  debounceMs?: number;
  placeholder?: string;
  onValueChange: (newVal: string) => Promise<T[]>;
  onSelect: (selected: T) => void;
  onAddFromInput: (value: string) => void;
  onError?: (error: Error) => void;
  validate?: (value: string) => string | null;
}

const StyledTypeAhead = styled.div`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    padding: 0.5rem;
    color: ${getColorVariant("black")};
    background-color: ${getColorVariant("white")};
    &::placeholder {
      color: ${getColorVariant("grey")};
    }
  }
  small {
    color: ${getColorVariant("red")};
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
      background-color: ${getColorVariant("green")};
      color: ${getColorVariant("green", "font")};
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background-color: ${Colors.green_700};
      }
    }
  }
`;

function TypeAhead<
  T extends
    | string
    | number
    | {
        displayText: string | number;
        value: string | number;
      },
>(props: ITypeAheadProps<T>) {
  const {
    debounceMs = 300,
    placeholder = "Search...",
    onValueChange,
    onAddFromInput,
    onSelect,
    validate = F.always(null),
    onError = console.error,
  } = props;

  const [results, setResults] = useState<T[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const handleAddFromInput = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      if (!value) {
        return;
      }
      let errorMsg = validate(value);
      if (errorMsg) {
        setErrorMsg(errorMsg);
        return;
      }
      let matchingValue = results.find((r) => {
        if (typeof r == "string" || typeof r == "number") {
          return r === value;
        }
        return r.displayText === value;
      });
      if (matchingValue) {
        return handleItemClick(matchingValue);
      } else {
        onAddFromInput(inputRef.current.value);
      }
      inputRef.current.value = "";
      inputRef.current.focus();
      inputRef.current.dispatchEvent(new Event("keyup", { bubbles: true }));
      setResults([]);
    }
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    let doAdd: boolean = false;
    const sub = fromEvent<KeyboardEvent>(inputRef.current, "keyup")
      .pipe(
        tap((e: KeyboardEvent) => {
          if (e.code === "Enter") {
            // console.log("enter");
            doAdd = true;
          }
        }),
        debounceTime(debounceMs),
        map((e: any) => e.target.value.replace(/\n\t\s+/g, "").trim()),
        distinctUntilChanged(),
        switchMap((v) => {
          setErrorMsg(null);
          return v.length
            ? onValueChange(v).catch((err) => {
                return [];
              })
            : Promise.resolve([]);
        }),
      )
      .subscribe({
        next: (v) => {
          setResults(v);
          if (doAdd) {
            handleAddFromInput();
          }
          doAdd = false;
        },
        error: (err) => {
          doAdd = false;
          onError(err);
        },
      });
    return () => {
      sub.unsubscribe();
    };
  });

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

  const handleItemClick = (item: T) => {
    onSelect(item);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
      inputRef.current.dispatchEvent(new Event("keyup", { bubbles: true }));
      setResults([]);
    }
  };

  return (
    <StyledTypeAhead>
      <FlexContainer $gap="small" $alignItems="baseline">
        <FlexItem $grow={1}>
          <input ref={inputRef} placeholder={placeholder} />
          {errorMsg && <small>{errorMsg}</small>}
        </FlexItem>
        <FlexItem>
          <Spacer $paddingX="small">
            <Button
              buttonText="add"
              size="sm"
              color="green"
              onClick={handleAddFromInput}
            />
          </Spacer>
        </FlexItem>
      </FlexContainer>
      {results.length === 0 ? (
        <ul>
          {inputRef.current?.value.trim().length ? (
            <li style={{ backgroundColor: Colors.orange }}>
              No results to show
            </li>
          ) : (
            <li style={{ backgroundColor: Colors.blue }}>
              Begin typing to search...
            </li>
          )}
        </ul>
      ) : (
        <ul
          ref={ulRef}
          onScroll={handleScroll}
          className={`${canScrollLeft ? "canScrollLeft" : ""} ${canScrollRight ? "canScrollRight" : ""}`}
        >
          {results.map((r) =>
            typeof r == "string" || typeof r == "number" ? (
              <li onClick={() => handleItemClick(r)} key={r}>
                {r}
              </li>
            ) : (
              <li onClick={() => handleItemClick(r)} key={r.value}>
                {r.displayText}
              </li>
            ),
          )}
        </ul>
      )}
    </StyledTypeAhead>
  );
}

export default TypeAhead;
