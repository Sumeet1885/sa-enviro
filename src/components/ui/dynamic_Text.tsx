import Text from "@/components/ui/Text";
import List from "@/components/ui/List";
import { PageDescriptionBlock} from "@/constants/type";

const Extra_Text_Section = ({
  extraContent,
}: {
  extraContent: PageDescriptionBlock[];
}) => {
  return (
    <>
      {extraContent.map((block, index) => {
        if (block.type === "p") {
          return (
            <Text
              key={index}
              variant="body"
              size="sm"
              weight="normal"
              className="mb-4 leading-relaxed"
              as={"p"}
            >
              {block.content}
            </Text>
          );
        } else if (block.type === "subtitle") {
          return (
            <Text
              key={index}
              variant="subtitle"
              size="lg"
              weight="bold"
              as={"h4"}
            >
              {block.content}
            </Text>
          );
        } else if (block.type === "list") {
          return (
            <List
              key={index}
              items={block.items}
              ordered={block.style === "bullet" ? false : true}
            />
          );
        } else if (block.type === "keyValue") {
          return (
            <div key={index} className="space-y-2">
              {block.items.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-sm">{item.key}:</span>
                  <span className="text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          );
        }
      })}
    </>
  );
};

export default Extra_Text_Section;
