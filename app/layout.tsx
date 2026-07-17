import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Newsreader,
} from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoWisata — Jelajah wisata lewat peta",
  description:
    "Eksplorasi destinasi wisata Indonesia melalui peta, filter wilayah, favorit lokal, dan insight data.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${newsreader.variable} ${plex.variable} ${plexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
