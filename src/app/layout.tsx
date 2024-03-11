import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/app/redux/provider";
import AuthLayout from "../app/Layout/AuthLayout";
import NavBarLayout from '../app/components/NavBar/NavBarLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add the link tag for the custom favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white">
        <ReduxProvider>
          <div className="min-h-screen">
            <div className="flex">
              <NavBarLayout />
              <div className="flex flex-col flex-grow w-screen min-h-screen main-layout">
                <AuthLayout>
                  <div className="main-body">{children}</div>
                </AuthLayout>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
