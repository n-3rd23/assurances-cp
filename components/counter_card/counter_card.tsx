import { Fragment } from "react";

interface Props {
  children: JSX.Element;
}

export default function CounterCard({ children }: Props) {
  return (
    <Fragment>
      <div
        className={`bg-white d-flex p-4 shadow-sm justify-content-evenly align-items-center`}
      >
        {children}
      </div>
    </Fragment>
  );
}
