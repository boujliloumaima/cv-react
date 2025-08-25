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
        <p>
          <strong>Début:</strong> {institut.startDate.toLocaleDateString()}
        </p>
        <p>
          <strong>Fin:</strong> {institut.endDate.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
