import { Container } from "../common/container/Container";
import styles from "./TopTrends.module.scss";

const TopTrends = () => {
  const topics = ["random1", "random2", "random3", "random4"];

  return (
    <section className={styles.topTrendsSection}>
      <Container>
        <div className={` ${styles.trendCard} py-16 px-6 text-white`}>
          <div className=" flex justify-center items-center flex-col">
            <h2 className={`${styles.heading} text-3xl font-bold  text-center`}>
              Top Trending Now
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topics.map((topic, index) => (
                <div key={index} className={styles.card}>
                  <p className={styles.topic}>#{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopTrends;
