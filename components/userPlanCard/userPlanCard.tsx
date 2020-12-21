import styles from "./userPlanCard.module.scss";
import { useRouter } from "next/router";
const kebabCase = require("lodash/kebabCase");

export default function UserPlanCard({ subHead1, mainHead, subHead2 }) {
  const router = useRouter();
  return (
    <div className={`container ${styles.containerStyle} `}>
      <p
        className="px-5 pt-5 text-interSize fw-500"
        style={{ color: "#69848c" }}
      >
        {subHead1}
      </p>
      <p className="px-5 text-larger fw-700" style={{ marginTop: "-20px" }}>
        {mainHead}
      </p>
      <p className="px-5 text-medium" style={{ color: " #8D99AE" }}>
        {subHead2}
      </p>
      <button
        onClick={() =>
          router.push("/insurance/[slug]", `/insurance/${kebabCase(mainHead)}`)
        }
      >
        more
      </button>
    </div>
  );
}
