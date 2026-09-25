import { useBlockProps, BlockControls } from "@wordpress/block-editor";
import { ToolbarButton } from "@wordpress/components";
import { useSelect, useDispatch } from "@wordpress/data";
import {
  Heading,
  Image,
  Text,
  Button,
  Preview,
} from "@marameodesign/components";
import { twMerge } from "tailwind-merge";
import Inspector from "./inspector";
import "./editor.scss";

export const Edit = props => {
  const { attributes, clientId } = props;
  const { hideImage } = attributes;
  const { preview } = Preview.get(props);
  const { selectBlock } = useDispatch("core/block-editor");

  const { parentClientId, parentColumns } = useSelect(
    select => {
      const { getBlockParents, getBlockAttributes } = select("core/block-editor");
      const parents = getBlockParents(clientId);
      const parentId = parents[parents.length - 1];
      const parentAttrs = parentId ? getBlockAttributes(parentId) : null;
      return {
        parentClientId: parentId,
        parentColumns: parentAttrs?.columns || 2,
      };
    },
    [clientId]
  );

  const selectParentGrid = () => {
    if (parentClientId) {
      selectBlock(parentClientId);
    }
  };

  const blockProps = useBlockProps({
    className:
      "mmd-people-card relative flex flex-col items-center text-center rounded-[16px] p-6 transition-all duration-200 h-full bg-neutral-white",
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  return (
    <>
      <Inspector
        {...props}
        parentClientId={parentClientId}
        parentColumns={parentColumns}
        selectParentGrid={selectParentGrid}
      />

      <BlockControls group="block">
        {parentClientId && (
          <ToolbarButton
            icon="grid-view"
            label="Select People Card Grid"
            onClick={selectParentGrid}
          >
            Select Grid
          </ToolbarButton>
        )}
      </BlockControls>

      <Heading.ToolbarControl {...props} />

      <article {...blockProps}>
        {!hideImage && (
          <div className="mmd-people-card__image-wrapper mb-4">
            <div className="mmd-people-card__image size-[120px] rounded-full overflow-hidden mx-auto relative">
              <Image.Edit
                {...props}
                allowCaption={false}
                allowDescription={false}
                wrapperClassName="size-[120px] rounded-full overflow-hidden m-0 relative"
                ratioWrapperClassName="size-[120px] rounded-full overflow-hidden relative"
                className="w-full h-full object-cover object-center rounded-full"
                placeholder="120x120"
              />
            </div>
          </div>
        )}

        <div className="mmd-people-card__content flex flex-col items-center flex-1 w-full justify-between">
          <div className="mmd-people-card__body flex flex-col items-center w-full">
            <Heading.Edit
              {...props}
              className="mmd-people-card__name text-center font-bold text-[20px] md:text-[22px] leading-snug m-0 mb-1"
              placeholder="Person Name"
            />

            <Text.Edit
              {...props}
              suffix="Role"
              className="mmd-people-card__role text-center font-semibold text-[15px] md:text-[16px] text-neutral-grey-700 m-0 mb-1"
              placeholder="Position / Role"
              tagName="p"
            />

            <Text.Edit
              {...props}
              suffix="Org"
              className="mmd-people-card__org text-center font-normal text-[13px] md:text-[14px] text-neutral-grey-500 m-0 mb-4 max-w-[280px]"
              placeholder="Organization / Affiliation"
              tagName="p"
            />
          </div>

          <div className="mmd-people-card__cta-wrapper mt-auto pt-2">
            <Button.Edit
              {...props}
              className="mmd-people-card__cta inline-flex items-center gap-2 font-semibold text-sm"
              placeholder="View Profile"
            />
          </div>
        </div>
      </article>
    </>
  );
};
