import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import TableOfContents from './TableOfContents';

/** Mobile drawer for the table of contents (ported from the blog). */
export default function MobileTOC() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-ink p-4 text-paper shadow-lg transition-transform duration-200 hover:scale-110 lg:hidden"
        aria-label="Open table of contents"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[60] w-3/4 max-w-sm bg-paper shadow-2xl transition-[translate,visibility] duration-300 ease-in-out lg:hidden ${
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-serif text-xl font-bold">Contents</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 text-ink-muted transition-colors hover:text-ink" aria-label="Close table of contents">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TableOfContents onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
