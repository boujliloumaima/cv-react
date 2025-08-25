interface Props {
  tools: string[];
}

export default function ToolsList({ tools }: Props) {
  return (
    <div>
      <strong>Tools:</strong>
      <ul>
        {tools.map((tool, idx) => (
          <li key={idx}>{tool}</li>
        ))}
      </ul>
    </div>
  );
}
