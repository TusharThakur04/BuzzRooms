import Link from "next/link";
import styles from "./PrevJoined.module.scss";

export default function PrevJoined() {
  const rooms = [
    {
      id: "openai",
      name: "#OpenAIUpdates",
      lastActive: "3 hours ago",
      href: "/rooms/openai",
    },
    {
      id: "elections",
      name: "#IndiaElections",
      lastActive: "yesterday",
      href: "/rooms/elections",
    },
    {
      id: "fifa2026",
      name: "#FIFA2026",
      lastActive: "just now",
      href: "/rooms/fifa2026",
    },
  ];
  return (
    <section className={styles.joinedRoomsSection}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className={styles.heading}> Previously Joined Rooms</h2>
        <p className={styles.subheading}>
          Catch up on your last conversations or rejoin active discussions.
        </p>

        <div className={styles.grid}>
          {rooms.map((room) => (
            <div key={room.id} className={styles.card}>
              <h3 className={styles.roomName}>{room.name}</h3>
              <p className={styles.lastActive}>
                Last active: {room.lastActive}
              </p>
              <Link href={room.href} className={styles.rejoinLink}>
                🔁 Rejoin Room
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
