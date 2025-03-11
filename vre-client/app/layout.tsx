import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "VRE",
  description: "Real Estate Information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
};
