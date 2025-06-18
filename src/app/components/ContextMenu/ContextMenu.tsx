import { useEffect, useRef, useState } from "react";

import MenuItem from "./MenuItem";
import { CONTEXT_MENU_ITEMS } from "@/app/constants";

const ContextMenu: React.FC = () => {
  const [, setOpen] = useState(false);
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
    <div
      ref={menuRef}
      className="absolute slide-in left-0 bottom-10 w-60 rounded-xl shadow-primary bg-white border border-primary-borders"
    >
      <strong className="font-secondary font-medium border-b border-primary-borders block px-3 pt-2 mb-1 pb-1 leading-6">
        Settings
      </strong>

      <div className="flex flex-col text-sm px-3 pb-2">
        {CONTEXT_MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            iconClassName={item.iconClassName}
            className={item.className}
          />
        ))}
      </div>
    </div>
  );
};

export default ContextMenu;
