import Navbar from "@/app/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientOnly from "@/app/components/ClientOnly";
import LoginMoal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnd",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser
          } />
          <LoginMoal />
          <RegisterModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
