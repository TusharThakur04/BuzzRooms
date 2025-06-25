import { Container } from "../common/container/Container";
import styles from "./Trends.module.scss";

const Trends = ({ trends }) => {
  return (
    <div className={`${styles.roomsPage} px-6 py-8`}>
      <Container>
        <h1 className={`text-3xl font-bold mb-6 ${styles.heading}`}>
          Top 30 Trends
        </h1>
        <div
          className={`${styles.grid} grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6`}
        >
          {trends.map((trend, idx) => (
            <div key={idx} className={`${styles.trendCard} transition-all`}>
              <h2 className={styles.trendTitle}>{trend.name}</h2>
              <p
                className={styles.trendSubtitle}
              >{`Active Buzzers: ${Math.floor(Math.random() * 120)}`}</p>
              <button className={styles.joinBtn}>Join Room</button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Trends;
