import type { ReactNode } from "react";

/**
 * Admin-wide style tweaks, injected as a dashboard provider
 * (payload.config → admin.components.providers).
 */
export default function AdminStyles({ children }: { children?: ReactNode }) {
  return (
    <>
      <style>{`
        .nav .nav__link-label { font-weight: 600; }
      `}</style>
      {children}
    </>
  );
}
