const FAVORITES_KEY = "geowisata.favoritePlaceIds";

export function readFavorites() {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
    const ids = Array.isArray(value)
      ? value
      : typeof value === "object" &&
          value !== null &&
          "favoritePlaceIds" in value
        ? value.favoritePlaceIds
        : [];
    return Array.isArray(ids)
      ? ids.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function writeFavorites(ids: string[]) {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify({ favoritePlaceIds: ids }),
  );
}
