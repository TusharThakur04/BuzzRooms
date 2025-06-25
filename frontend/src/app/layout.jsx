"use client";
import Footer from "@/components/footer/Footer";
import "./globals.scss";
import Header from "@/components/header/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProviders } from "./providers";

const metadata = {
  title: "BuzzRooms",
  description: "Real time chat rooms based on trending topics on X (Twitter)",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <AppProviders>
            <Header />
            <main
              style={{
                // marginTop: "100px",
                minHeight: "100vh",
              }}
            >
              {children}
            </main>
            <Footer />
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
