

'use client';

import styles from "./page.module.css";
import CardComponent from "./component/CardComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <CardComponent />
    </main>
  );
}
