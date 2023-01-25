import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Text } from '@mantine/core';

const Home: NextPage<{}> = ({}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Discover your new favorite movie." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text weight="bold">Home</Text>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
