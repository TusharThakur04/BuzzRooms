import styles from "./AuthCard.module.scss";
import { SignUpButton, SignInButton } from "@clerk/nextjs";

export default function AuthCard({ onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-40">
      <div className={styles.authCard}>
        <h2 className={styles.title}>Start Buzzing Now</h2>
        <p className={styles.subtitle}>
          Sign in or create an account to join trending conversations.
        </p>
        <div className="flex justify-center flex-wrap gap-3 mb-4">
          <SignUpButton>
            <button className={`${styles.btn} ${styles.signUpBtn}`}>
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton>
            <button className={`${styles.btn} ${styles.signInBtn}`}>
              Sign In
            </button>
          </SignInButton>
        </div>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-white underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
