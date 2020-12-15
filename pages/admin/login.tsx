import { Fragment } from "react";
import CustomInput from "../../components/custom_input/custom_input";
import Button from "../../components/button/button";
import Link from "next/link";
import { auth } from "../../firebase/firebase.util";
import { useState } from "react";

export default function Login(props) {
  
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const getEmail = (event) => {
      setEmail(event.target.value)
   }

   const getPassword = (event) => {
      setPassword(event.target.value)
   }

   const login = () => {
      auth.signInWithEmailAndPassword(email,password)
      .then((user) => {
         console.log(user)
      })
      .catch((error) => {
         console.log("error while logging in", error)
      })
   }

   return (
      <Fragment>
         <div className="container-fluid">
            <div style={{height:"100vh", backgroundColor:"#f1f1f1"}} className="row">
               <div className="col-md-6 h-100 d-flex flex-column justify-content-center align-item-center">
                  <div className="w-50 mx-auto mb-5">
                     <small className="text-larger fw-600 d-block">Welcome Back !</small>
                     <small className="text-muted text-medium fw-600">please enter your e-mail and password</small>
                  </div>
                  <div className="w-50 mx-auto">
                     <CustomInput onChange={getEmail} type="text" placeholder="e-mail" className="w-100 my-2 rounded shadow-sm"/>
                     <CustomInput onChange={getPassword} type="password" placeholder="password" className="w-100 my-2 rounded shadow-sm"/>
                     <Button onClick={login} className="w-100 my-2 rounded">LOGIN</Button>
                  </div>
                  <div className="text-center mt-5">
                     <Link href="#">
                        <a>forgot password ?</a>
                     </Link> 
                  </div>
               </div>
               <div className="col-md-6 text-center my-auto">
                  <img src="/images/assurance_logo-no_bg.png" className="img-fluid" alt="image"/>
               </div>
            </div>
         </div>
      </Fragment>
   )   
}