interface ListProps {
  items: string[];
}

export default function List({ items }: ListProps) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
