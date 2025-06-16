import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { Container } from "../common/container/Container";

export default function Footer() {
  return (
    <Container>
      {" "}
      <footer
        className={`${styles.footer} flex flex-col md:flex-row items-center justify-between p-6`}
      >
        <div className={styles.left}>
          <div className={styles.logo}>🐝 BuzzRooms</div>
          <div className={styles.copy}>
            © {new Date().getFullYear()} BuzzRooms
          </div>
        </div>
        <nav className={`${styles.nav} flex gap-4 mt-4 md:mt-0`}>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/rooms" className="hover:underline">
            Rooms
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </footer>
    </Container>
  );
}
