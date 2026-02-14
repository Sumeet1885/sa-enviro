import clsx from "clsx";

interface ListProps {
  items: string[];
  ordered?: boolean;
}

const baseStyles = "pl-6 space-y-2 text-muted-foreground";

export default function List({ items, ordered = false }: ListProps) {
  return (
    <>
      {ordered ? (
        <ol className={clsx(baseStyles, "list-decimal")}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className={clsx(baseStyles, "list-disc")}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}
