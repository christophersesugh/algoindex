import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export function CodeBlock({ node, inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      children={String(children).replace(/\n$/, "")}
      style={atomOneDarkReasonable}
      showLineNumbers
      language={match[1]}
      PreTag="div"
    />
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  );
}

export function H1({ node, children, ...props }) {
  return (
    <h1 className="text-3xl my-2 capitalize" {...props}>
      {children}
    </h1>
  );
}
export function H2({ node, children, ...props }) {
  return (
    <h2 className="text-2xl my-2 capitalize" {...props}>
      {children}
    </h2>
  );
}
export function H3({ node, children, ...props }) {
  return (
    <h3 className="text-xl my-2 capitalize" {...props}>
      {children}
    </h3>
  );
}

export function H4({ node, children, ...props }) {
  return (
    <h4 className="text-lg my-2 capitalize" {...props}>
      {children}
    </h4>
  );
}

export function P({ node, children, ...props }) {
  return (
    <p className="my-2" {...props}>
      {children}
    </p>
  );
}
export function UL({ node, children, ...props }) {
  return (
    <ul className="my-2 list-disc" {...props}>
      {children}
    </ul>
  );
}

export function OL({ node, children, ...props }) {
  return (
    <ol className="my-2 list-decimal" {...props}>
      {children}
    </ol>
  );
}

export function BlockQuote({ node, children, ...props }) {
  return (
    <blockquote
      className="bg-blue-100 border-l-8 border-blue-500 p-2 my-4 rounded-md"
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function Markdown({ source }) {
  return (
    <ReactMarkdown
      children={source}
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        p: P,
        code: CodeBlock,
        blockquote: BlockQuote,
      }}
    />
  );
}
