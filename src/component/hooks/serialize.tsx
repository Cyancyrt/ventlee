import React, { Fragment } from "react";
import { Text } from "slate";
import escapeHTML from "escape-html";

function TextSerial(nodes) {
  if (!Array.isArray(nodes)) return null; // Pastikan nodes adalah array

  return nodes.map((node, index) => {
    if (!node) return null;

    // Jika node adalah teks (tidak memiliki `type`, hanya teks langsung)
    if (Text.isText(node)) {
      let content = (
        <span
          dangerouslySetInnerHTML={{
            __html: escapeHTML(node.text),
          }}
        />
      );

      if (node.bold) content = <strong key={index}>{content}</strong>;
      if (node.italic) content = <em key={index}>{content}</em>;
      if (node.code) content = <code key={index}>{content}</code>;
      if (node.highlight) {
        content = (
          <mark key={index} style={{ backgroundColor: "yellow" }}>
            {content}
          </mark>
        );
      }

      return <Fragment key={index}>{content}</Fragment>;
    }

    // Jika node adalah elemen dengan `type`
    switch (node.type) {
      case "h1":
        return <h1 key={index}>{TextSerial(node.children)}</h1>;
      case "h2":
        return <h2 key={index}>{TextSerial(node.children)}</h2>;
      case "h3":
        return <h3 key={index}>{TextSerial(node.children)}</h3>;
      case "h4":
        return <h4 key={index}>{TextSerial(node.children)}</h4>;
      case "h5":
        return <h5 key={index}>{TextSerial(node.children)}</h5>;
      case "h6":
        return <h6 key={index}>{TextSerial(node.children)}</h6>;
      case "blockquote":
        return <blockquote key={index}>{TextSerial(node.children)}</blockquote>;
      case "ul":
        return <ul key={index}>{TextSerial(node.children)}</ul>;
      case "ol":
        return <ol key={index}>{TextSerial(node.children)}</ol>;
      case "li":
        return <li key={index}>{TextSerial(node.children)}</li>;
      case "link":
        return (
          <a href={escapeHTML(node.url)} key={index}>
            {TextSerial(node.children)}
          </a>
        );
      default:
        return <p key={index}>{TextSerial(node.children)}</p>;
    }
  });
}

export default TextSerial;
