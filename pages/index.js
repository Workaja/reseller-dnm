import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import kelinci from '../public/kelinci.png'
import kelinci2 from '../public/kelinci2.png'

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Reseller DNM</title>
        <meta name="description" content="Reseller DNM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.logo}>
        <Image src={kelinci} alt='kelinci' title='kelinci' layout='responsive' />
      </div>
      <div style={{width: '100%', height: '100%' }}>
        <div className={styles.container}>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSchZ2tWkU6XPncQsfhcf1q9LDRGOVmZWKuq9xSlpLho3zcEtA/viewform" passHref={true}>
            <div className={styles.button}>
              😎 DAFTAR RESELLER DNM⚡
            </div>
          </Link>
          <Link href="https://drive.google.com/file/d/1TlFxc-qj_Bfx2-szl78iUPv-LG-k05IY/view?usp=sharing" passHref={true}>
            <div className={styles.button}>
              📑 KATALOG PRODUK RESELLER 📲
            </div>
          </Link>
          <Link href="https://www.google.com/" passHref={true}>
            <div className={styles.button}>
              🪙 CEK POIN 🪙
            </div>
          </Link>
        </div>
        <div className={styles.socialMedia}>
          <Link href="https://www.google.com/" passHref={true}>
            <div className={styles.socialButton}>
              <Image src={kelinci2} alt='kelinci2' title='kelinci2' width="64" height="64" />
            </div>
          </Link>
          <Link href="https://www.google.com/" passHref={true}>
            <div className={styles.socialButton}>
              <Image src={kelinci2} alt='kelinci2' title='kelinci2' width="64" height="64" />
            </div>
          </Link>
          <Link href="https://www.google.com/" passHref={true}>
            <div className={styles.socialButton}>
              <Image src={kelinci2} alt='kelinci2' title='kelinci2' width="64" height="64" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
