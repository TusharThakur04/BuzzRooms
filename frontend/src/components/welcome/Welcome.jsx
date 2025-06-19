import { useState } from "react";
import { Container } from "../common/container/Container";
import styles from "./Welcome.module.scss";
import AuthCard from "../authcard/AuthCard";
import Link from "next/link";

export default function Welcome() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <Container>
      <section className={`${styles.heroSection} flex justify-center w-full`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={styles.heading}>
            Real-Time Chat Rooms Based on What’s Trending
          </h1>
          <p className={styles.subheading}>
            Join live conversations around the hottest topics from X (Twitter).
            No clutter. Just buzz.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowAuth(true)}
              className={styles.btnPrimary}
            >
              🔥 Join the Buzz
            </button>

            <button className={styles.btnSecondary}>
              <Link href="/rooms">👀 Browse Rooms</Link>
            </button>
          </div>
        </div>
      </section>

      {showAuth && <AuthCard onClose={() => setShowAuth(false)} />}
    </Container>
  );
}
