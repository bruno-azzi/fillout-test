"use client";

import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import {
  useSensor,
  useSensors,
  DndContext,
  PointerSensor,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { BiPlus } from "react-icons/bi";

import PageNode from "./SortableItem";
import { Page } from "../types";

type Props = {
  pages: Page[];
  setPages: Dispatch<SetStateAction<Page[]>>;
  setActivePageId: Dispatch<SetStateAction<number>>;
  activePageId: number;
};

export const SortablePageNodes: React.FC<Props> = ({
  pages,
  setPages,
  setActivePageId,
  activePageId,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleAddPage = (index: number) => {
    const newPage = {
      id: Date.now(),
      title: `Page ${pages.length + 1}`,
    };
    const newPages = [...pages];
    newPages.splice(index + 1, 0, newPage);
    setPages(newPages);
    setActivePageId(newPage.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-wrap gap-y-2 relative">
        <SortableContext items={pages} strategy={rectSortingStrategy}>
          {pages.map((page, index) => {
            const showPlusBtn =
              hoverIndex === index && index < pages.length - 1;

            return (
              <Fragment key={page.id}>
                <PageNode
                  page={page}
                  active={activePageId === page.id}
                  onClick={setActivePageId}
                />

                <div
                  className={`w-5 h-8 flex items-center justify-center relative duration-200 ${
                    showPlusBtn ? "w-14" : ""
                  }`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {showPlusBtn && (
                    <div className="absolute left-1/2 top-1/2 -translate-1/2 w-full h-full flex justify-center items-center">
                      <button
                        onClick={() => handleAddPage(index)}
                        className="w-4 h-4 bg-white border border-primary-borders shadow-primary rounded-full flex items-center justify-center cursor-pointer fade-in"
                      >
                        <BiPlus size={16} />
                      </button>
                    </div>
                  )}
                  <div className="w-full h-1 dashed"></div>
                </div>
              </Fragment>
            );
          })}

          <button
            onClick={() => handleAddPage(pages.length - 1)}
            className="btn shadow-primary border-primary-borders hover:bg-black hover:text-white hover:border-black cursor-pointer"
          >
            <BiPlus size={16} className="mr-1" />
            <span>Add page</span>
          </button>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default SortablePageNodes;
