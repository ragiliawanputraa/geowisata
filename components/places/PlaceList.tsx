"use client";

import { MapPin } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import type { Category, Place } from "@/types/place";

type PlaceListProps = {
  places: Place[];
  categories: Category[];
  favorites: string[];
  onSelect: (place: Place) => void;
  onToggleFavorite: (id: string) => void;
  onReset: () => void;
  emptyKind?: "filter" | "favorites";
};

export function PlaceList({
  places,
  categories,
  favorites,
  onSelect,
  onToggleFavorite,
  onReset,
  emptyKind = "filter",
}: PlaceListProps) {
  const categoryMap = new Map(
    categories.map((category) => [category.id, category]),
  );

  if (!places.length) {
    return (
      <div className="empty-state">
        <MapPin size={26} aria-hidden="true" />
        <h3>
          {emptyKind === "favorites"
            ? "Belum ada tempat tersimpan"
            : "Tidak ada lokasi yang cocok"}
        </h3>
        <p>
          {emptyKind === "favorites"
            ? "Simpan lokasi dari peta untuk menyusunnya di sini."
            : "Ubah kata kunci atau buka kembali semua kategori."}
        </p>
        {emptyKind === "filter" ? (
          <button type="button" className="button" onClick={onReset}>
            Tampilkan semua
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <ol className="place-list">
      {places.map((place) => {
        const category = categoryMap.get(place.category);
        return (
          <li key={place.id} className="place-row">
            <button
              type="button"
              className="place-row__main"
              onClick={() => onSelect(place)}
            >
              <span
                className={`place-row__code marker-code marker-code--${place.category}`}
                aria-hidden="true"
              >
                {category?.shortLabel}
              </span>
              <span className="place-row__copy">
                <strong>{place.name}</strong>
                <span>
                  {place.city} · {place.province}
                </span>
              </span>
            </button>
            <FavoriteButton
              active={favorites.includes(place.id)}
              placeName={place.name}
              onToggle={() => onToggleFavorite(place.id)}
              compact
            />
          </li>
        );
      })}
    </ol>
  );
}
