import { Institut } from "../models";

interface Props {
  institut: Institut;
}

export default function InstitutItem({ institut }: Props) {
  return (
    <div>
      <h2>
        {institut.name} - {institut.city}
      </h2>
      <p>{institut.description}</p>
    </div>
  );
}
