function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  const blocks = content
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-8 space-y-7 text-slate-700">
      {blocks.map((block, index) => {
        if (block === "---") {
          return <hr className="border-slate-200" key={index} />;
        }

        if (block.startsWith("# ")) {
          return (
            <h1
              className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl"
              key={index}
            >
              {renderInlineMarkdown(block.slice(2))}
            </h1>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 className="pt-3 text-2xl font-black text-slate-950" key={index}>
              {renderInlineMarkdown(block.slice(3))}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3 className="text-xl font-black text-slate-950" key={index}>
              {renderInlineMarkdown(block.slice(4))}
            </h3>
          );
        }

        if (block.startsWith("- ")) {
          return (
            <ul className="ml-5 list-disc space-y-2 leading-7" key={index}>
              {block.split("\n").map((item) => (
                <li key={item}>{renderInlineMarkdown(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p className="leading-8" key={index}>
            {block.split("\n").map((line, lineIndex) => (
              <span key={`${line}-${lineIndex}`}>
                {lineIndex > 0 ? <br /> : null}
                {renderInlineMarkdown(line)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
