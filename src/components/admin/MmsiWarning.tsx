"use client";

import { Banner, useField } from "@payloadcms/ui";

/** Sidebar warning shown on a Boat when its MMSI is missing or malformed —
 * without a valid 9-digit MMSI the boat can't appear on the live map. */
export default function MmsiWarning() {
  const { value } = useField<string>({ path: "mmsi" });
  const mmsi = (value ?? "").trim();
  if (/^\d{9}$/.test(mmsi)) return null;
  return (
    <Banner type="info">
      {mmsi
        ? `“${mmsi}” isn't a valid MMSI (9 digits) — this boat won't appear on the live map.`
        : "No MMSI set — this boat won't appear on the live map."}
    </Banner>
  );
}
