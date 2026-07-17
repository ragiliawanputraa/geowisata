"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Category, Place } from "@/types/place";

type InsightsPanelProps = {
  places: Place[];
  categories: Category[];
  totalPlaces: number;
  favoriteCount: number;
};

export function InsightsPanel({
  places,
  categories,
  totalPlaces,
  favoriteCount,
}: InsightsPanelProps) {
  const categoryData = categories
    .map((category) => ({
      name: category.label,
      shortName: category.shortLabel,
      value: places.filter((place) => place.category === category.id).length,
      color: `var(${category.colorToken})`,
    }))
    .filter(({ value }) => value > 0)
    .sort((a, b) => b.value - a.value);

  const provinceData = Object.entries(
    places.reduce<Record<string, number>>((counts, place) => {
      counts[place.province] = (counts[place.province] ?? 0) + 1;
      return counts;
    }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <section className="insights-panel" aria-labelledby="insights-title">
      <div className="panel-heading">
        <div>
          <h2 id="insights-title">Baca persebaran</h2>
          <p>Ringkasan dari hasil yang sedang terlihat.</p>
        </div>
      </div>

      <dl className="stat-strip">
        <div>
          <dt>Terlihat</dt>
          <dd>{places.length}</dd>
        </div>
        <div>
          <dt>Dataset</dt>
          <dd>{totalPlaces}</dd>
        </div>
        <div>
          <dt>Favorit</dt>
          <dd>{favoriteCount}</dd>
        </div>
      </dl>

      <div className="chart-block">
        <h3>Per kategori</h3>
        <div className="chart-frame">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={1}
            minHeight={1}
          >
            <BarChart data={categoryData}>
              <CartesianGrid vertical={false} stroke="var(--color-rule)" />
              <XAxis
                dataKey="shortName"
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={20}
                fontSize={11}
              />
              <Tooltip
                cursor={{ fill: "var(--color-paper-2)" }}
                contentStyle={{
                  background: "var(--color-paper)",
                  border: "var(--rule-thin) solid var(--color-rule-strong)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-body)",
                }}
              />
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="province-ranking">
        <h3>Provinsi teratas</h3>
        <ol>
          {provinceData.map(({ name, value }) => (
            <li key={name}>
              <span>{name}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
