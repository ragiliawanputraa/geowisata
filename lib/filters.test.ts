import assert from "node:assert/strict";
import test from "node:test";
import { filterPlaces, uniqueSorted } from "./filters.ts";
import type { Place } from "../types/place.ts";

const basePlace: Place = {
  id: "bromo",
  name: "Gunung Bromo",
  slug: "gunung-bromo",
  category: "mountain",
  categoryLabel: "Gunung",
  description: "Kaldera vulkanik di Jawa Timur.",
  province: "Jawa Timur",
  city: "Kabupaten Probolinggo",
  island: "Jawa",
  latitude: -7.943,
  longitude: 112.954,
  imageUrl: null,
  tags: ["kaldera", "vulkanik"],
  website: null,
  openingHours: null,
  osmUrl: "https://www.openstreetmap.org",
  wikidataId: "Q679590",
  wikipediaUrl: null,
  source: {
    name: "OpenStreetMap",
    url: "https://www.openstreetmap.org",
    license: "ODbL 1.0",
  },
  coordinateAccuracy: "point",
  updatedAt: "2026-07-17",
};

const places = [
  basePlace,
  {
    ...basePlace,
    id: "toba",
    name: "Danau Toba",
    category: "lake",
    categoryLabel: "Danau",
    province: "Sumatera Utara",
    city: "Kabupaten Toba",
    island: "Sumatera",
    tags: ["danau", "kaldera"],
  },
];

test("filterPlaces combines query, category, and island", () => {
  assert.deepEqual(
    filterPlaces(places, {
      query: "kaldera",
      categories: ["mountain"],
      province: "",
      island: "Jawa",
    }).map(({ id }) => id),
    ["bromo"],
  );
});

test("uniqueSorted removes duplicates using Indonesian collation", () => {
  assert.deepEqual(uniqueSorted(["Bali", "Aceh", "Bali"]), ["Aceh", "Bali"]);
});
