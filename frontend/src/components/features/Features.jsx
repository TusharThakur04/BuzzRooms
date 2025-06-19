import { Container } from "../common/container/Container";
import styles from "./Features.module.scss";

export default function Features() {
  const features = [
    {
      title: "🚀 Real-Time X Trends → Live Rooms",
      description:
        "Join dynamic chat rooms based on live trending topics from X (Twitter). No lag. Just real-time buzz.",
    },
    {
      title: "🧼 Zero Spam, Clean UX",
      description:
        "No clutter, no chaos. We prioritize a smooth, minimal, and focused chat experience.",
    },
    {
      title: "🧠 LLM-Powered Summaries",
      description:
        "Missed the convo? Get AI-generated summaries of discussions and jump right in.",
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div
          className={`${styles.sectionContent} flex justify-center items-center flex-col`}
        >
          <h2 className={styles.heading}>Why BuzzRooms?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className={styles.card}>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
