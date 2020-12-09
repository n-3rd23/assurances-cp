import Layout from "../../components/layout/layout"
import { Fragment } from "react"
import PlanCard from "../../components/plancard/plancard"

export default function Plans() {
    return (
        <Layout title="plans" description="add or remove plans">
            <Fragment>
                <div className="container mt-5 ml-5">
                    <div className="row">
                        <div className="col-md-12">
                            <img style={{width:"30px"}} src="/icons/add.svg" alt="add"/>
                            <span> ADD NEW PLAN</span>
                        </div>
                        <div className="col-md-12 mt-3">
                            <PlanCard>
                                <span>hello</span>
                            </PlanCard>
                            <PlanCard>
                                <span>hello</span>
                            </PlanCard>
                        </div>
                    </div>
                </div>
            </Fragment>
        </Layout>
    );
}