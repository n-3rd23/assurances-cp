import { Fragment } from "react"
import styles from "./counter_card.module.scss"

interface Props {
    children : JSX.Element;
}

export default function CounterCard({children}:Props) {
    return (
        <Fragment>
            <div className={`bg-white d-flex p-4 shadow-sm justify-space-evenly align-center`}>
                {children}
            </div>
        </Fragment>

    )
}