import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "sonner";

const sansation = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Sansation-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Sansation-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Sansation-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Sansation-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/Sansation-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Sansation-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sansation",
});

export const metadata: Metadata = {
  title: "Vesta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sansation.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
