"use client";

import {
  useState,
  useEffect,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

import { INITIAL_PAGES } from "../constants";
import { Page } from "../types";

const defaultData = { pages: INITIAL_PAGES, activePageId: 1 };

export const AppContext = createContext<AppProviderProps>({
  pages: defaultData.pages,
  activePageId: defaultData.activePageId,
  setPages: () => {},
  setActivePageId: () => {},
  deletePage: () => {},
  handleAddPage: () => {},
  loading: true,
});

type AppProviderProps = {
  pages: Page[];
  activePageId: number;
  setPages: Dispatch<SetStateAction<Page[]>>;
  setActivePageId: Dispatch<SetStateAction<number>>;
  deletePage: (pageId: number) => void;
  handleAddPage: (index: number) => void;
  loading: boolean;
};

const LOCAL_STORAGE_KEY = "appState";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = useState<Page[]>(defaultData.pages);
  const [activePageId, setActivePageId] = useState<number>(
    defaultData.activePageId
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppState = (): { pages: Page[]; activePageId: number } => {
      if (typeof window === "undefined") {
        setLoading(false);
        return defaultData;
      }

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return defaultData;
        } finally {
          setLoading(false);
        }
      }

      setLoading(false);
      return { pages: INITIAL_PAGES, activePageId: 1 };
    };

    const storedData = getAppState();

    setPages(storedData.pages);
    setActivePageId(storedData.activePageId);
  }, []);

  useEffect(() => {
    const state = { pages, activePageId };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [pages, activePageId]);

  const handleAddPage = (index: number) => {
    const newPage = {
      id: Date.now(),
      title: `Page #${pages.length + 1}`,
    };
    const newPages = [...pages];
    newPages.splice(index + 1, 0, newPage);
    setPages(newPages);
    setActivePageId(newPage.id);
  };

  const deletePage = (pageId: number) => {
    const newPages = pages.filter((currPage) => currPage.id !== pageId);
    setPages(newPages);

    if (newPages.length > 0) {
      setActivePageId(newPages[newPages.length - 1].id);
    } else {
      setActivePageId(0);
    }
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
        loading,
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
