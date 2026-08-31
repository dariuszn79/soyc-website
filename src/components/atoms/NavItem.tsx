import Link from "next/link";

type NavItemProps = {
  href: string;
  label: string;
  isActive?: boolean;
  mobile?: boolean;
  onClick?: () => void;
};

/**
 * NavItem — the shared primary-navigation link.
 *
 * It follows the tab interaction used by TabsCourses: inactive links reserve
 * the underline space with a transparent border, while the active link uses
 * the brand red for both its text and bottom rule.
 */
export function NavItem({
  href,
  label,
  isActive = false,
  mobile = false,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={[
        "border-b-2 pb-3 font-gill text-button leading-button tracking-button transition-colors",
        isActive
          ? "border-brand-primary-100 text-brand-primary-100"
          : "border-transparent text-brand-secondary-100 hover:text-brand-primary-100",
        mobile
          ? "block w-full py-spacing-xs text-left"
          : "flex h-12 min-h-12 items-center justify-center px-spacing-md py-spacing-xs whitespace-nowrap",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}