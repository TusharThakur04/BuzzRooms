import { Container } from "../common/container/Container";
import styles from "./Welcome.module.scss";

export default function Welcome() {
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
            <button className={styles.btnPrimary}>🔥 Join the Buzz</button>
            <button className={styles.btnSecondary}>👀 Browse Rooms</button>
          </div>
        </div>
      </section>
    </Container>
  );
}
