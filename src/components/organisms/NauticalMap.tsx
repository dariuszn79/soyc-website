/**
 * NauticalMap — the decorative nautical chart graphic section on the home page.
 *
 * Figma: aria-hidden decorative section with rotated nautical lines background
 * and depth label numbers (screen-reader hidden).
 */

const depthLabels = [
  "19","4","19","4","19","4","19","4","19","4","10","2","10","2","19","4","19","4",
  "29","8","18","3","18","3","18","3","19","5","17","1","17","1","17","1","17","8",
  "17","8","20","8","20","8","11","8","22","5","22","5","17","5","16","3","16","3",
  "15","6","15","6","15","6","16","7","18","7","19","7","17","4","15","4","17","2",
  "14","4","14","4","14","4","14","4","15","7","15","7","10","2","22","5","19","4",
  "19","4","14","4",
];

export function NauticalMap() {
  return (
    <section aria-hidden="true" className="relative w-full overflow-hidden opacity-30">
      <div className="relative h-[calc(100vw*0.512)] min-h-[540px] w-full rotate-180">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute left-[18.26%] top-[23.78%] h-full w-full -rotate-180 object-cover"
          alt=""
          src="/figmaAssets/lines-1-.png"
        />
        <div className="sr-only">
          {depthLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
