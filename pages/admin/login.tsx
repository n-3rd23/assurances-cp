import { Fragment } from "react";
import CustomInput from "../../components/custom_input/custom_input";
import Button from "../../components/button/button";
import { auth, event } from "../../firebase/firebase.util";
import { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import { NextSeo } from "next-seo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router: NextRouter = useRouter();

  const getEmail = (event) => {
    setEmail(event.target.value);
  };

  const getPassword = (event) => {
    setPassword(event.target.value);
  };

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Adding to firebase analytics
        event({
          action: "login",
          category: "Auth",
          label: `${email} has logged in`,
        });
        router.replace("/admin");
      })
      .catch((error) => {
        console.log("error while logging in", error);
      });
  };

  return (
    <Fragment>
      <Head>
        <title>Login</title>
      </Head>
      <NextSeo
        nofollow
        noindex
        title="Login"
        description="Login to access dashboard"
        canonical="https://assurances.co.in/admin/login"
        openGraph={{
          type: "website",
          url: "https://assurances.co.in/admin/login",
          title: "Login",
          description: "Login to access dashboard",
        }}
      />
      <div className="container-fluid">
        <div
          style={{ height: "100vh", backgroundColor: "#f1f1f1" }}
          className="row"
        >
          <div className="col-md-6 h-100 d-flex flex-column justify-content-center align-item-center">
            <div className="w-50 mx-auto mb-5">
              <small className="text-larger fw-600 d-block">
                Welcome Back !
              </small>
              <small className="text-muted text-medium fw-600">
                please enter your e-mail and password
              </small>
            </div>
            <div className="w-50 mx-auto">
              <CustomInput
                onChange={getEmail}
                type="email"
                placeholder="e-mail"
                className="w-100 my-2 rounded shadow-sm"
                value={email}
              />
              <CustomInput
                onChange={getPassword}
                type="password"
                placeholder="password"
                className="w-100 my-2 rounded shadow-sm"
                value={password}
              />
              <Button onClick={login} className="w-100 my-2 rounded">
                LOGIN
              </Button>
            </div>
          </div>
          <div className="col-md-6 text-center my-auto">
            <img
              src="/images/assurance_logo-no_bg.png"
              className="img-fluid"
              alt="image"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
