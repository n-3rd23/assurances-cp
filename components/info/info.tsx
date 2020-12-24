interface Props {
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function Info({ icon, title, subtitle, className }: Props) {
  return (
    <div
      className={
        className
          ? `d-flex flex-row bd-highlight ${className}`
          : "d-flex flex-row bd-highlight"
      }
    >
      {icon ? <div className="p-2 bd-highlight">{icon}</div> : ""}
      <div className="p-2 bd-highlight">
        <h6 className="mb-0 fw-700 text-primary text-interSize">{title}</h6>
        <small className="text-light fw-600 d-block text-small">
          {subtitle}
        </small>
      </div>
    </div>
  );
}
