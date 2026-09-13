"use client";

import { useEffect, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";

export interface TrackedVessel {
  mmsi: string;
  name: string;
}

interface LivePosition {
  mmsi: string;
  lat: number;
  lon: number;
  cog?: number;
  /** Speed over ground, knots. */
  sog?: number;
  shipName?: string;
  updatedAt: number;
}

/** Marker colours cycle through the brand palette (primary red, secondary blue, ink). */
const VESSEL_COLOURS = ["#e41e28", "#262ebc", "#1e1e1e", "#2e7d4f", "#b4690e"];
const SOLENT_CENTER: [number, number] = [-1.3, 50.83];
const POLL_MS = 10_000;

/**
 * Live vessel map — Mapbox GL + markers fed by /api/vessel-positions
 * (aisstream.io). Loaded client-side only (see CardFleetLiveMapLazy's dynamic import);
 * `className` controls the outer wrapper's sizing/positioning per context.
 */
export default function CardFleetLiveMap({
  vessels,
  mapboxToken,
  className = "",
}: {
  vessels: TrackedVessel[];
  mapboxToken: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapboxglRef = useRef<typeof mapboxgl | null>(null);
  const markersRef = useRef(new Map<string, mapboxgl.Marker>());
  const hasFitRef = useRef(false);
  const [positions, setPositions] = useState<Record<string, LivePosition>>({});
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let map: mapboxgl.Map | null = null;
    // Lazy-import mapbox-gl so it never enters the server bundle.
    import("mapbox-gl")
      .then((mod) => {
        if (cancelled || !containerRef.current) return;
        const mb = mod.default;
        mapboxglRef.current = mb;
        try {
          map = new mb.Map({
            container: containerRef.current,
            accessToken: mapboxToken,
            style: "mapbox://styles/mapbox/light-v11",
            center: SOLENT_CENTER,
            zoom: 10,
            attributionControl: false,
          });
        } catch (err) {
          console.error("mapbox Map constructor failed", err);
          setMapError(err instanceof Error ? err.message : "Map failed to initialise");
          return;
        }
        map.addControl(new mb.AttributionControl({ compact: true }), "bottom-right");
        map.addControl(new mb.NavigationControl({ showCompass: false }), "top-right");
        map.on("load", () => console.log("mapbox map loaded"));
        map.on("error", (e) => {
          console.error("Mapbox error", e?.error ?? e);
          const err = e?.error as (Error & { status?: number }) | undefined;
          setMapError(
            err?.message || (err?.status ? `Request failed (${err.status})` : "Map failed to load"),
          );
        });
        mapRef.current = map;
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("mapbox-gl import failed", err);
        setMapError(err?.message ?? "Mapbox failed to load");
      });
    return () => {
      cancelled = true;
      map?.remove();
      map = null;
      mapRef.current = null;
    };
  }, [mapboxToken]);

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch("/api/vessel-positions", { cache: "no-store" });
        if (!res.ok) return;
        const { vessels: live } = (await res.json()) as { vessels: LivePosition[] };
        setPositions(Object.fromEntries(live.map((p) => [p.mmsi, p])));
      } catch {
        // transient fetch failure — keep last known positions
      }
    };
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const mb = mapboxglRef.current;
    if (!map || !mb) return;
    for (const [i, vessel] of vessels.entries()) {
      const pos = positions[vessel.mmsi];
      if (!pos) continue;
      const colour = VESSEL_COLOURS[i % VESSEL_COLOURS.length];
      let marker = markersRef.current.get(vessel.mmsi);
      if (!marker) {
        const el = document.createElement("div");
        el.style.cssText = "width:20px;height:20px";
        marker = new mb.Marker(el).setLngLat([pos.lon, pos.lat]).addTo(map);
        markersRef.current.set(vessel.mmsi, marker);
      } else {
        marker.setLngLat([pos.lon, pos.lat]);
      }

      // Directional arrow when the vessel reports a valid course; dot when
      // moored (COG 360 = "not available" in AIS).
      const hasHeading = pos.cog != null && pos.cog < 360;
      marker.getElement().innerHTML = hasHeading
        ? `<div style="width:0;height:0;margin:1px auto;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:18px solid ${colour};transform:rotate(${pos.cog}deg);transform-origin:50% 70%;filter:drop-shadow(0 1px 2px rgba(0,0,0,.45))"></div>`
        : `<div style="width:14px;height:14px;margin:3px;border-radius:50%;background:${colour};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>`;
    }
    if (!hasFitRef.current) {
      const live = vessels.map((v) => positions[v.mmsi]).filter(Boolean);
      if (live.length === 1) {
        map.easeTo({ center: [live[0].lon, live[0].lat], zoom: 12 });
        hasFitRef.current = true;
      } else if (live.length > 1) {
        const bounds = live.reduce(
          (b, p) => b.extend([p.lon, p.lat]),
          new mb.LngLatBounds([live[0].lon, live[0].lat], [live[0].lon, live[0].lat]),
        );
        map.fitBounds(bounds, { padding: 80, maxZoom: 13 });
        hasFitRef.current = true;
      }
    }
  }, [positions, vessels]);

  return (
    <div className={`${className} flex flex-col`}>
      <div className="relative min-h-0 flex-1">
        {/* mapbox-gl adds .mapboxgl-map (position:relative) which overrides
            Tailwind's .absolute, so size with h-full w-full instead. */}
        <div ref={containerRef} className="h-full w-full" />
 <div className="absolute bottom-[6.4%] left-[3.3%] flex flex-col gap-[10px]">
          {vessels.map((vessel, i) => {
            const pos = positions[vessel.mmsi];
            const hasHeading = pos?.cog != null && pos.cog < 360;
            return (
            <div
              key={vessel.mmsi}
              className="flex h-[25px] items-center gap-xs rounded-full border bg-brand-tertiary-100 px-[6px] transition-opacity"
              style={{
                borderColor: VESSEL_COLOURS[i % VESSEL_COLOURS.length],
                color: VESSEL_COLOURS[i % VESSEL_COLOURS.length],
                opacity: positions[vessel.mmsi] ? 1 : 1,
              }}
              title={positions[vessel.mmsi] ? undefined : "Awaiting first AIS position report"}
            >
              <div
                className="h-4 w-4 shrink-0 rounded-full"
                style={{ background: VESSEL_COLOURS[i % VESSEL_COLOURS.length] }}
              />
              <div className="w-[105px] text-center font-button text-button leading-button">
                {vessel.name+':'}
              </div>
              {pos ? (
                <div className="flex-1 text-right text-[10px] leading-[14px]">
                  {pos.lat.toFixed(4)}°, {pos.lon.toFixed(4)}° · SOG{" "}
                  {pos.sog != null ? `${pos.sog.toFixed(1)} kn` : "–"} · COG{" "}
                  {hasHeading ? `${Math.round(pos.cog!)}°` : "–"} · updated{" "}
                  {Math.max(0, Math.round((Date.now() - pos.updatedAt) / 1000))}s ago
                </div>
              ) : (
                <div className="opacity-60">Awaiting AIS position report…</div>
              )}
            </div>
            );
          })}
        </div>
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-tertiary-100/90 p-spacing-md">
            <p className="font-gill text-body-sm leading-body-sm text-brand-ink">
              Map unavailable: {mapError}
            </p>
          </div>
        )}

       
      </div>
    </div>
  );
}
