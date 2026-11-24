import type { Metadata, Viewport } from "next";
import "./globals.css";
import RevealObserver from "@/components/RevealObserver";
import { PROFILE } from "@/lib/data";

export const metadata: Metadata = {
  title: `${PROFILE.name} · ${PROFILE.role}`,
  description: PROFILE.tagline,
  openGraph: {
    title: `${PROFILE.name} · ${PROFILE.role}`,
    description: PROFILE.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: restores the saved theme (default dark) and enables reveal animations.
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add("js");var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t="dark";d.setAttribute("data-theme",t)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
