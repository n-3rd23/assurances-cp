interface Props {
  icon?: any;
  title?: string;
  subtitle?: string;
}

export default function InfoHeading({ icon, title, subtitle }: Props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <img src="" alt="" />
        </div>
        <div className="fw-700 text-interSize midnightBlue col-md-8">
          {title}
          <br />
          <div className="fw-600 text-medium lightSlateGrey">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}
