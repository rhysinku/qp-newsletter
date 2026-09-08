import { ContentPicker } from "@10up/block-components";
import get from "./get";

export default function InspectorControl(props) {
  const {
    setAttributes,
    contentTypeChoices = [],
    maxContentItems = 100,
    label = "Select a content",
  } = props;
  const { posts } = get(props);

  return (
    <>
      
      <ContentPicker
        label={label}
        onPickChange={posts => {
          setAttributes({ posts: posts });
        }}
        mode="post"
        contentTypes={contentTypeChoices}
        isOrderable={true}
        content={posts}
        maxContentItems={maxContentItems}
      />
    </>
  );
}
