"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BarChart3,
  Database,
  Filter,
  Heart,
  Info,
  List,
  LocateFixed,
  Map,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { SearchBox } from "@/components/filters/SearchBox";
import { InsightsPanel } from "@/components/insights/InsightsPanel";
import { DynamicMap } from "@/components/map/DynamicMap";
import { PlaceDetailDrawer } from "@/components/places/PlaceDetailDrawer";
import { PlaceList } from "@/components/places/PlaceList";
import { loadExplorerData } from "@/lib/data";
import { filterPlaces, uniqueSorted } from "@/lib/filters";
import { readFavorites, writeFavorites } from "@/lib/storage";
import type { Category, ExplorerFilters, Place } from "@/types/place";

type PanelName = "filters" | "list" | "insights" | null;

type GeoExplorerProps = {
  initialView?: "all" | "favorites";
};

const emptyFilters: ExplorerFilters = {
  query: "",
  categories: [],
  province: "",
  island: "",
};

function MobileSheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="mobile-sheet"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mobile-sheet__surface">
        <div className="mobile-sheet__header">
          <h2>{title}</h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label={`Tutup ${title.toLocaleLowerCase("id-ID")}`}
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-sheet__body">{children}</div>
      </div>
    </dialog>
  );
}

export function GeoExplorer({ initialView = "all" }: GeoExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? [];
  const [places, setPlaces] = useState<Place[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [invalidCount, setInvalidCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [searchDraft, setSearchDraft] = useState(searchParams.get("q") ?? "");
  const [filters, setFilters] = useState<ExplorerFilters>({
    query: searchParams.get("q") ?? "",
    categories: initialCategories,
    province: searchParams.get("province") ?? "",
    island: searchParams.get("island") ?? "",
  });
  const [selectedId, setSelectedId] = useState(searchParams.get("place") ?? "");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<PanelName>(null);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    let active = true;

    loadExplorerData()
      .then((data) => {
        if (!active) return;
        setPlaces(data.places);
        setCategories(data.categories);
        setInvalidCount(data.invalidCount);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(
          reason instanceof Error
            ? reason.message
            : "Data wisata tidak dapat dimuat.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setFavorites(readFavorites());
      setFavoritesReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFilters((current) =>
        current.query === searchDraft
          ? current
          : { ...current, query: searchDraft },
      );
    }, 250);
    return () => window.clearTimeout(timer);
  }, [searchDraft]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query) params.set("q", filters.query);
    if (filters.categories.length)
      params.set("category", filters.categories.join(","));
    if (filters.province) params.set("province", filters.province);
    if (filters.island) params.set("island", filters.island);
    if (selectedId) params.set("place", selectedId);
    const query = params.toString();
    const target = query ? `${pathname}?${query}` : pathname;

    if (`${window.location.pathname}${window.location.search}` !== target) {
      router.replace(target, { scroll: false });
    }
  }, [filters, pathname, router, selectedId]);

  const filteredPlaces = useMemo(
    () => filterPlaces(places, filters),
    [filters, places],
  );
  const visiblePlaces =
    initialView === "favorites"
      ? filteredPlaces.filter((place) => favorites.includes(place.id))
      : filteredPlaces;
  const selectedPlace =
    places.find((place) => place.id === selectedId) ?? null;
  const selectedCategory = categories.find(
    (category) => category.id === selectedPlace?.category,
  );
  const provinces = uniqueSorted(places.map((place) => place.province));
  const islands = uniqueSorted(places.map((place) => place.island));

  const resetFilters = () => {
    setSearchDraft("");
    setFilters(emptyFilters);
    setSelectedId("");
  };

  const changeSearch = (value: string) => {
    setSearchDraft(value);
    setSelectedId("");
  };

  const changeFilters = (next: ExplorerFilters) => {
    setFilters(next);
    setSelectedId("");
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id];
      writeFavorites(next);
      return next;
    });
  };

  const selectPlace = (place: Place) => {
    setSelectedId(place.id);
    setMobilePanel(null);
  };

  if (loading) {
    return (
      <div className="app-state app-state--loading" role="status">
        <div className="state-masthead" />
        <div className="state-grid">
          <div className="state-rail" />
          <div className="state-map">
            <span />
            <p>Memuat data wisata…</p>
          </div>
          <div className="state-panel" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="app-error">
        <Database size={34} aria-hidden="true" />
        <h1>Atlas tidak dapat dibuka</h1>
        <p>{error} Periksa file statis di folder data, lalu coba lagi.</p>
        <button
          type="button"
          className="button"
          onClick={() => {
            setLoading(true);
            setError("");
            setReloadKey((key) => key + 1);
          }}
        >
          Muat ulang data
        </button>
      </main>
    );
  }

  return (
    <div className="geo-app">
      <header className="top-bar">
        <Link href="/" className="wordmark" aria-label="GeoWisata, beranda">
          <span className="wordmark__mark">
            <Map size={18} aria-hidden="true" />
          </span>
          <span>
            GeoWisata
            <small>Atlas destinasi Indonesia</small>
          </span>
        </Link>
        <div className="top-bar__search">
          <SearchBox
            id="place-search-desktop"
            value={searchDraft}
            resultCount={visiblePlaces.length}
            onChange={changeSearch}
          />
        </div>
        <nav className="top-bar__nav" aria-label="Navigasi utama">
          <Link
            href="/"
            className={initialView === "all" ? "is-current" : undefined}
          >
            <Map size={17} aria-hidden="true" />
            Jelajah
          </Link>
          <Link
            href="/favorites"
            className={
              initialView === "favorites" ? "is-current" : undefined
            }
          >
            <Heart size={17} aria-hidden="true" />
            Favorit
            {favoritesReady ? <span>{favorites.length}</span> : null}
          </Link>
          <Link href="/about-data">
            <Info size={17} aria-hidden="true" />
            Data
          </Link>
        </nav>
      </header>

      <main className="explorer-grid">
        <aside className="left-rail">
          <FiltersPanel
            idPrefix="filters-desktop"
            filters={filters}
            categories={categories}
            provinces={provinces}
            islands={islands}
            resultCount={visiblePlaces.length}
            onChange={changeFilters}
            onReset={resetFilters}
          />
          <section className="results-panel" aria-labelledby="results-title">
            <div className="results-panel__heading">
              <h2 id="results-title">
                {initialView === "favorites" ? "Tempat tersimpan" : "Hasil"}
              </h2>
              <span>{visiblePlaces.length}</span>
            </div>
            <PlaceList
              places={visiblePlaces}
              categories={categories}
              favorites={favorites}
              onSelect={selectPlace}
              onToggleFavorite={toggleFavorite}
              onReset={resetFilters}
              emptyKind={
                initialView === "favorites" ? "favorites" : "filter"
              }
            />
          </section>
        </aside>

        <section className="map-region" aria-label="Peta wisata Indonesia">
          <div className="mobile-search">
            <SearchBox
              id="place-search-mobile"
              value={searchDraft}
              resultCount={visiblePlaces.length}
              onChange={changeSearch}
            />
          </div>
          <DynamicMap
            places={visiblePlaces}
            categories={categories}
            selectedPlace={selectedPlace}
            resetSignal={resetSignal}
            onSelect={selectPlace}
            onClear={() => setSelectedId("")}
          />
          <div className="map-status">
            <strong>{visiblePlaces.length}</strong>
            <span>lokasi terlihat</span>
            {invalidCount ? (
              <span>{invalidCount} record invalid dilewati</span>
            ) : null}
          </div>
          <div className="map-actions">
            <button
              type="button"
              className="map-action"
              onClick={() => setResetSignal((value) => value + 1)}
              aria-label="Kembalikan peta ke seluruh Indonesia"
            >
              <LocateFixed size={18} aria-hidden="true" />
              <span>Indonesia</span>
            </button>
            <button
              type="button"
              className="map-action map-action--mobile"
              onClick={() => setMobilePanel("filters")}
            >
              <SlidersHorizontal size={18} aria-hidden="true" />
              <span>Filter</span>
            </button>
          </div>
        </section>

        <aside
          className={`right-panel${selectedPlace ? " is-detail-open" : ""}`}
          aria-label={selectedPlace ? "Detail lokasi" : "Insight dataset"}
        >
          {selectedPlace ? (
            <PlaceDetailDrawer
              place={selectedPlace}
              category={selectedCategory}
              favorite={favorites.includes(selectedPlace.id)}
              onToggleFavorite={() => toggleFavorite(selectedPlace.id)}
              onClose={() => setSelectedId("")}
            />
          ) : (
            <InsightsPanel
              places={visiblePlaces}
              categories={categories}
              totalPlaces={places.length}
              favoriteCount={favorites.length}
            />
          )}
        </aside>
      </main>

      <nav className="mobile-dock" aria-label="Panel peta">
        <button type="button" onClick={() => setMobilePanel("list")}>
          <List size={19} aria-hidden="true" />
          <span>Daftar</span>
          <strong>{visiblePlaces.length}</strong>
        </button>
        <button type="button" onClick={() => setMobilePanel("filters")}>
          <Filter size={19} aria-hidden="true" />
          <span>Filter</span>
          {filters.categories.length ||
          filters.province ||
          filters.island ? (
            <strong>
              {filters.categories.length +
                Number(Boolean(filters.province)) +
                Number(Boolean(filters.island))}
            </strong>
          ) : null}
        </button>
        <button type="button" onClick={() => setMobilePanel("insights")}>
          <BarChart3 size={19} aria-hidden="true" />
          <span>Insight</span>
        </button>
      </nav>

      {mobilePanel === "filters" ? (
        <MobileSheet title="Filter peta" onClose={() => setMobilePanel(null)}>
          <FiltersPanel
            idPrefix="filters-mobile"
            filters={filters}
            categories={categories}
            provinces={provinces}
            islands={islands}
            resultCount={visiblePlaces.length}
            onChange={changeFilters}
            onReset={resetFilters}
          />
        </MobileSheet>
      ) : null}

      {mobilePanel === "list" ? (
        <MobileSheet title="Daftar lokasi" onClose={() => setMobilePanel(null)}>
          <PlaceList
            places={visiblePlaces}
            categories={categories}
            favorites={favorites}
            onSelect={selectPlace}
            onToggleFavorite={toggleFavorite}
            onReset={resetFilters}
            emptyKind={initialView === "favorites" ? "favorites" : "filter"}
          />
        </MobileSheet>
      ) : null}

      {mobilePanel === "insights" ? (
        <MobileSheet title="Insight data" onClose={() => setMobilePanel(null)}>
          <InsightsPanel
            places={visiblePlaces}
            categories={categories}
            totalPlaces={places.length}
            favoriteCount={favorites.length}
          />
        </MobileSheet>
      ) : null}

      <footer className="data-colophon">
        <span>GeoWisata · dataset statis</span>
        <span>Basemap © OpenStreetMap</span>
        <Link href="/about-data">Lisensi dan batas data</Link>
      </footer>
    </div>
  );
}
