import Admin from "../../components/layout/admin";
import { firestore } from "../../firebase/firebase.util";
 
export default function Dashboard() {
  return (
    <Admin title="dashboard" description="dashboard page of admin">
      <div className="col-md-12">dashboard</div>
    </Admin>
  );
}
