import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import QueryProvider from "@/providers/QueryProvider";
import FetchedUserProvider from "@/context/FetchedUserContext";
import SidePanel from "@/components/SidePanel";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delman FE THT - Aqiel Ilhamy",
  description: "Delman FE THT - Aqiel Ilhamy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <FetchedUserProvider>
          <body className={`flex ${inter.className} h-screen `}>
            <Header headerTitle={"Delman.io"} />

            <div className="mt-12 flex flex-row w-full">
              <Sidebar />
              <SidePanel />
              <main className="flex-1 bg-slate-50">{children}</main>
            </div>
            <Toaster position="bottom-center" />
          </body>
        </FetchedUserProvider>
      </QueryProvider>
    </html>
  );
}
