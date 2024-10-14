import { Toaster } from "@/components/ui/toaster";
import { UserContextProvider } from "./context/user-context";
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased`}>
        <UserContextProvider>{children}</UserContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
