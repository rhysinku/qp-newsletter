import { useBlockProps } from "@wordpress/block-editor";
import {
  Heading,
  Image,
  Text,
  Button,
} from "@marameodesign/components";
import { twMerge } from "tailwind-merge";
import "./style.scss";

export const Save = props => {
  const { attributes } = props;
  const { hideImage } = attributes;
  const { imageId, imageUri } = Image.get(props);

  const hasImage = !hideImage && (Boolean(imageId) || Boolean(imageUri));

  const blockProps = useBlockProps.save({
    className:
      "mmd-people-card relative flex flex-col items-center text-center rounded-[16px] p-6 transition-all duration-200 h-full bg-neutral-white",
  });

  return (
    <article {...blockProps}>
      {hasImage && (
        <div className="mmd-people-card__image-wrapper mb-4">
          <div className="mmd-people-card__image size-[120px] rounded-full overflow-hidden mx-auto">
            <Image.Content
              {...props}
              wrapperClassName="size-[120px] rounded-full overflow-hidden m-0"
              ratioWrapperClassName="size-[120px] rounded-full overflow-hidden"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
        </div>
      )}

      <div className="mmd-people-card__content flex flex-col items-center flex-1 w-full justify-between">
        <div className="mmd-people-card__body flex flex-col items-center w-full">
          <Heading.Content
            {...props}
            className="mmd-people-card__name font-bold text-[20px] md:text-[22px] leading-snug m-0 mb-1"
          />

          <Text.Content
            {...props}
            suffix="Role"
            className="mmd-people-card__role font-semibold text-[15px] md:text-[16px] m-0 mb-1"
            tagName="p"
          />

          <Text.Content
            {...props}
            suffix="Org"
            className="mmd-people-card__org font-normal text-[13px] md:text-[14px] m-0 mb-4 max-w-[280px]"
            tagName="p"
          />
        </div>

        <div className="mmd-people-card__cta-wrapper mt-auto pt-2">
          <Button.Content
            {...props}
            className="mmd-people-card__cta inline-flex items-center gap-2 font-semibold text-sm"
          />
        </div>
      </div>
    </article>
  );
};
