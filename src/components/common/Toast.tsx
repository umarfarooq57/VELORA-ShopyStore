import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <aside
      id="toast-container"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border border-stone-200/80 bg-white/95 dark:bg-stone-900/95 dark:border-stone-800 shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-stone-700 dark:text-stone-300" />}
          </div>
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {toast.title}
              </h4>
            )}
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
            className="shrink-0 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </aside>
  );
};
