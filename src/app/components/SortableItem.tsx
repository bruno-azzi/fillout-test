import { Dispatch, SetStateAction } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Page } from "../types";
import PageButton from "./PageButton";

type Props = {
  page: Page;
  active: boolean;
  onClick: Dispatch<SetStateAction<number>>;
};

const PageNode: React.FC<Props> = ({ page, active, onClick }) => {
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
      className="flex rounded-lg"
    >
      <PageButton {...page} active={active} onClick={onClick} />
    </div>
  );
};

export default PageNode;
