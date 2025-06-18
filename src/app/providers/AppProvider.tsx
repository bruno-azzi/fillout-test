"use client";

import {
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

import { INITIAL_PAGES } from "../constants";
import { Page } from "../types";

export const AppContext = createContext<AppProviderProps>({
  pages: INITIAL_PAGES,
  activePageId: 1,
  setPages: () => {},
  setActivePageId: () => {},
  deletePage: () => {},
  handleAddPage: () => {},
});

type AppProviderProps = {
  pages: Page[];
  activePageId: number;
  setPages: Dispatch<SetStateAction<Page[]>>;
  setActivePageId: Dispatch<SetStateAction<number>>;
  deletePage: (pageId: number) => void;
  handleAddPage: (pageId: number) => void;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState(1);

  const handleAddPage = (index: number) => {
    const newPage = {
      id: Date.now(),
      title: "Untitled",
    };
    const newPages = [...pages];
    newPages.splice(index + 1, 0, newPage);
    setPages(newPages);
    setActivePageId(newPage.id);
  };

  const deletePage = (pageId: number) => {
    setPages(pages.filter((currPage) => currPage.id !== pageId));
    setActivePageId(pages[pages.length - 1].id);
  };

  return (
    <AppContext.Provider
      value={{
        pages,
        setPages,
        activePageId,
        setActivePageId,
        handleAddPage,
        deletePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppProvider = (): AppProviderProps => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppProvider must be used within an AppProvider");
  }

  return context;
};
