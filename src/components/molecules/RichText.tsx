import type { RichTextBlock } from "@/data/content-types";

export function RichText({ blocks }: { blocks: RichTextBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return <p key={index}>{block.text}</p>;
        }
        if (block.type === "list" || block.type === "orderedList") {
          const List = block.type === "orderedList" ? "ol" : "ul";
          return (
            <List
              key={index}
              className={
                block.variant === "spaced"
                  ? "mt-spacing-md list-disc space-y-1 pl-spacing-md"
                  : "list-disc pl-spacing-md"
              }
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          );
        }
        return <br key={index} />;
      })}
    </>
  );
}