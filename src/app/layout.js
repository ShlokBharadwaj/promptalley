import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "promptalley",
  description: "Your go-to place for sharing and finding creative prompts.",
};

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;