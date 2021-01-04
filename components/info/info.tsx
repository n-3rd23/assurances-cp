import { createElement, ReactNode } from "react";

interface Props {
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
  className?: string;
  titleAs?: "h6" | "a";
  titleAsProps?: object | null;
}

interface TitleProps {
  element: string;
  props: object | null;
  children: ReactNode;
}

function RenderTitle({ element, props, children }: TitleProps) {
  return createElement(element, props, children);
}

export default function Info({
  icon,
  title,
  subtitle,
  className,
  titleAs = "h6",
  titleAsProps = null,
}: Props) {
  return (
    <div
      className={
        className
          ? `d-flex flex-row bd-highlight align-items-center ${className}`
          : "d-flex flex-row bd-highlight align-items-center"
      }
    >
      {icon ? <div className="p-2 bd-highlight">{icon}</div> : ""}
      <div className="p-2 bd-highlight">
        <RenderTitle
          element={titleAs}
          props={
            titleAsProps
              ? {
                  className: "mb-0 fw-700 text-primary text-interSize",
                  ...titleAsProps,
                }
              : { className: "mb-0 fw-700 text-primary text-interSize" }
          }
        >
          {title}
        </RenderTitle>
        <small className="text-light fw-600 d-block text-small">
          {subtitle}
        </small>
      </div>
    </div>
  );
}
