import type {
  Category,
  DatasetMetadata,
  Place,
  SourceInfo,
} from "@/types/place";

type LoadedData = {
  places: Place[];
  categories: Category[];
  invalidCount: number;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isSource = (value: unknown): value is SourceInfo =>
  isObject(value) &&
  typeof value.name === "string" &&
  Boolean(value.name) &&
  typeof value.url === "string" &&
  typeof value.license === "string";

function isPlace(
  value: unknown,
  categoryIds: Set<string>,
  seenIds: Set<string>,
): value is Place {
  if (!isObject(value)) return false;

  const valid =
    typeof value.id === "string" &&
    Boolean(value.id) &&
    !seenIds.has(value.id) &&
    typeof value.name === "string" &&
    Boolean(value.name) &&
    typeof value.category === "string" &&
    categoryIds.has(value.category) &&
    typeof value.province === "string" &&
    Boolean(value.province) &&
    typeof value.latitude === "number" &&
    value.latitude >= -90 &&
    value.latitude <= 90 &&
    typeof value.longitude === "number" &&
    value.longitude >= -180 &&
    value.longitude <= 180 &&
    isSource(value.source);

  if (valid) seenIds.add(value.id as string);
  return valid;
}

export async function loadExplorerData(): Promise<LoadedData> {
  const [placesResponse, categoriesResponse] = await Promise.all([
    fetch("/data/places.json"),
    fetch("/data/categories.json"),
  ]);

  if (!placesResponse.ok || !categoriesResponse.ok) {
    throw new Error("File data wisata tidak dapat dimuat.");
  }

  const [rawPlaces, rawCategories] = (await Promise.all([
    placesResponse.json(),
    categoriesResponse.json(),
  ])) as [unknown, unknown];

  if (!Array.isArray(rawPlaces) || !Array.isArray(rawCategories)) {
    throw new Error("Format file data wisata tidak valid.");
  }

  const categories = rawCategories.filter(
    (category): category is Category =>
      isObject(category) &&
      typeof category.id === "string" &&
      typeof category.label === "string" &&
      typeof category.icon === "string" &&
      typeof category.shortLabel === "string" &&
      typeof category.colorToken === "string",
  );

  const categoryIds = new Set(categories.map((category) => category.id));
  const seenIds = new Set<string>();
  const places = rawPlaces.filter((place) =>
    isPlace(place, categoryIds, seenIds),
  );
  const invalidCount = rawPlaces.length - places.length;

  if (invalidCount && process.env.NODE_ENV === "development") {
    console.warn(`[GeoWisata] ${invalidCount} record invalid tidak dirender.`);
  }

  return { places, categories, invalidCount };
}

export async function loadDatasetMetadata(): Promise<DatasetMetadata> {
  const response = await fetch("/data/dataset-metadata.json");
  if (!response.ok) throw new Error("Metadata dataset tidak dapat dimuat.");
  return response.json() as Promise<DatasetMetadata>;
}
