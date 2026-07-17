"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Database, Map } from "lucide-react";
import { useEffect, useState } from "react";
import { loadDatasetMetadata, loadExplorerData } from "@/lib/data";
import type { DatasetMetadata, Place } from "@/types/place";

export function AboutData() {
  const [metadata, setMetadata] = useState<DatasetMetadata | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([loadDatasetMetadata(), loadExplorerData()])
      .then(([nextMetadata, explorerData]) => {
        setMetadata(nextMetadata);
        setPlaces(explorerData.places);
      })
      .catch((reason: unknown) =>
        setError(
          reason instanceof Error
            ? reason.message
            : "Metadata dataset tidak dapat dimuat.",
        ),
      );
  }, []);

  return (
    <main className="about-page">
      <header className="about-page__masthead">
        <Link href="/" className="wordmark">
          <span className="wordmark__mark">
            <Map size={18} aria-hidden="true" />
          </span>
          <span>GeoWisata</span>
        </Link>
        <Link href="/" className="text-button">
          <ArrowLeft size={16} aria-hidden="true" />
          Kembali ke peta
        </Link>
      </header>

      <article className="about-document">
        <header>
          <Database size={28} aria-hidden="true" />
          <h1>Tentang data</h1>
          <p>
            Catatan sumber, lisensi, dan batas penggunaan dataset GeoWisata.
          </p>
        </header>

        {error ? (
          <div className="inline-error" role="alert">
            <strong>Metadata tidak tersedia.</strong>
            <span>{error}</span>
          </div>
        ) : !metadata ? (
          <div className="about-loading" role="status">
            Memuat metadata…
          </div>
        ) : (
          <>
            <dl className="dataset-facts">
              <div>
                <dt>Record terkurasi</dt>
                <dd>{metadata.recordCount}</dd>
              </div>
              <div>
                <dt>Diproses</dt>
                <dd>{metadata.generatedAt}</dd>
              </div>
              <div>
                <dt>Mode runtime</dt>
                <dd>JSON statis</dd>
              </div>
            </dl>

            <section>
              <h2>Sumber dan lisensi</h2>
              <div className="source-table">
                {metadata.dataSources.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>
                      <strong>{source.name}</strong>
                      <small>{source.license}</small>
                    </span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h2>Referensi yang dipakai</h2>
              <div className="reference-groups">
                {metadata.referenceUsage.map((group) => (
                  <article key={group.label} className="reference-group">
                    <h3>{group.label}</h3>
                    <p>{group.purpose}</p>
                    <ul>
                      {group.websites.map((site) => (
                        <li key={site.url}>
                          <a href={site.url} target="_blank" rel="noreferrer">
                            {site.name}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                          <small>{site.license}</small>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2>Referensi per destinasi</h2>
              <div className="place-reference-table">
                {places.map((place) => (
                  <article key={place.id} className="place-reference-row">
                    <div>
                      <strong>{place.name}</strong>
                      <small>
                        {place.city}, {place.province}
                      </small>
                    </div>
                    <div className="place-reference-links">
                      <a href={place.source.url} target="_blank" rel="noreferrer">
                        OSM
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      {place.wikipediaUrl ? (
                        <a
                          href={place.wikipediaUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Wikipedia
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                      {place.wikidataId ? (
                        <a
                          href={`https://www.wikidata.org/wiki/${place.wikidataId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Wikidata
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                      {place.website ? (
                        <a href={place.website} target="_blank" rel="noreferrer">
                          Resmi
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <h2>Batas data</h2>
              <ul className="notes-list">
                {metadata.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Yang aplikasi tidak lakukan</h2>
              <p>
                GeoWisata tidak menghubungi API data wisata saat runtime, tidak
                melacak pengguna, dan tidak mengirim favorit ke server.
                Geolokasi juga tidak diminta otomatis. Periksa sumber resmi
                sebelum menggunakan informasi untuk perjalanan.
              </p>
            </section>
          </>
        )}
      </article>

      <footer className="about-colophon">
        <span>Data lokal · tanpa backend · tanpa akun</span>
        <Link href="/">Buka atlas</Link>
      </footer>
    </main>
  );
}
