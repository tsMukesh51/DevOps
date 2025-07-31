import styles from "./page.module.css";
import { prismaClient } from "db";

export default async function Home() {
  const usersList = await prismaClient.user.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>
          {JSON.stringify(usersList)};
        </p>
      </main>
    </div>
  );
}
