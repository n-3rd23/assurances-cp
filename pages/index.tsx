import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import Bar from "../components/bar/bar";
import Home_Features from "../components/home_features/home_features";

export default function Home() {
  return (
    <Layout title="Assurances" description="Best Life Insurance ever">
      <Hero />
      <Bar />
      <Home_Features />
    </Layout>
  );
}
