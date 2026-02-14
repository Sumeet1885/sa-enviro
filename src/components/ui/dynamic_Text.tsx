import Text from "@/components/ui/Used/Text";
import List from "@/components/ui/Used/List";
import { PageDescriptionBlock, Product } from "@/constants/type";

const Extra_Text_Section = ({
  extraContent,
}: {
  extraContent: PageDescriptionBlock[];
}) => {
  return (
    <>
      {/* Extra Content Section */}
      {extraContent.map((block, index) => {
        if (block.type === "p") {
          return (
            <Text key={index} variant="body" size="lg" weight="normal">
              {block.content}
            </Text>
          );
        } else if (block.type === "subtitle") {
          return (
            <Text key={index} variant="subtitle" size="xl" weight="bold">
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
                  <span className="font-medium text-gray-900">{item.key}:</span>
                  <span className="text-gray-600">{item.value}</span>
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
