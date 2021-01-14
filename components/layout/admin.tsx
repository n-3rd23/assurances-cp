import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import { Fragment, useContext, useEffect } from "react";
import styles from "./admin.module.scss";
import { auth, createUserProfileDocument } from "../../firebase/firebase.util";
import { AuthContext } from "../../context/AuthContext";
import PieChart from "../../public/icons/pie-chart.svg";
import Head from "next/head";
import BarChart from "../../public/icons/bar-chart.svg";
import Gallery from "../../public/icons/images-solid.svg";

interface Props {
  title?: string;
  description: string;
  children: JSX.Element | JSX.Element[];
}

export default function Admin({ title, description, children }: Props) {
  let unsubscribeFromAuth;
  const router: NextRouter = useRouter();

  const { setAuthState, authState, logout } = useContext(AuthContext);
  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setAuthState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setAuthState({
          userAuth,
        });
        router.replace("/admin/login");
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

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
      <Head>
        <script src="https://apis.google.com/js/client:platform.js"></script>
      </Head>
      {/* sidebar begins */}
      <div className="container-fluid bg-light">
        <div className="row">
          <div className={`${styles.side_bar} p-0`}>
            <Link href="/admin">
              <a className={`${styles.home} py-3 w-100 text-center`}>
                <img
                  className={styles.nav_icon}
                  src="/icons/home.svg"
                  alt="home"
                />
              </a>
            </Link>
            <Link href="/admin/messages">
              <a className={`py-3 w-100 text-center`}>
                {router.pathname == "/admin/messages" ? (
                  <img
                    className={styles.nav_icon}
                    src="/icons/message_active.svg"
                    alt="home"
                  />
                ) : (
                  <img
                    className={styles.nav_icon}
                    src="/icons/message.svg"
                    alt="home"
                  />
                )}
              </a>
            </Link>
            <Link href="/admin/plans">
              <a className={`py-3 w-100 text-center`}>
                {router.pathname == "/admin/plans" ? (
                  <img
                    className={styles.nav_icon}
                    src="/icons/newspaper_active.svg"
                    alt="home"
                  />
                ) : (
                  <img
                    className={styles.nav_icon}
                    src="/icons/newspaper.svg"
                    alt="home"
                  />
                )}
              </a>
            </Link>
            <Link href="/admin/category">
              <a className={`py-3 w-100 text-center`}>
                {router.pathname == "/admin/category" ? (
                  <PieChart
                    style={{ fill: "#fff" }}
                    className={styles.nav_icon}
                  />
                ) : (
                  <PieChart
                    style={{ fill: "#5A6371" }}
                    className={styles.nav_icon}
                  />
                )}
              </a>
            </Link>
            <Link href="/admin/forms">
              <a className={`py-3 w-100 text-center`}>
                {router.pathname == "/admin/forms" ? (
                  <BarChart
                    style={{ fill: "#fff", color: "#fff" }}
                    className={styles.nav_icon}
                  />
                ) : (
                  <BarChart
                    style={{ fill: "#5A6371" }}
                    className={styles.nav_icon}
                  />
                )}
              </a>
            </Link>
            <Link href="/admin/gallery">
              <a className={`py-3 w-100 text-center`}>
                {router.pathname == "/admin/gallery" ? (
                  <Gallery
                    style={{ fill: "#fff", color: "#fff" }}
                    className={styles.nav_icon}
                  />
                ) : (
                  <Gallery
                    style={{ fill: "#5A6371", color:"#5A6371" }}
                    className={styles.nav_icon}
                  />
                )}
              </a>
            </Link>
            {authState && authState.currentUser ? (
              <div
                onClick={logout}
                style={{ cursor: "pointer" }}
                className={`py-3 w-100 text-center mt-auto ${styles.logout}`}
              >
                <img
                  className={styles.nav_icon}
                  src="/icons/power.svg"
                  alt="home"
                />
              </div>
            ) : null}
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
