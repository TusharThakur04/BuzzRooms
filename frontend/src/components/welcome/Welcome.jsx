import { useState } from "react";
import { Container } from "../common/container/Container";
import styles from "./Welcome.module.scss";
import AuthCard from "../authcard/AuthCard";
import Link from "next/link";

export default function Welcome({ isSignedIn, user }) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <Container>
      <section className={`${styles.heroSection} flex justify-center w-full`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={styles.heading}>
            {isSignedIn
              ? `Hola${user?.firstName ? `, ${user.firstName}` : ""}!`
              : "Real-Time Chat Rooms Based on What’s Trending"}
          </h1>

          <p className={styles.subheading}>
            {isSignedIn
              ? "Jump into trending rooms or catch up on what you’ve missed."
              : "Join live conversations around the hottest topics from X (Twitter). No clutter. Just buzz."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isSignedIn ? (
              <>
                <Link href="/rooms" className={styles.btnPrimary}>
                  Explore Rooms
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowAuth(true)}
                  className={styles.btnPrimary}
                >
                  🔥 Join the Buzz
                </button>
                <Link href="/rooms" className={styles.btnSecondary}>
                  👀 Browse Rooms
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {!isSignedIn && showAuth && (
        <AuthCard onClose={() => setShowAuth(false)} />
      )}
    </Container>
  );
}
