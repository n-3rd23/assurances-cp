// sidebar bg -> background -> : #313541;
// sidebar active_home background -> : #E95656;
// sidebar icon_not active  -> background -> : #5A6371;

import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import  Link  from "next/link";
import { Fragment } from "react";
import styles from "./admin.module.scss";
import { route } from "next/dist/next-server/server/router";

interface Props {
  title?: string;
  description: string;
  children: JSX.Element | JSX.Element[];
}

export default function Admin({ title, description, children }: Props) {
  const router: NextRouter = useRouter();
  const url = "https://assurances.co.in" + router.asPath;
  return (
    <Fragment>
      <NextSeo
        nofollow
        noindex
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "website",
          url,
          title: title,
          description: description,
        }}
      />
      {/* sidebar begins */}
      <div className="container-fluid bg-light">
        <div className="row">
          <div className={`${styles.side_bar} p-0`}>
            <Link href="/admin">
              <a className={`${styles.home} py-3 w-100 text-center`}>
                <img className={styles.nav_icon}  src="/icons/home.svg" alt="home"/>
              </a>
            </Link>
            <Link href="/admin">
              <a className={`py-3 w-100 text-center`}>
                <img className={styles.nav_icon} src="/icons/bar-chart.svg" alt="home"/>
              </a>
            </Link>
            <Link href="/admin/messages">
              <a className={`py-3 w-100 text-center`}>
                {
                  router.pathname == '/admin/messages' ? <img className={styles.nav_icon} src="/icons/message_active.svg" alt="home"/> : <img className={styles.nav_icon} src="/icons/message.svg" alt="home"/>
                }
              </a>
            </Link>
            <Link href="/admin/plans">
              <a className={`py-3 w-100 text-center`}>
                {
                  router.pathname == '/admin/plans' ? <img className={styles.nav_icon} src="/icons/newspaper_active.svg" alt="home"/> : <img className={styles.nav_icon} src="/icons/newspaper.svg" alt="home"/>
                }
              </a>
            </Link>
            <Link href="/admin">
              <a className={`py-3 w-100 text-center mt-auto ${styles.logout}`}>
                <img className={styles.nav_icon} src="/icons/power.svg" alt="home"/>
              </a>
            </Link>
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
