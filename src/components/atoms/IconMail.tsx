/** Mail icon — used in the site footer contact block. */
export function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      aria-hidden
      className={className}
    >
      <rect x="0.5" y="0.5" width="15" height="12" rx="0.5" stroke="currentColor" />
      <path d="M1 1L8 7.5L15 1" stroke="currentColor" />
    </svg>
  );
}
