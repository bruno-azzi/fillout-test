import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiDotsVertical, BiFile } from "react-icons/bi";
import { IconType } from "react-icons";

import ContextMenu from "./ContextMenu/ContextMenu";

type Props = {
  id: number;
  title: string;
  active: boolean;
  onClick: Dispatch<SetStateAction<number>>;
  icon?: IconType;
};

const PageButton: React.FC<Props> = ({
  id,
  title,
  active,
  onClick,
  icon: Icon = BiFile,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        tabIndex={id}
        onClick={() => onClick(id)}
        className={`btn fade-in text-primary-dark-gray hover:bg-primary-light-gray-hover ${
          active
            ? "bg-white border-primary-borders shadow-primary"
            : "bg-primary-light-gray border-transparent"
        }`}
      >
        <Icon
          size={20}
          className={`${active ? "text-primary-yellow" : ""} mr-2`}
        />
        <span
          className={`${
            active ? "text-primary-text" : ""
          } leading-5 select-none`}
        >
          {title}
        </span>

        <button
          ref={buttonRef}
          className={`${active ? "block" : "hidden"} ml-2 cursor-pointer`}
          onClick={() => setOpen((opened) => !opened)}
        >
          <BiDotsVertical size={16} />
        </button>
      </div>

      {open && <ContextMenu />}
    </div>
  );
};

export default PageButton;
