"use client";

import { Search, X } from "lucide-react";

type SearchBoxProps = {
  id: string;
  value: string;
  resultCount: number;
  onChange: (value: string) => void;
};

export function SearchBox({
  id,
  value,
  resultCount,
  onChange,
}: SearchBoxProps) {
  return (
    <div className="search-box">
      <label htmlFor={id}>Cari tempat atau wilayah</label>
      <div className="search-box__field">
        <Search aria-hidden="true" size={18} />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Bromo, Bali, museum…"
          autoComplete="off"
        />
        {value ? (
          <button
            type="button"
            className="icon-button icon-button--compact"
            onClick={() => onChange("")}
            aria-label="Hapus pencarian"
          >
            <X size={17} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <span className="sr-only" aria-live="polite">
        {resultCount} lokasi ditemukan
      </span>
    </div>
  );
}
