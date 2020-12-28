import styles from "./userPlanCard.module.scss";
import { useRouter } from "next/router";
import Plus from "../../public/icons/plus.svg";
import Arrow from "../../public/icons/arrow.svg";
import kebabCase from "lodash/kebabCase";

export default function UserPlanCard({ subHead1, mainHead, subHead2 }) {
  console.log(mainHead);
  const router = useRouter();
  return (
    <div className={`container ${styles.containerStyle} p-2`}>
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
        {subHead2}
      </p>
      <div className="d-flex w-100 justify-content-end mt-5">
        <button
          className="border-0"
          onClick={() =>
            router.push(
              {
                pathname: "/insurance/[slug]",
                query: { title: mainHead },
              },
              `/insurance/${kebabCase(mainHead)}`
            )
          }
        >
          <Arrow width={30} height={20} />
        </button>
      </div>
    </div>
  );
}
