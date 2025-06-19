"use client";
import Footer from "@/components/footer/Footer";
import "./globals.scss";
import Header from "@/components/header/Header";
import { ClerkProvider } from "@clerk/nextjs";

const metadata = {
  title: "BuzzRooms",
  description: "Real time chat rooms based on trending topics on X (Twitter)",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main
          // style={{
          //   minHeight: "100vh",
          // }}
          >
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
