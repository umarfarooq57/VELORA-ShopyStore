import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Command, Keyboard } from 'lucide-react';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isShortcutsOpen, setIsShortcutsOpen } = useStore();

  if (!isShortcutsOpen) return null;

  const shortcuts = [
    { key: '?', description: 'Open / Close this keyboard shortcuts cheat sheet' },
    { key: '/ or ⌘K', description: 'Focus quick search across the catalog' },
    { key: 'C', description: 'Open Shopping Bag / Cart view' },
    { key: 'W', description: 'Open Saved Wishlist' },
    { key: 'H', description: 'Return to Home Page' },
    { key: 'S', description: 'Explore Catalog / Shop All' },
    { key: 'A', description: 'Open Store Admin & CRM Dashboard' },
    { key: 'Esc', description: 'Dismiss active dialogs, modals, and drawers' },
  ];

  return (
    <div
      id="keyboard-shortcuts-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setIsShortcutsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts"
    >
      <div
        id="keyboard-shortcuts-modal"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-stone-900 dark:text-stone-100" />
            <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100">
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            aria-label="Close shortcuts"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
          Navigate Velora effortlessly using these rapid keys anywhere outside text input fields.
        </p>

        <div className="mt-4 space-y-2">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/50 dark:border-stone-700/50"
            >
              <span className="text-sm text-stone-700 dark:text-stone-300">{sc.description}</span>
              <kbd className="px-2 py-1 text-xs font-mono font-medium rounded bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-sm text-stone-800 dark:text-stone-200">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-stone-200 dark:border-stone-800 text-center">
          <button
            onClick={() => setIsShortcutsOpen(false)}
            className="w-full py-2 text-xs uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
          >
            Got it (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
