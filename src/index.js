// import React from "react";
// import ReactDOM from "react-dom";

const MyReact = {
  createElement,
  render,
};

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === "object") {
          return child;
        }
        return createTextElement(child);
      }),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  Object.keys(element.props)
    .filter((k) => (k !== "children" ? true : false))
    .forEach((propName) => (dom[propName] = element.props[propName]));

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

/** @jsx MyReact.createElement */
const element = (
  <div style="background: orange; color:white;">
    <h1 title="web dev made simple">Hello World</h1>
  </div>
);
const root = document.getElementById("root");
MyReact.render(element, root);
