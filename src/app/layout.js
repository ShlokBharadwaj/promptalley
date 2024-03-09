import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "promptalley",
  description: "Your go-to place for sharing and finding creative prompts with Image and Text",
};

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body>
        <Suspense fallback="Loading...">
          <Provider>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Navbar />
              {children}
            </main>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}

export default RootLayout;