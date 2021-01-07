import styles from "./userPlanCard.module.scss";
import { NextRouter, useRouter } from "next/router";
import Plus from "../../public/icons/plus.svg";
import Arrow from "../../public/icons/arrow.svg";
import kebabCase from "lodash/kebabCase";
import truncate from "lodash/truncate";

export default function UserPlanCard({ subHead1, mainHead, subHead2 }) {
  const router: NextRouter = useRouter();
  return (
    <div className={`container ${styles.containerStyle} p-1`}>
      <div className="p-2 ">
        <Plus height={24} width={24} />
      </div>
      <p
        className="px-4 pt-5 text-interSize fw-500"
        style={{ color: "#69848c" }}
      >
        {subHead1}
      </p>
      <p className="px-4 text-larger fw-700" style={{ marginTop: "-20px" }}>
        {mainHead}
      </p>
      <p className="px-4 text-medium" style={{ color: " #8D99AE" }}>
        {truncate(subHead2, {
          length: 150,
        })}
      </p>
      <div className="d-flex w-100 justify-content-end mt-5 p-3">
        <button
          className="border-0"
          onClick={() =>
            router.push(
              {
                pathname: "/services/[slug]",
                query: { title: mainHead },
              },
              `/services/${kebabCase(mainHead)}`
            )
          }
        >
          <Arrow width={30} height={20} />
        </button>
      </div>
    </div>
  );
}
