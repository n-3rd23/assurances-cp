import { Fragment } from "react";
import styles from "./plancard.module.scss";
import { notification, Button } from "antd";

interface Props {
  children?: JSX.Element;
  cardTitle?: string;
  clientNumber?: number;
  description?: string;
  onDelClick?: (id) => void;
  onEditClick?: (id) => void;
  id?: string;
  isEdit?: boolean;
  isDelete?: boolean;
}

export default function PlanCard({
  cardTitle,
  description,
  onDelClick,
  onEditClick,
  id,
  isEdit = true,
  isDelete = true,
}: Props) {
  const handleEditClick = () => {
    onEditClick(id);
  };

  const handleDelClick = () => {
    const key = `open${Date.now()}`;

    // confirem button
    const btn = (
      <Button
        type="primary"
        danger
        size="small"
        onClick={() => {
          onDelClick(id);
          notification.close(key);
        }}
      >
        Confirm
      </Button>
    );

    notification["warning"]({
      message: "Are you sure you want to delete?",
      description: "",
      btn,
      key,
    });
  };

  return (
    <Fragment>
      <div className="container-fluid my-2">
        <div className="row">
          <div
            className={`${styles.card_body} p-3 col-md-12 shadow-sm bg-white rounded`}
          >
            <div className="row align-items-center pl-5">
              <div className="col-md-6">
                <span>{cardTitle}</span>
                <small className="text-muted d-block">
                  {description.substring(0, 150)}...
                </small>
              </div>
              <div className="col-md-3 text-center"></div>
              <div className="col-md-3 text-center">
                {isEdit ? (
                  <img
                    style={{ width: "25px", cursor: "pointer" }}
                    className="mx-2"
                    src="/icons/edit.svg"
                    alt="edit"
                    onClick={handleEditClick}
                  />
                ) : null}
                {isDelete ? (
                  <img
                    style={{ width: "25px", cursor: "pointer" }}
                    src="/icons/trash_red.svg"
                    alt="delete"
                    onClick={handleDelClick}
                    className="mx-2"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
