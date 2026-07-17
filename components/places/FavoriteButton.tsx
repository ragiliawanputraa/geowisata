"use client";

import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  active: boolean;
  placeName: string;
  onToggle: () => void;
  compact?: boolean;
};

export function FavoriteButton({
  active,
  placeName,
  onToggle,
  compact = false,
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      className={`favorite-button${active ? " is-active" : ""}${compact ? " is-compact" : ""}`}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={
        active
          ? `Hapus ${placeName} dari favorit`
          : `Simpan ${placeName} ke favorit`
      }
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} aria-hidden />
      {!compact ? <span>{active ? "Tersimpan" : "Simpan"}</span> : null}
    </button>
  );
}
