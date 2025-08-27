interface Props {
  tasks: string[];
}

export default function TasksList({ tasks }: Props) {
  return (
    <div>
      <strong>Taches:</strong>
      <ul>
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
