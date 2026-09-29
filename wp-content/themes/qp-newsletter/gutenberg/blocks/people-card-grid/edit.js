import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useHasSelectedInnerBlock } from "@10up/block-components";
import { useDispatch } from "@wordpress/data";
import { GridColumns, Preview } from "@marameodesign/components";
import { twMerge } from "tailwind-merge";
import Inspector from "./inspector";
import "./editor.scss";

const getGridClass = cols => {
  switch (cols) {
    case "lg:cols-3":
    case 3:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    case "lg:cols-4":
    case 4:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";
    case "lg:cols-2":
    case 2:
    default:
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6";
  }
};

export const Edit = props => {
  const { clientId } = props;
  const { columns = "lg:cols-2" } = GridColumns.get(props);
  const { preview } = Preview.get(props);
  const { selectBlock } = useDispatch("core/block-editor");

  const colsNumber =
    typeof columns === "string" ? columns.replace("lg:cols-", "") : columns;

  const hasSelectedInnerBlock = useHasSelectedInnerBlock();
  const isActive = props.isSelected || hasSelectedInnerBlock;

  const blockProps = useBlockProps({
    className: twMerge("mmd-people-card-grid w-full", getGridClass(columns)),
    style: {
      "--grid-cols": colsNumber,
    },
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  return (
    <>
      <Inspector {...props} />
      <div {...blockProps}>
        {isActive && (
          <div
            className="mmd-people-card-grid__admin-bar col-span-full mb-3 flex items-center justify-between bg-blue-50 border border-blue-200 text-blue-900 rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              selectBlock(clientId);
            }}
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="dashicons dashicons-grid-view"></span>
              People Card Grid ({colsNumber} Columns)
            </span>
            <button
              type="button"
              className="text-xs text-blue-700 font-semibold underline hover:text-blue-900 cursor-pointer bg-transparent border-0 p-0"
              onClick={e => {
                e.stopPropagation();
                selectBlock(clientId);
              }}
            >
              Select Grid to change columns &rarr;
            </button>
          </div>
        )}

        <InnerBlocks
          template={[
            [
              "mmd/people-card-item",
              {
                heading: "Prof Robyn Norton AO",
                textRole: "Founding Director",
                textOrg: "The George Institute for Global Health; UNSW",
              },
            ],
            [
              "mmd/people-card-item",
              {
                heading: "Prof Bronwyn Graham",
                textRole: "Centre Director",
                textOrg:
                  "The George Institute for Global Health; and UNSW Faculty of Science",
                hideImage: true,
              },
            ],
          ]}
          allowedBlocks={["mmd/people-card-item"]}
          renderAppender={isActive && InnerBlocks.ButtonBlockAppender}
          orientation="horizontal"
        />
      </div>
    </>
  );
};
