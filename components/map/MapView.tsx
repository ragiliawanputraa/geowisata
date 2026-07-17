"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { INDONESIA_CENTER, INDONESIA_ZOOM } from "@/lib/constants";
import type { Category, Place } from "@/types/place";

type MapViewProps = {
  places: Place[];
  categories: Category[];
  selectedPlace: Place | null;
  resetSignal: number;
  onSelect: (place: Place) => void;
  onClear: () => void;
};

function MapController({
  selectedPlace,
  resetSignal,
  onClear,
  placesCount,
}: Pick<MapViewProps, "selectedPlace" | "resetSignal" | "onClear"> & {
  placesCount: number;
}) {
  const map = useMapEvents({ click: onClear });

  useEffect(() => {
    if (selectedPlace) {
      map.flyTo(
        [selectedPlace.latitude, selectedPlace.longitude],
        Math.max(map.getZoom(), 11),
        { duration: 0.55 },
      );
    }
  }, [map, selectedPlace]);

  useEffect(() => {
    if (resetSignal) {
      map.flyTo(INDONESIA_CENTER, INDONESIA_ZOOM, { duration: 0.55 });
    }
  }, [map, resetSignal]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => map.invalidateSize());
    return () => cancelAnimationFrame(frame);
  }, [map, placesCount, selectedPlace]);

  return null;
}

export default function MapView({
  places,
  categories,
  selectedPlace,
  resetSignal,
  onSelect,
  onClear,
}: MapViewProps) {
  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  return (
    <MapContainer
      center={INDONESIA_CENTER}
      zoom={INDONESIA_ZOOM}
      minZoom={4}
      maxZoom={18}
      zoomControl={false}
      className="map-canvas"
      attributionControl
      preferCanvas
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {places.map((place) => {
        const category = categoryMap.get(place.category);
        const active = selectedPlace?.id === place.id;
        const icon = L.divIcon({
          className: "place-marker-shell",
          html: `<span class="place-marker place-marker--${place.category}${active ? " is-active" : ""}"><span>${category?.shortLabel ?? "•"}</span></span>`,
          iconSize: [active ? 38 : 32, active ? 38 : 32],
          iconAnchor: [active ? 19 : 16, active ? 19 : 16],
          tooltipAnchor: [0, -18],
        });

        return (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={icon}
            eventHandlers={{ click: () => onSelect(place) }}
            keyboard
            title={`${place.name} — ${place.categoryLabel}`}
          >
            <Tooltip direction="top" opacity={1}>
              <strong>{place.name}</strong>
              <span>{place.categoryLabel}</span>
            </Tooltip>
          </Marker>
        );
      })}
      <MapController
        selectedPlace={selectedPlace}
        resetSignal={resetSignal}
        onClear={onClear}
        placesCount={places.length}
      />
    </MapContainer>
  );
}
