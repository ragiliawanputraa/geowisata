"use client";

import {
  CircleDot,
  Columns3,
  Droplets,
  House,
  Landmark,
  Leaf,
  Mountain,
  Palmtree,
  RotateCcw,
  Trees,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category, ExplorerFilters } from "@/types/place";

const categoryIcons: Record<string, LucideIcon> = {
  Waves,
  Mountain,
  CircleDot,
  Droplets,
  Trees,
  Landmark,
  Columns3,
  Palmtree,
  House,
  Leaf,
};

type FiltersPanelProps = {
  idPrefix: string;
  filters: ExplorerFilters;
  categories: Category[];
  provinces: string[];
  islands: string[];
  resultCount: number;
  onChange: (filters: ExplorerFilters) => void;
  onReset: () => void;
};

export function FiltersPanel({
  idPrefix,
  filters,
  categories,
  provinces,
  islands,
  resultCount,
  onChange,
  onReset,
}: FiltersPanelProps) {
  const toggleCategory = (id: string) => {
    const categories = filters.categories.includes(id)
      ? filters.categories.filter((category) => category !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories });
  };

  return (
    <section className="filters-panel" aria-label="Filter lokasi wisata">
      <div className="panel-heading">
        <div>
          <h2>Saring atlas</h2>
          <p>{resultCount} lokasi aktif</p>
        </div>
        <button type="button" className="text-button" onClick={onReset}>
          <RotateCcw size={15} aria-hidden="true" />
          Reset
        </button>
      </div>

      <fieldset className="category-filter">
        <legend>Kategori</legend>
        <div className="category-filter__grid">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon] ?? Leaf;
            const checked = filters.categories.includes(category.id);
            return (
              <label
                key={category.id}
                className={`category-option category-option--${category.id}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category.id)}
                />
                <span className="category-option__mark">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span>{category.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="select-filter">
        <label htmlFor={`${idPrefix}-province`}>Provinsi</label>
        <select
          id={`${idPrefix}-province`}
          value={filters.province}
          onChange={(event) =>
            onChange({ ...filters, province: event.target.value })
          }
        >
          <option value="">Semua provinsi</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div className="select-filter">
        <label htmlFor={`${idPrefix}-island`}>Gugus pulau</label>
        <select
          id={`${idPrefix}-island`}
          value={filters.island}
          onChange={(event) =>
            onChange({ ...filters, island: event.target.value })
          }
        >
          <option value="">Semua pulau</option>
          {islands.map((island) => (
            <option key={island} value={island}>
              {island}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
