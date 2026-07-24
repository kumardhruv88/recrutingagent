"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none break-words
      prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
      prose-headings:font-semibold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
      prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
      prose-ul:my-2 prose-li:my-0.5
      prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-indigo-50 dark:prose-code:bg-indigo-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
      prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean; node?: unknown }) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children, className, inline, node: _node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match && !className?.includes("language-");
            
            if (isInline) {
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            }

            const codeString = String(children).replace(/\n$/, "");
            const language = match ? match[1] : "text";

            return (
              <div className="relative group my-4 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{language}</span>
                  <button
                    onClick={() => handleCopy(codeString)}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                    aria-label="Copy code"
                  >
                    {copiedText === codeString ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto text-sm">
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-sm text-left m-0">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return <th className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800">{children}</th>;
          },
          td({ children }) {
            return <td className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-0">{children}</td>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
