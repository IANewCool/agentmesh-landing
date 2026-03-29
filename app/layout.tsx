import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentMesh Protocol — Decentralized Agent Economy",
  description:
    "Open protocol for autonomous AI agent discovery, contracting, and economic exchange. BSL 1.1 licensed.",
  openGraph: {
    title: "AgentMesh Protocol",
    description: "Decentralized economic protocol for autonomous AI agents",
    url: "https://mesh.newcool.io",
    siteName: "AgentMesh",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
