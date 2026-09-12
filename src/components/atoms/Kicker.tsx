import { Overline } from "@/components/atoms/Overline";

export function Kicker({ label }: { label?: string | null }) {
  if (!label) return <Overline />;
  return (
    <div className="flex flex-col gap-spacing-xs">
      <Overline />
      <p className="font-gill text-label uppercase leading-label text-brand-secondary-100">
        {label}
      </p>
    </div>
  );
}
