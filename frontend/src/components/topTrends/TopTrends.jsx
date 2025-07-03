import Link from "next/link";
import { Container } from "../common/container/Container";
import styles from "./TopTrends.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTrends } from "@/redux/slices/trendsSlice";

const TopTrends = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrends());
  }, []);
  const trends = useSelector((state) => state.trends.trends);
  const topTrends = trends.slice(0, 4);
  console.log(topTrends);
  console.log("Top Trends:", topTrends);

  return (
    <section className={styles.topTrendsSection}>
      <Container>
        <div className={` ${styles.trendCard} py-16 px-6 text-white`}>
          <div className=" flex justify-center items-center flex-col">
            <h2 className={`${styles.heading} text-3xl font-bold  text-center`}>
              Top Trending Now
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topTrends.map((trend, index) => (
                <Link
                  href={`/rooms/${encodeURIComponent(trend.name)}`}
                  key={index}
                >
                  <div
                    key={index}
                    className={`${styles.card} flex items-center justify-center flex-col`}
                  >
                    <p className={styles.topic}>{trend.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TopTrends;
