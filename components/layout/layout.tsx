// sidebar bg -> background -> : #313541;
// sidebar active_home background -> : #E95656;
// sidebar icon_not active  -> background -> : #5A6371;


import { NextSeo } from "next-seo";
import { NextRouter } from "next/dist/client/router";
import { useRouter } from "next/router";
import { Fragment } from "react";
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
      <div className="container-fluid">
       <div className="row">
          <div className={`${styles.side_bar}`} >
            <div className={`${styles.nav_item} ${styles.home} py-3`}>
              <img className={styles.nav_icon} src="/icons/home.svg" alt="home"/>
            </div>
            <div className={`${styles.nav_item} py-3`}>
              <img className={styles.nav_icon} src="/icons/bar-chart.svg" alt="home"/>
            </div>
            <div className={`${styles.nav_item} py-3`}>
              <img className={styles.nav_icon} src="/icons/phone.svg" alt="home"/>
            </div>
            <div className={`${styles.nav_item} py-3`}>
              <img className={styles.nav_icon} src="/icons/newspaper.svg" alt="home"/>
            </div>
            <div className={`${styles.nav_item} ${styles.logout} py-3`}>
              <img className={styles.nav_icon} src="/icons/newspaper.svg" alt="home"/>
            </div>
          </div>
          <div className="col">
            {children}
          </div>
       </div>
      </div>
    </Fragment>
  );
}
