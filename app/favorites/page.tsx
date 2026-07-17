import { Suspense } from "react";
import { GeoExplorer } from "@/components/layout/GeoExplorer";

export default function FavoritesPage() {
  return (
    <Suspense fallback={<div className="route-loading">Memuat favorit…</div>}>
      <GeoExplorer initialView="favorites" />
    </Suspense>
  );
}
