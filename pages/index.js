import Head from 'next/head';

import Hero from './components/hero';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lost and Found Fasilkom UI</title>
        <meta name="description" content="Kehilangan atau menemukan barang? Laporkan kesini!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  )
}
