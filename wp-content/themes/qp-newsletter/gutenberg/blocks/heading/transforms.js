import { createBlock } from "@wordpress/blocks";

const transforms = {
  from: [
    {
      type: "block",
      blocks: ["core/paragraph"],
      transform: attributes => {
        console.log("convert paragraph to heading: ", attributes);
        return createBlock("mmd/heading", {
          heading: attributes.content || "",
          headingLevel: 2,
          usePostTitle: false,
        });
      },
    },
    {
      type: "block",
      blocks: ["core/heading"],
      transform: attributes => {
        console.log("convert core heading to mmd heading: ", attributes);
        return createBlock("mmd/heading", {
          heading: attributes.content || "",
          headingLevel: attributes.level || 2,
          usePostTitle: false,
        });
      },
    },
    {
      type: "raw",
      selector: "h1, h2, h3, h4, h5, h6",
      transform: node => {
        const level = parseInt(node.nodeName.replace("H", ""), 10);
        const content = node.textContent;

        return createBlock("mmd/heading", {
          heading: content,
          headingLevel: level,
        });
      },
    },
  ],
  to: [
    {
      type: "block",
      blocks: ["core/paragraph"],
      transform: attributes => {
        console.log("convert heading to paragraph: ", attributes);
        return createBlock("core/paragraph", {
          content: attributes.heading || "",
        });
      },
    },
    {
      type: "block",
      blocks: ["core/list"],
      transform: attributes => {
        console.log("convert heading to list: ", attributes);
        return createBlock("core/list", {
          values: `<li>${attributes.heading || ""}</li>`,
          ordered: false,
        });
      },
    },
  ],
};

export default transforms;
