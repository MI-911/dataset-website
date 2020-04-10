import React, { useEffect, useState } from "react";
import blogPost from "../markdown/Building_a_recommender_with_Neo4j.md";
import ReactMarkdown from "react-markdown";

import cypher from "highlightjs-cypher";
import hljs from "highlightjs";

import "../markdown/markdown.scss";
import "highlightjs/styles/a11y-light.css";

hljs.registerLanguage("cypher", cypher);

const addCodeLanguage = (content) => {
  const processed = [];
  const lines = content.split("\n");

  let isCodeBlock = false;

  for (let line of lines) {
    if (/(    )/.test(line)) {
      if (!isCodeBlock) {
        isCodeBlock = true;
        processed.push("```cypher");
      }
    } else {
      if (isCodeBlock) {
        processed.push("```");
      }
      isCodeBlock = false;
    }

    processed.push(line);
  }

  return processed.join("\n");
};

const Blog = () => {
  const [blogContent, setBlogContent] = useState("");

  useEffect(() => {
    hljs.initHighlightingOnLoad();
    const load = async () => {
      const response = await fetch(blogPost);
      let content = await response.text();

      // Cleanup and add Cypher syntax highlighting
      content = content.replace("~~~~", "");
      setBlogContent(addCodeLanguage(content));
    };

    load();
  }, []);

  useEffect(() => {
    // Highlight
    hljs.initHighlightingOnLoad();
  }, [blogContent]);

  return (
    <ReactMarkdown
      className="markdown"
      source={blogContent ?? `# Loading...`}
      renderers={{
        // Giga-hack - hijact the Markdown renderer for codeblocks
        code: (v) => {
          return (
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: hljs.highlight(v.language, v.value).value,
                }}
              />
            </pre>
          );
        },
      }}
    />
  );
};

export default Blog;
