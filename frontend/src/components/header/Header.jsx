"use client";
import React, { useState } from "react";
import { Container } from "../common/container/Container";
import styles from "./Header.module.scss";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SignedIn, UserButton } from "@clerk/nextjs";
import useHeaderBackground from "../../hooks/hasBackground";
import { usePathname } from "next/navigation";
const Header = () => {
  const active = useHeaderBackground();
  const location = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <Container>
      <header
        className={`${active ? styles.headerShow : styles.header} flex items-center justify-between`}
      >
        <div className={styles.logo}>
          <Link href="/">BuzzRooms</Link>
        </div>
        <nav
          className={`${styles.navBar} ${
            menuOpen ? styles.navVisible : ""
          } flex items-center justify-between gap-4`}
        >
          <div
            className={`${location === "/" ? styles.active : ""} flex items-center justify-center`}
            onClick={toggleMenu}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            className={`${location === "/rooms" ? styles.active : ""} flex items-center justify-center`}
            onClick={toggleMenu}
          >
            <Link href="/rooms">Rooms</Link>
          </div>
          <div
            className={`${location === "/about" ? styles.active : ""} flex items-center justify-center`}
            onClick={toggleMenu}
          >
            <Link href="/about">About</Link>
          </div>
          <button className={styles.close}>
            <CloseIcon onClick={toggleMenu} />
          </button>
        </nav>
        <div
          className={styles.auth + " flex items-center justify-center gap-4"}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>

          <button className={styles.menu} onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>
      </header>
    </Container>
  );
};

export default Header;
