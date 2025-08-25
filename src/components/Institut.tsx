import { Institut } from "../models";

interface Props {
  institut: Institut;
}

export default function InstitutItem({ institut }: Props) {
  return (
    <div>
      <h2>{institut.name}</h2>
      <p>{institut.description}</p>

      <div>
        <p>
          <strong>Ville:</strong> {institut.city}
        </p>
      </div>
    </div>
  );
}
