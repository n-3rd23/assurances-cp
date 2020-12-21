import Layout from "../../components/layout/layout";
import DetailsCard from "./../../components/detailsCard/detailsCard";

export default function Insurance() {
  return (
    <Layout title="Assurances" description="Best Life Insurance ever">
      <div className="d-flex flex-wrap justify-content-center">
        <DetailsCard subHead1="TERM" mainHead="15 - 30" subHead2="YEARS" />
        <DetailsCard subHead1="TERM" mainHead="15 - 30" subHead2="YEARS" />
        <DetailsCard subHead1="TERM" mainHead="15 - 30" subHead2="YEARS" />
      </div>
      <div className="container">
        <p className="mt-5 fw-700" style={{ color: "#5a6371" }}>
          SUMMARY
        </p>
        <p>test</p>
      </div>
    </Layout>
  );
}
