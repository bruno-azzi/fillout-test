import {
  BiCheckCircle,
  BiFile,
  BiInfoCircle,
  BiSolidFlag,
  BiPencil,
  BiClipboard,
  BiCopy,
  BiTrash,
} from "react-icons/bi";

import { Page } from "./types";

export const INITIAL_PAGES: Page[] = [
  { id: 1, title: "Info", icon: BiInfoCircle },
  { id: 2, title: "Details", icon: BiFile },
  { id: 3, title: "Other", icon: BiFile },
  { id: 4, title: "Ending", icon: BiCheckCircle },
];

export const CONTEXT_MENU_ITEMS = [
  {
    id: "setFirstPage",
    label: "Set as first page",
    icon: BiSolidFlag,
    iconClassName: "fill-primary-blue stroke-primary-blue",
  },
  {
    id: "rename",
    label: "Rename",
    icon: BiPencil,
    iconClassName: "fill-primary-icons",
  },
  {
    id: "copy",
    label: "Copy",
    icon: BiClipboard,
    iconClassName: "fill-primary-icons",
  },
  {
    id: "duplicate",
    label: "Duplicate",
    icon: BiCopy,
    iconClassName: "text-primary-icons",
  },
  {
    id: "delete",
    label: "Delete",
    icon: BiTrash,
    className:
      "stroke-primary-red text-primary-red mt-2 pt-3 border-t border-t-primary-borders",
  },
];
