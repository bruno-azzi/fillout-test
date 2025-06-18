import { Dispatch, SetStateAction } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiPlus } from "react-icons/bi";

import { Page } from "../types";
import PageButton from "./PageButton";

type Props = {
  page: Page;
  index: number;
  active: boolean;
  showPlusBtn: boolean;
  onClick: Dispatch<SetStateAction<number>>;
  setHoverIndex: Dispatch<SetStateAction<number | null>>;
  handleAddPage: (index: number) => void;
};

const SortableItem: React.FC<Props> = ({
  page,
  index,
  active,
  onClick,
  setHoverIndex,
  handleAddPage,
  showPlusBtn,
}) => {
  const { listeners, attributes, setNodeRef, transform, transition } =
    useSortable({
      id: page.id,
    });

  const sortableCoordinates = {
    x: transform?.x || 0,
    y: transform?.y || 0,
    scaleX: 1,
    scaleY: 1,
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(sortableCoordinates),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      {...listeners}
      {...attributes}
      className="flex"
    >
      <PageButton {...page} active={active} onClick={onClick} />

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
              className="w-4 h-4 bg-white border border-primary-borders shadow-primary rounded-full flex items-center justify-center cursor-pointer fade-in focus:animate-pulse"
            >
              <BiPlus size={16} />
            </button>
          </div>
        )}
        <div className="w-full h-1 dashed"></div>
      </div>
    </div>
  );
};

export default SortableItem;
