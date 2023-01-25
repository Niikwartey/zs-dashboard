import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage<{}> = ({}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Discover your new favorite movie." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}></div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
