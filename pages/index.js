import Head from "next/head";
import Header from "../components/Header";
import Movies from "../components/Movies";
import Navbar from "../components/Navbar";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div className="">
      <Head>
        <title>Hulu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <Movies results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
