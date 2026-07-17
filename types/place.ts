export type SourceInfo = {
  name: string;
  url: string;
  license: string;
};

export type Place = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  description: string;
  province: string;
  city: string;
  island: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  tags: string[];
  website: string | null;
  openingHours: string | null;
  osmUrl: string;
  wikidataId: string | null;
  wikipediaUrl: string | null;
  source: SourceInfo;
  coordinateAccuracy: "point" | "area-centroid" | "approximate";
  updatedAt: string;
};

export type Category = {
  id: string;
  label: string;
  icon: string;
  shortLabel: string;
  colorToken: string;
};

export type DatasetMetadata = {
  project: string;
  generatedAt: string;
  recordCount: number;
  dataSources: SourceInfo[];
  referenceUsage: {
    label: string;
    purpose: string;
    websites: SourceInfo[];
  }[];
  notes: string[];
};

export type ExplorerFilters = {
  query: string;
  categories: string[];
  province: string;
  island: string;
};
