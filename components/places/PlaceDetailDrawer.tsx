"use client";

import {
  ArrowUpRight,
  ExternalLink,
  MapPinned,
  X,
} from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import type { Category, Place } from "@/types/place";

type PlaceDetailDrawerProps = {
  place: Place;
  category: Category | undefined;
  favorite: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
};

export function PlaceDetailDrawer({
  place,
  category,
  favorite,
  onToggleFavorite,
  onClose,
}: PlaceDetailDrawerProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;

  return (
    <article className="place-detail" aria-labelledby="place-detail-title">
      <div className="place-detail__handle" aria-hidden="true" />
      <header className="place-detail__header">
        <span
          className={`category-chip category-chip--${place.category}`}
        >
          <span aria-hidden="true">{category?.shortLabel}</span>
          {place.categoryLabel}
        </span>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Tutup detail lokasi"
        >
          <X size={19} aria-hidden="true" />
        </button>
      </header>

      <div className="place-detail__title">
        <h2 id="place-detail-title">{place.name}</h2>
        <p>
          {place.city}
          <br />
          {place.province} · {place.island}
        </p>
      </div>

      <p className="place-detail__description">{place.description}</p>

      <dl className="coordinate-strip">
        <div>
          <dt>Lintang</dt>
          <dd>{place.latitude.toFixed(5)}</dd>
        </div>
        <div>
          <dt>Bujur</dt>
          <dd>{place.longitude.toFixed(5)}</dd>
        </div>
        <div>
          <dt>Akurasi</dt>
          <dd>{place.coordinateAccuracy.replace("-", " ")}</dd>
        </div>
      </dl>

      <div className="tag-list" aria-label="Tag lokasi">
        {place.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <FavoriteButton
        active={favorite}
        placeName={place.name}
        onToggle={onToggleFavorite}
      />

      <div className="external-links">
        <a href={place.osmUrl} target="_blank" rel="noreferrer">
          <MapPinned size={17} aria-hidden="true" />
          OpenStreetMap
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <a href={googleMapsUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={17} aria-hidden="true" />
          Google Maps
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        {place.website ? (
          <a href={place.website} target="_blank" rel="noreferrer">
            <ExternalLink size={17} aria-hidden="true" />
            Situs resmi
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <footer className="source-note">
        <span>Sumber record</span>
        <a href={place.source.url} target="_blank" rel="noreferrer">
          {place.source.name}
        </a>
        <span>{place.source.license}</span>
        <span>Diperbarui {place.updatedAt}</span>
      </footer>
    </article>
  );
}
