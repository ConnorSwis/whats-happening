import Markdown from "react-markdown";

export default function MarkdownRender({ text }: { text: string }) {
  return (
    <Markdown className="p-3 [&>h1]:text-3xl [&>h1]:font-semibold [&>h2]:text-xl [&>h2]:font-semibold">
      {text}
    </Markdown>
  );
}
