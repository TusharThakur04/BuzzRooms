"use client";
import Footer from "@/components/footer/Footer";
import "./globals.scss";
import Header from "@/components/header/Header";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProviders } from "./providers";

const metadata = {
  title: "BuzzRooms",
  description: "Real time chat rooms based on trending topics on X (Twitter)",
};

export default function RootLayout({ children }) {
  const location = usePathname();
  console.log("location:", location);
  const isChatRoom = /^\/rooms\/[^\/]+\/?$/.test(location);

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Rubik+Spray+Paint&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <AppProviders>
            {isChatRoom ? (
              <main
                style={{
                  // marginTop: "100px",
                  minHeight: "100vh",
                }}
              >
                {children}
              </main>
            ) : (
              <>
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
              </>
            )}
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
