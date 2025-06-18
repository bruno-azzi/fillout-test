"use client";

import { useState } from "react";
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

import { INITIAL_PAGES } from "./constants";
import SortableItem from "./components/SortableItem";

export default function Home() {
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState(1);
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
    <div className="flex flex-col justify-end h-full">
      <div className="p-6 border rounded-lg bg-white shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {pages.find((p) => p.id === activePageId)?.title}
        </h2>
        <p className="text-gray-600">
          Content for {pages.find((p) => p.id === activePageId)?.title} page.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
          <div className="flex flex-wrap gap-y-2 relative">
        <SortableContext items={pages} strategy={rectSortingStrategy}>
            {pages.map((page, index) => {
              return (
                <SortableItem
                  key={page.id}
                  page={page}
                  index={index}
                  active={activePageId === page.id}
                  onClick={setActivePageId}
                  setHoverIndex={setHoverIndex}
                  handleAddPage={handleAddPage}
                  showPlusBtn={hoverIndex === index && index < pages.length - 1}
                />
              );
            })}

            <button
              onClick={() => handleAddPage(pages.length - 1)}
              className="btn shadow-primary border-primary-borders hover:bg-primary-light-gray-hover cursor-pointer"
            >
              <BiPlus size={16} className="mr-1" />
              <span>Add page</span>
            </button>
        </SortableContext>
          </div>
      </DndContext>
    </div>
  );
}
