"use client";
import React, { useState } from "react";
import { Container } from "../common/container/Container";
import styles from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const Header = () => {
  const active = false;
  const location = usePathname();
  console.log("location", location);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <Container>
      <header
        className={`${active ? styles.headerShow : styles.header} flex items-center justify-between`}
      >
        <div className={styles.logo}>BuzzRooms</div>
        <nav
          className={`${styles.navBar} ${
            menuOpen ? styles.navVisible : ""
          } flex items-center justify-between gap-4`}
        >
          <div
            className={`${location === "/" ? styles.active : ""} flex items-center justify-center`}
          >
            <Link href="/">Home</Link>
          </div>
          <div
            className={`${location === "/rooms" ? styles.active : ""} flex items-center justify-center`}
          >
            <Link href="/rooms">Rooms</Link>
          </div>
          <div
            className={`${location === "/about" ? styles.active : ""} flex items-center justify-center`}
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

          <SignedOut>
            <SignInButton>
              <button className={styles.login}>Log In</button>
            </SignInButton>
            <SignUpButton>
              <button className={styles.signup}>Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <button className={styles.menu} onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>
      </header>
    </Container>
  );
};

export default Header;
