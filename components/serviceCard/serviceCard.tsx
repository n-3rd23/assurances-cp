import styles from "./serviceCard.module.scss";
import DOMPurify from "dompurify";
import Link from "next/link";

export default function ServiceCard({ img, title, desc }) {
  return (
    <Link
      href={{
        pathname: "/services",
        query: { category: title },
      }}
    >
      <a>
        <div
          className={`container ${styles.containerStyle}  text-center p-4`}
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${img}) `,
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            className={`mt-5 text-large text-white fw-800 ${styles.titleStyle}`}
          >
            {title}
          </div>
          <div
            className={`mt-1 text-small text-white py-md-2  ${styles.subTitleStyle}`}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }}
          ></div>
        </div>
      </a>
    </Link>
  );
}
