import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronik des silbernen Einhorns · Leserarchiv",
  description:
    "Spoilerfreies Leserarchiv zu den Chroniken Valdrens und Marathiens.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
