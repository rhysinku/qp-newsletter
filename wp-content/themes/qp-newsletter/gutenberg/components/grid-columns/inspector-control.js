import { CheckboxControl } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { useMemo } from "@wordpress/element";
import { twMerge } from "tailwind-merge";

import get from "./get";

/**
 * option icons
 */
import oneCol from "./images/1-col.svg";
import twoCols from "./images/2-cols.svg";
import threeCols from "./images/3-cols.svg";
import fourCols from "./images/4-cols.svg";
import fiveCols from "./images/5-cols.svg";
import sixCols from "./images/6-cols.svg";
import fortySixtyCols from "./images/40-60.svg";
import sixtyFortyCols from "./images/60-40.svg";
import thirtySeventyCols from "./images/30-70.svg";
import seventyThirtyCols from "./images/70-30.svg";
import twentyEightyCols from "./images/20-80.svg";
import eightyTwentyCols from "./images/80-20.svg";

export const layoutOptions = [
  { key: "lg:cols-1", label: "1 Column", image: oneCol },
  { key: "lg:cols-2", label: "2 Columns", image: twoCols },
  { key: "lg:cols-3", label: "3 Columns", image: threeCols },
  { key: "lg:cols-4", label: "4 Columns", image: fourCols },
  { key: "lg:cols-5", label: "5 Columns", image: fiveCols },
  { key: "lg:cols-6", label: "6 Columns", image: sixCols },
  { key: "lg:cols-40-60", label: "40-60 Columns", image: fortySixtyCols },
  { key: "lg:cols-60-40", label: "60-40 Columns", image: sixtyFortyCols },
  { key: "lg:cols-30-70", label: "30-70 Columns", image: thirtySeventyCols },
  { key: "lg:cols-70-30", label: "70-30 Columns", image: seventyThirtyCols },
  { key: "lg:cols-20-80", label: "20-80 Columns", image: twentyEightyCols },
  { key: "lg:cols-80-20", label: "80-20 Columns", image: eightyTwentyCols },
];

export function InspectorControl(props) {
  const {
    setAttributes,
    choices = ["1 Column", "2 Columns", "3 Columns", "4 Columns"],
    enableCenterGridItems = false,
    title = 'Columns',
    __hasSpacingBottom = false,
  } = props;
  const { columns, centerGridItems } = get(props);

  // Filter layoutOptions based on choices
  const filteredLayoutOptions = useMemo(() => {
    return choices === "all"
      ? layoutOptions
      : layoutOptions.filter(option => choices.includes(option.label));
  }, [choices]);

  return (
    <>
      <div className="mmd-editor-label">{title}</div>
      <div className="mmd-grid-columns">
        {filteredLayoutOptions.map(option => (
          <div key={option.key} className="mmd-grid-option">
            <button
              className={twMerge(
                "mmd-grid-option-button",
                columns === option.key ? "is-selected" : ""
              )}
              onClick={() => {
                setAttributes({
                  columns: option.key,
                });
              }}
              title={option.label}
            >
              <img
                src={option.image}
                alt={option.label}
                decoding="async"
                loading="lazy"
                width="64"
                height="20"
              />
            </button>
          </div>
        ))}
      </div>
      {__hasSpacingBottom && <br />}
      
      {/* {enableCenterGridItems && <CheckboxControl
        label="Center Grid Items"
        checked={centerGridItems}
        onChange={(value) => setAttributes({ centerGridItems: value })}
      />} */}
    </>
  );
}


export function watchParentAttributes(props) {
  const { attributes, setAttributes, context } = props;

  const parentColumns = context["mmd/gridColumns"];
  useEffect(() => {
    if (parentColumns !== undefined && parentColumns !== attributes.columns) {
      setAttributes({ columns: parentColumns });
    }
  }, [
    parentColumns,
    attributes,
    setAttributes,
  ]);
}
