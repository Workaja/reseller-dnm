import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import kelinci from '../public/kelinci.png'
import kelinci2 from '../public/kelinci2.png'
import { pages, socials } from '../pages'

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Reseller DNM</title>
        <meta name="description" content="Reseller DNM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.logo}>
        <Image src={kelinci} alt='Logo' title='logo' layout='responsive' />
      </div>
      <div style={{width: '100%', height: '100%' }}>
        <div className={styles.container}>
          {
            pages.map((p, i) => {
              return (
                <Link key={i} href={p.url} passHref={p.pass}>
                  <div className={styles.button}>
                    {p.title}
                  </div>
                </Link>
              )
            })
          }
        </div>
        <div className={styles.socialMedia}>
          {
            socials.map((s, i) => {
              return (
                <Link key={i} href={s.url} passHref={true}>
                  <div className={styles.socialButton}>
                    <Image src={s.image} alt={s.title} title={s.title} width="64" height="64" />
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
