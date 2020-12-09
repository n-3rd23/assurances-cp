// sidebar bg -> background -> : #313541;
// sidebar active_home background -> : #E95656;
// sidebar icon_not active  -> background -> : #5A6371;


import { NextSeo } from "next-seo";
import { NextRouter } from "next/dist/client/router";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Link from "next/link";
import styles from "./layout.module.scss"

interface Props {
  title: string;
  description: string;
  children: JSX.Element;
}

export default function Layout({ title, description, children }: Props) {
  const router: NextRouter = useRouter();
  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={
          router.pathname == "/"
            ? "https://assurances.co.in"
            : "https://assurances.co.in" + router.asPath
        }
        openGraph={{
          type: "website",
          url:
            router.pathname == "/"
              ? "https://assurances.co.in"
              : "https://assurances.co.in" + router.asPath,
          title: title,
          description: description,
        }}
      />
      {/* sidebar begins */}
      <div className="container-fluid bg-light">
       <div className="row">
          <div className={`${styles.side_bar}`} >
            <Link href="/admin">
              <a className={`${styles.home} py-3 w-100 text-center`}>
                <img className={styles.nav_icon} src="/icons/home_1.svg" alt="home"/>
              </a>
            </Link>
            <Link href="#">
              <a className={`py-3 w-100 text-center`}>
                <img className={styles.nav_icon} src="/icons/bar-chart.svg" alt="home"/>
              </a>
            </Link>
            <Link href="/admin/messages">
              <a className={`py-3 w-100 text-center`}>
                {
                  router.pathname == `/admin/messages` ? <img className={styles.nav_icon} src="/icons/message_active.svg" alt="home"/> : <img className={styles.nav_icon} src="/icons/message.svg" alt="home"/>
                }
              </a>
            </Link>
            <Link href="/admin/plans">
              <a className={`py-3 w-100 text-center`}>
                {
                  router.pathname == '/admin/plans' ?  <img className={styles.nav_icon} src="/icons/newspaper_active.svg" alt="home"/> : <img className={styles.nav_icon} src="/icons/newspaper.svg" alt="home"/>
                }
              </a>
            </Link>
            <Link href="#">
                <a className={`mt-auto w-100 text-center py-3`}>
                  <img className={styles.nav_icon} src="/icons/power.svg" alt="home"/>
                </a>
            </Link>
          </div>
          <div className={styles.wrapper}>
            {children}
          </div>
       </div>
      </div>
      {/* sidebar ends */}
    </Fragment>
  );
}
