import type { ExplorerFilters, Place } from "../types/place.ts";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("id-ID")
    .trim();

export function filterPlaces(places: Place[], filters: ExplorerFilters) {
  const query = normalize(filters.query);
  const activeCategories = new Set(filters.categories);

  return places.filter((place) => {
    const haystack = normalize(
      [
        place.name,
        place.province,
        place.city,
        place.island,
        place.categoryLabel,
        ...place.tags,
      ].join(" "),
    );

    return (
      (!query || haystack.includes(query)) &&
      (!activeCategories.size || activeCategories.has(place.category)) &&
      (!filters.province || place.province === filters.province) &&
      (!filters.island || place.island === filters.island)
    );
  });
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "id"));
}
