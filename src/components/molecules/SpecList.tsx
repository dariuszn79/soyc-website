import type { SpecItem } from "@/data/fleet";

/**
 * SpecList — a vertical list of label/value spec pairs used inside CardBoat.
 */

export function SpecList({ items }: { items: SpecItem[] }) {
  return (
    <dl className="flex min-w-0 flex-col gap-spacing-xs">
      {items.map(({ label, value }) => (
        <div
          key={label + value}
          className="flex min-w-0 flex-wrap gap-x-spacing-xxs font-gill text-[16px] leading-body sm:text-[18px]"
        >
          <dt className="shrink-0 text-brand-secondary-100">{label}</dt>
          <dd className="min-w-0 text-[#333444]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
