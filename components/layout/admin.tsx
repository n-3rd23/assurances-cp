import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import  Link  from "next/link";
import { Fragment } from "react";
import styles from "./admin.module.scss";
import { useState,useEffect } from "react";
import { auth } from "../../firebase/firebase.util";

interface Props {
  title?: string;
  description: string;
  children: JSX.Element | JSX.Element[];
}

export default function Admin({ title, description, children }: Props,props) {
  let currentUser;
  console.log(props);
  // let unSubscribeFromAuth;
  // const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   unSubscribeFromAuth = auth.onAuthStateChanged(user => {
  //     setCurrentUser(user)
  //   })
    
  //   // component will unmount
  //   return () => {
  //     unSubscribeFromAuth()
  //   }
  // },[])

  const logout = () => {
    auth.signOut()
    .then(() => {
      console.log('signed out');
    })
    .catch((error) => {
      console.log("error while logging out",error)
    })
  }

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
            {
              currentUser 
              ? 
                <div onClick={logout} style={{cursor:"pointer"}} className={`py-3 w-100 text-center mt-auto ${styles.logout}`}>
                  <img className={styles.nav_icon} src="/icons/power.svg" alt="home"/>
                </div>
              : null
            }
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}
