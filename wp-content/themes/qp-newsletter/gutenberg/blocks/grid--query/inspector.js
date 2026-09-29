import { PanelBody, SelectControl, TextControl, ToggleControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { ContentPicker } from "@10up/block-components";
import { GridColumns } from "@marameodesign/components";

const CONTENT_TYPE_CHOICES = [
  { label: "News", value: "news" },
  { label: "Resources", value: "resource" },
  { label: "Newsletters", value: "newsletter" },
  { label: "Events", value: "event" },
  { label: "Blogs", value: "blog" },
];

export default function Inspector(props) {
  const { setAttributes } = props;
  const {
    contentTypes,
    numPostsToShow,
    newsCategoryTerms,
    newsletterCategoryTerms,
    blogCategoryTerms,
    techTagTerms,
    onePostPerCT,
  } = props.attributes;

  return (
    <InspectorControls>
      <PanelBody title="Layout">
        <GridColumns.InspectorControl
          {...props}
          choices={["2 Columns", "3 Columns", "4 Columns"]}
          __hasSpacingBottom
        />
      </PanelBody>

      <PanelBody title="Query Settings" initialOpen={true}>
        <SelectControl
          label="Filter by Post Types"
          value={contentTypes || []}
          options={CONTENT_TYPE_CHOICES}
          onChange={value => setAttributes({ contentTypes: Array.isArray(value) ? value : [value] })}
          multiple={true}
          help="Hold Ctrl (Windows) or Cmd (Mac) to select multiple."
        />

        <TextControl
          label="Number of posts to display"
          value={numPostsToShow}
          type="number"
          onChange={val =>
            setAttributes({ numPostsToShow: parseInt(val, 10) || 6 })
          }
          help="Set to -1 to show all posts"
        />

        <ToggleControl
          label="One post per content type"
          checked={onePostPerCT}
          onChange={value => setAttributes({ onePostPerCT: value })}
          help="When enabled, returns 1 latest post from each selected post type"
        />

        <div className="mmd-editor-label">Filtered by News Categories</div>
        <ContentPicker
          label="News Categories"
          onPickChange={terms => setAttributes({ newsCategoryTerms: terms })}
          mode="term"
          contentTypes={["news_category"]}
          isOrderable={true}
          content={newsCategoryTerms}
          maxContentItems={5}
        />

        <div className="mmd-editor-label">Filtered by Newsletter Categories</div>
        <ContentPicker
          label="Newsletter Categories"
          onPickChange={terms => setAttributes({ newsletterCategoryTerms: terms })}
          mode="term"
          contentTypes={["newsletter_category"]}
          isOrderable={true}
          content={newsletterCategoryTerms}
          maxContentItems={5}
        />

        <div className="mmd-editor-label">Filtered by Blog Categories</div>
        <ContentPicker
          label="Blog Categories"
          onPickChange={terms => setAttributes({ blogCategoryTerms: terms })}
          mode="term"
          contentTypes={["blog_category"]}
          isOrderable={true}
          content={blogCategoryTerms}
          maxContentItems={5}
        />

        <div className="mmd-editor-label">Filtered by Technology Tags</div>
        <ContentPicker
          label="Technology Tags"
          onPickChange={terms => setAttributes({ techTagTerms: terms })}
          mode="term"
          contentTypes={["tech_tag"]}
          isOrderable={true}
          content={techTagTerms}
          maxContentItems={10}
        />
      </PanelBody>
    </InspectorControls>
  );
}
