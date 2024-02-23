import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "promptalley",
  description: "Your go-to place for sharing and finding creative prompts.",
};

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;