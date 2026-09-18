import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import {
  Media,
  Heading,
  BackgroundColor,
  ContentPosition,
  GridColumns,
} from "@marameodesign/components";
import { twMerge } from "tailwind-merge";

import "./style.scss";

export const Save = props => {
  const { bgColor, blockTheme } = BackgroundColor.get(props);
  const { columns } = GridColumns.get(props);
  const { contentPosition } = ContentPosition.get(props);

  const blockProps = useBlockProps.save({
    className: `mmd-content-media mmd-spacing mmd-spacing-md mmd-padding-y ${bgColor} ${blockTheme} ${ContentPosition.className(
      props
    )}`,
  });

  return (
    <>
      {columns === "lg:cols-1" ? (
        <section {...blockProps} data-columns={columns}>
          <div className="mmd-content-media__inner-wrapper">
            <div className="flex flex-col justify-start items-stretch mb-6">
              <Heading.Content
                {...props}
                preHeadingClassName="mmd-subheading"
              />
            </div>
            <div className="mmd-content">
              <div
                className={twMerge(
                  "mmd-content-media__media mb-4",
                  contentPosition === "mod--variant--media-right"
                    ? "md:float-right md:ml-2"
                    : "md:float-left md:mr-2"
                )}
              >
                <Media.Content
                  {...props}
                  wrapperClassName="mmd-content-media__media-wrapper"
                  ratioWrapperClassName="is-ratio-image ratio-3-2 w-full"
                  className="w-full h-auto object-cover block"
                  captionClassName="mmd-figcaption"
                />
              </div>
              <InnerBlocks.Content />
            </div>
          </div>
        </section>
      ) : (
        <section {...blockProps} data-columns={columns}>
          <div className="mmd-content-media__inner-wrapper">
            {contentPosition === "mod--variant--media-right" && (
              <div className="mmd-content-media__content lg:col-span-1">
                <div className="mmd-content-media__content-inner">
                  <div className="flex flex-col justify-start items-stretch not-last:mb-2">
                    <Heading.Content
                      {...props}
                      preHeadingClassName="mmd-subheading"
                    />
                  </div>
                  <div className="mmd-content">
                    <InnerBlocks.Content />
                  </div>
                </div>
              </div>
            )}

            <div className="mmd-content-media__media lg:col-span-1">
              <Media.Content
                {...props}
                wrapperClassName="mmd-content-media__media-wrapper"
                ratioWrapperClassName="is-ratio-image ratio-3-2 w-full"
                className="w-full h-auto object-cover block"
                captionClassName="mmd-figcaption"
              />
            </div>

            {contentPosition === "mod--variant--media-left" && (
              <div className="mmd-content-media__content lg:col-span-1">
                <div className="mmd-content-media__content-inner">
                  <div className="flex flex-col justify-start items-stretch not-last:mb-2">
                    <Heading.Content
                      {...props}
                      preHeadingClassName="mmd-subheading"
                    />
                  </div>
                  <div className="mmd-content">
                    <InnerBlocks.Content />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
