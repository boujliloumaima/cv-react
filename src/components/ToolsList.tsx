interface Props {
  tools: string[];
}

export default function ToolsList({ tools }: Props) {
  return (
    <div>
      <strong>Téchologies: </strong>

      {tools.join(" , ")}
    </div>
  );
}
