import { BiCheckCircle, BiFile, BiInfoCircle } from "react-icons/bi";

import { Page } from "./types";
import { FiFlag, FiTrash2 } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { GoPaste } from "react-icons/go";
import { RxCopy } from "react-icons/rx";

export const INITIAL_PAGES: Page[] = [
  { id: 1, title: "Info", icon: BiInfoCircle },
  { id: 2, title: "Details", icon: BiFile },
  { id: 3, title: "Other", icon: BiFile },
  { id: 4, title: "Ending", icon: BiCheckCircle },
];

export const CONTEXT_MENU_ITEMS = [
  {
    label: "Set as first page",
    icon: FiFlag,
    iconClassName: "fill-primary-blue stroke-primary-blue",
  },
  {
    label: "Rename",
    icon: LuPencilLine,
    iconClassName: "stroke-primary-icons",
  },
  {
    label: "Copy",
    icon: GoPaste,
    iconClassName: "fill-primary-icons",
  },
  {
    label: "Duplicate",
    icon: RxCopy,
    iconClassName: "rotate-z-90 text-primary-icons",
  },
  {
    label: "Delete",
    icon: FiTrash2,
    className:
      "stroke-primary-red text-primary-red mt-2 pt-3 border-t border-t-primary-borders",
  },
];
