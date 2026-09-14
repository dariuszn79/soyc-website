"use client";

import { Banner } from "@payloadcms/ui";
import { useEffect, useState } from "react";

/** Warning shown on the Fleet Location section block — the section is hidden
 * on the site until at least one Boat has a valid MMSI. */
export default function FleetMapPrereqWarning() {
  const [tracked, setTracked] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/boats?limit=200&depth=0")
      .then((r) => r.json())
      .then((d) =>
        setTracked(
          (d.docs ?? []).some((b: { mmsi?: string }) =>
            /^\d{9}$/.test((b.mmsi ?? "").trim()),
          ),
        ),
      )
      .catch(() => setTracked(null));
  }, []);

  if (tracked !== false) return null;
  return (
    <Banner type="info">
      No boat has a valid MMSI — this section is hidden on the site. Add a
      9-digit MMSI to a Boat to show it.
    </Banner>
  );
}
