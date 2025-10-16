import "./globals.css";
import { Providers } from "@/providers/Providers";

export const metadata = {
  title: "Appliances Storefront",
  description: "MVP storefront for appliances system integration project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
