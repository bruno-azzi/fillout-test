"use client";

import Link from "next/link";

import SortablePageNodes from "./components/SortablePageNodes";
import { useAppProvider } from "./providers/AppProvider";

export default function Home() {
  const { pages, activePageId, setPages, setActivePageId } = useAppProvider();

  return (
    <div className="flex flex-col justify-start sm:justify-center h-full">
      <div className="p-6 border border-primary-borders rounded-lg bg-white shadow-primary mb-6 h-60 sm:h-96 text-primary-text">
        <h2 className="text-xl font-semibold mb-2">
          {pages.find((p) => p.id === activePageId)?.title}
        </h2>

        <p>
          Content for &quot;{pages.find((p) => p.id === activePageId)?.title}&quot; page.
        </p>
        <p>
          Made by Bruno Azzi.
          <br />
          <Link
            href="https://www.linkedin.com/in/brunoazzi/"
            target="_blank"
            className="text-primary-blue"
          >
            Linkedin
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="https://github.com/bruno-azzi/fillout-test"
            target="_blank"
            className="text-primary-blue"
          >
            Github
          </Link>
        </p>
      </div>

      <SortablePageNodes
        activePageId={activePageId}
        pages={pages}
        setActivePageId={setActivePageId}
        setPages={setPages}
      />
    </div>
  );
}
