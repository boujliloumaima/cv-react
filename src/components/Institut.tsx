import { Institut } from "../models";

interface Props {
  institut: Institut;
}

export default function InstitutItem({ institut }: Props) {
  return (
    <div>
      <p className="institu-description">
        {institut.name} - {institut.city}
      </p>
    </div>
  );
}
