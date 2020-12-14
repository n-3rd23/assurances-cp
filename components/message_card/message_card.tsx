import { Fragment } from "react"

interface Props {
   title : string;
   title2: string;
   description : string;
}

export default function MessageCard({title, title2, description} : Props) {
   return (
      <Fragment>
         <div className="shadow-sm p-3 bg-white mt-1">
            <div className="row">
               <div className="col-md-3">
                  <small className="text-medium fw-600">{title}</small>
               </div>
               <div className="col-md-3">
                  <small style={{backgroundColor:"#E7ECEF"}} className="p-1 fw-500 text-medium">{title2}</small>
               </div>
               <div className="col-md-6">
                  <small className="text-muted text-medium fw-500">{description}</small>
               </div>
            </div>
         </div>
      </Fragment>
   )
}