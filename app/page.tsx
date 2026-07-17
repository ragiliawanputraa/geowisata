import { Suspense } from "react";
import { GeoExplorer } from "@/components/layout/GeoExplorer";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="route-loading">Memuat atlas…</div>}>
      <GeoExplorer />
    </Suspense>
  );
}
