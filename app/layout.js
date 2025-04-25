import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";
import Provider from "./provider";

export const metadata = {
  title: "FADE | AI-Powered Code Generation Platform",
  description: "Transform your ideas into functional code with FADE's AI-powered development tools",
  icons: {
    icon: [
      {
        url: "/fade-logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/fade-logo.png",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/fade-logo.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#4F46E5",
  openGraph: {
    title: "FADE | AI-Powered Code Generation Platform",
    description: "Transform your ideas into functional code with FADE's AI-powered development tools",
    url: "https://fade.dev",
    siteName: "FADE",
    images: [
      {
        url: "/fade-logo.png", 
        width: 512,
        height: 512,
      }
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <Provider>{children}</Provider>
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
