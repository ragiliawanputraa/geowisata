"use client";

import dynamic from "next/dynamic";
import type { Category, Place } from "@/types/place";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="map-loading" role="status">
      <span className="map-loading__pulse" />
      <span>Menyiapkan peta Indonesia…</span>
    </div>
  ),
});

type DynamicMapProps = {
  places: Place[];
  categories: Category[];
  selectedPlace: Place | null;
  resetSignal: number;
  onSelect: (place: Place) => void;
  onClear: () => void;
};

export function DynamicMap(props: DynamicMapProps) {
  return <MapView {...props} />;
}
