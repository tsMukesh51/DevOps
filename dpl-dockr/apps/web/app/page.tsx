import styles from "./page.module.css";
import { prismaClient } from "db";

export default async function Home() {
  const usersList = await prismaClient.user.findMany();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>
          {usersList.map((u) => {
            return <div style={{ marginBottom: "10px" }}>
              <p>{u.id}</p>
              <p>{u.username}</p>
              <p>{u.password}</p>
            </div>
          })}
        </p>
      </main>
    </div>
  );
}
