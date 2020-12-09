// sidebar bg -> background -> : #313541;
// sidebar active_home background -> : #E95656;
// sidebar icon_not active  -> background -> : #5A6371;

import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";
import styles from "./admin.module.scss";

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
      <div className="container-fluid">
        <div className="row">
          <div className={`${styles.side_bar}`}>
            <div className={`${styles.nav_item} ${styles.home} py-3`}>
              <img
                className={styles.nav_icon}
                src="/icons/home.svg"
                alt="home"
              />
            </div>
            <div className={`${styles.nav_item} py-3`}>
              <img
                className={styles.nav_icon}
                src="/icons/bar-chart.svg"
                alt="home"
              />
            </div>
            <div className={`${styles.nav_item} py-3`}>
              <img
                className={styles.nav_icon}
                src="/icons/phone.svg"
                alt="home"
              />
            </div>
            <div className={`${styles.nav_item} py-3`}>
              <img
                className={styles.nav_icon}
                src="/icons/newspaper.svg"
                alt="home"
              />
            </div>
            <div className={`${styles.nav_item} ${styles.logout} py-3`}>
              <img
                className={styles.nav_icon}
                src="/icons/newspaper.svg"
                alt="home"
              />
            </div>
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
