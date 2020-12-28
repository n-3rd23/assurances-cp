import styles from "./aboutUsPlanCard.module.scss";
import { useRouter } from "next/router";
import Arrow from "../../public/icons/arrow.svg";
import kebabCase from "lodash/kebabCase";

export default function aboutUsPlanCard({ subHead, mainHead }) {
  const router = useRouter();
  return (
    <div className={`container p-4 my-2 ${styles.containerStyle}`}>
      <div className="d-flex">
        <div className="p-2"></div>
        <div className="p-2 text-start flex-grow-1">
          <a className="text-medium">{subHead}</a>
          <br />
          <a className="fw-700">{mainHead}</a>
        </div>
        <div className={`p-2`}>
          <button
            className={`border-0 mt-1 ${styles.arrowStyle}`}
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
            <Arrow
              className={`${styles.arrowStyle} m-2`}
              style={{ background: "white" }}
              width={30}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
