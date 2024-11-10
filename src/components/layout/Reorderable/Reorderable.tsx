import { F } from "@mobily/ts-belt";
import React, {
  Children,
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";

import { getColor } from "@/app/styles/colors";

import { isChildReactComponent } from "@/utils/logic";

const ReorderableStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

export function ReorderableContainer({ children }: PropsWithChildren) {
  const [isDragging, setIsDragging] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [beforeElementId, setBeforeElementId] = useState<string | null>(null);
  const [afterElementId, setAfterElementId] = useState<string | null>(null);
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);

  const [orderedChildren, setOrderedChildren] = useState<
    {
      id: string;
      child: React.ReactNode;
    }[]
  >([]);

  const childRefs = useRef<{
    [id: string]: HTMLDivElement | null;
  }>({});

  useEffect(() => {
    setOrderedChildren(
      Children.toArray(children)
        .filter(isChildReactComponent)
        .map((child) => ({
          id: child.props.id as string,
          child,
        })),
    );
  }, [children]);

  const onElementDrag = F.throttle((draggedEl: HTMLDivElement, id: string) => {
    setIsDragging(true);
    setDraggedElementId(id);
    let distance = Number.POSITIVE_INFINITY;
    // rip through the refs and find the closest element to the x and y
    let newBeforeElement: {
      id: string | null;
      distance: number;
    } = {
      id: null,
      distance: Number.POSITIVE_INFINITY,
    };
    let newAfterElement: {
      id: string | null;
      distance: number;
    } = {
      id: null,
      distance: Number.POSITIVE_INFINITY,
    };
    Object.keys(childRefs.current)
      .filter((key) => {
        if (key === id) {
          return false;
        }
        // return false if the middle of the dragged element is not within the bounds of the current element
        const currentEl = childRefs.current[key];
        if (!currentEl) {
          return false;
        }
        const currentElRect = currentEl.getBoundingClientRect();
        const draggedElRect = draggedEl.getBoundingClientRect();
        const draggedElMiddleY = draggedElRect.top + draggedElRect.height / 2;
        if (
          draggedElMiddleY < currentElRect.top ||
          draggedElMiddleY > currentElRect.bottom
        ) {
          return false;
        }
        return true;
      })
      .forEach((key) => {
        const currentEl = childRefs.current[key];
        if (!currentEl) {
          return;
        }
        const currentElRect = currentEl.getBoundingClientRect();
        const draggedElRect = draggedEl.getBoundingClientRect();
        const currentElMiddleX = currentElRect.left + currentElRect.width / 2;
        const draggedElMiddleX = draggedElRect.left + draggedElRect.width / 2;
        const distanceToCurrentEl = Math.abs(
          draggedElMiddleX - currentElRect.left,
        );
        if (draggedElMiddleX < currentElMiddleX) {
          if (distanceToCurrentEl < newBeforeElement.distance) {
            newBeforeElement = { id: key, distance: distanceToCurrentEl };
          }
        }
        if (draggedElMiddleX > currentElMiddleX) {
          if (distanceToCurrentEl < newAfterElement.distance) {
            newAfterElement = { id: key, distance: distanceToCurrentEl };
          }
        }
      });
    setBeforeElementId(newBeforeElement.id);
    setAfterElementId(newAfterElement.id);
  }, 50);
  const onElementDrop = () => {
    setOrderedChildren((prev) => {
      const newChildren = prev.filter(({ id }) => id !== draggedElementId);
      const beforeElementIndex = newChildren.findIndex(
        ({ id }) => id === beforeElementId,
      );
      newChildren.splice(beforeElementIndex, 0, {
        id: draggedElementId as string,
        child: orderedChildren.find(({ id }) => id === draggedElementId)?.child,
      });
      return newChildren;
    });
    setDraggedElementId(null);
    setIsDragging(false);
    setBeforeElementId(null);
    setAfterElementId(null);
  };
  return (
    <ReorderableStyle
      onMouseLeave={() => {
        setIsActive(false);
        setIsDragging(false);
        setDraggedElementId(null);
        setBeforeElementId(null);
        setAfterElementId(null);
      }}
      onMouseEnter={() => {
        setIsActive(true);
      }}
    >
      {orderedChildren.map(({ child }, i) => {
        return isChildReactComponent(child) ? (
          <InternalReorderableItem
            key={child.props.id}
            handleDrag={onElementDrag}
            handleDrop={onElementDrop}
            isActive={isActive}
            ref={(el: HTMLDivElement) =>
              (childRefs.current[child.props.id] = el)
            }
            id={child.props.id as string}
            index={i}
            showDropHint={
              isDragging &&
              ((beforeElementId === child.props.id && "before") ||
                (afterElementId === child.props.id && "after") ||
                false)
            }
          >
            {child}
          </InternalReorderableItem>
        ) : null;
      })}
    </ReorderableStyle>
  );
}

const ReorderableItemStyle = styled.div<{
  $isDragging: boolean;
  $draggableSize: {
    width: number | undefined;
    height: number | undefined;
  };
  $showDropHint: "before" | "after" | null | false;
  ref: ForwardedRef<HTMLDivElement>;
}>`
  transition: transform 0.1s ease-in-out;
  transform: ${({ $showDropHint }) => ($showDropHint === "before" ? "translateX(5px)" : $showDropHint === "after" ? "translateX(-5px)" : "none")};
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  position: relative;
  .anchor-content {
    background: repeating-linear-gradient(
      45deg,
      ${getColor("white")} 0px,
      ${getColor("white")} 10px,
      ${getColor("grey_100")} 10px,
      ${getColor("grey_100")} 20px
    );
    width: 100%;
    height: ${({ $draggableSize }) => $draggableSize.height}px;
  }

  > .draggable-content {
    z-index: ${({ $isDragging }) => ($isDragging ? 1 : 0)};
    background-color: ${getColor("white")};
    position: absolute;
    width: 100%;
    height: ${({ $draggableSize }) => $draggableSize.height}px;
  }
  ${({ $showDropHint }) =>
    $showDropHint === "before" && {
      "border-left": `2px solid ${getColor("blue_200")}`,
    }}
  ${({ $showDropHint }) =>
    $showDropHint === "after" && {
      "border-right": `2px solid ${getColor("blue_200")}`,
    }}
}
`;
export function ReorderableItem({
  id,
  children,
}: PropsWithChildren<{
  id: string;
}>) {
  return children;
}
const InternalReorderableItem = forwardRef(function InternalReorderableItem(
  {
    children,
    id,
    index,
    handleDrag,
    isActive,
    handleDrop,
    showDropHint,
  }: PropsWithChildren<{
    id: string;
    index: number;
    ref: (el: HTMLDivElement) => void;
    isActive: boolean;
    handleDrag: (
      draggedEl: HTMLDivElement,
      id: string,
      x: number,
      y: number,
    ) => void;
    handleDrop: (id: string, x: number, y: number) => void;
    showDropHint: "before" | "after" | null | false;
  }>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dragStartPositionRef = useRef({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setContentSize({
      width: contentRef.current?.offsetWidth || 0,
      height: contentRef.current?.offsetHeight || 0,
    });
  }, [contentRef.current?.offsetWidth, contentRef.current?.offsetHeight]);

  useEffect(() => {
    if (!isActive) {
      setIsDragging(false);
      setPosition({ x: 0, y: 0 });
    }
  }, [isActive]);

  useEffect(() => {
    if (!isDragging) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      handleDrag(
        draggableRef.current as HTMLDivElement,
        id,
        e.clientX,
        e.clientY,
      );
      setPosition({
        x: e.clientX - dragStartPositionRef.current.x,
        y: e.clientY - dragStartPositionRef.current.y,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleDrag, id, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartPositionRef.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    handleDrop(id, e.clientX, e.clientY);
  };
  return (
    <ReorderableItemStyle
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      $isDragging={isDragging}
      $draggableSize={contentSize}
      ref={ref}
      $showDropHint={showDropHint}
    >
      {isDragging}
      <div className="anchor-content"></div>
      <div
        ref={draggableRef}
        className="draggable-content"
        style={{
          order: index,
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </ReorderableItemStyle>
  );
});
