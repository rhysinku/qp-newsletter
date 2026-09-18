import { PanelBody, SelectControl, TextControl, ToggleControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { ContentPicker } from "@10up/block-components";
import { GridColumns } from "@marameodesign/components";


// Content type choices
const CONTENT_TYPE_CHOICES = [
  { label: "MMR Publication", value: "mmr" },
  { label: "MMR Article", value: "mmr-article" },
  { label: "Article", value: "article" },
  { label: "Project", value: "project" },
  { label: "Event", value: "event" },
  { label: "Press Release", value: "media-press" },
  { label: "Resource", value: "resource" }
];

export default function Inspector(props) {
  const { setAttributes } = props;
  const {
    contentTypes,
    numPostsToShow,
    categoryTerms,
    regionTerms,
    themeTerms,
    countryTerms,
    articleTypeTerms,
    resourceTypeTerms,
    onePostPerCT,
    respectListingExclusions,
  } = props.attributes;

  return (
    <InspectorControls>
      <PanelBody title="Layout">
        <GridColumns.InspectorControl {...props}
          choices={["2 Columns", "3 Columns", "4 Columns"]}
          __hasSpacingBottom />
      </PanelBody>

      <PanelBody title="Query Settings" initialOpen={true}>
        <SelectControl
          label="Filter by post types"
          value={contentTypes || []}
          options={CONTENT_TYPE_CHOICES}
          onChange={value => setAttributes({ contentTypes: Array.isArray(value) ? value : [value] })}
          multiple={true}
        />

        <TextControl
          label="Number of posts to be displayed"
          value={numPostsToShow}
          onChange={numPostsToShow =>
            setAttributes({ numPostsToShow: parseInt(numPostsToShow) })
          }
          help="Set to -1 to show all posts"
        />

        <ToggleControl
          label="One post per content type"
          checked={onePostPerCT}
          onChange={value => setAttributes({ onePostPerCT: value })}
          help="When enabled, gets one post from each selected content type"
        />

        <div className="mmd-editor-label">Filtered by categories</div>
        <ContentPicker
          label="Filtered by categories"
          onPickChange={categoryTerms => {
            setAttributes({ categoryTerms: categoryTerms });
          }}
          mode="term"
          contentTypes={["category"]}
          isOrderable={true}
          content={categoryTerms}
          maxContentItems={5}
        />


        <div className="mmd-editor-label">Filtered by resource types</div>
        <ContentPicker
          label="Filtered by resource types"
          onPickChange={resourceTypeTerms => {
            setAttributes({ resourceTypeTerms: resourceTypeTerms });
          }}
          mode="term"
          contentTypes={["resource-type"]}
          isOrderable={true}
          content={resourceTypeTerms}
          maxContentItems={5}
        />


        <div className="mmd-editor-label">Filtered by article types</div>
        <ContentPicker
          label="Filtered by article types"
          onPickChange={articleTypeTerms => {
            setAttributes({ articleTypeTerms: articleTypeTerms });
          }}
          mode="term"
          contentTypes={["article-type"]}
          isOrderable={true}
          content={articleTypeTerms}
          maxContentItems={5}
        />


        <div className="mmd-editor-label">Filtered by regions</div>
        <ContentPicker
          label="Filtered by regions"
          onPickChange={regionTerms => {
            setAttributes({ regionTerms: regionTerms });
          }}
          mode="term"
          contentTypes={["region"]}
          isOrderable={true}
          content={regionTerms}
          maxContentItems={5}
        />


        <div className="mmd-editor-label">Filtered by themes</div>
        <ContentPicker
          label="Filtered by themes"
          onPickChange={themeTerms => {
            setAttributes({ themeTerms: themeTerms });
          }}
          mode="term"
          contentTypes={["mmc-theme"]}
          isOrderable={true}
          content={themeTerms}
          maxContentItems={5}
        />

        <div className="mmd-editor-label">Filtered by countries</div>
        <ContentPicker
          label="Filtered by countries"
          onPickChange={countryTerms => {
            setAttributes({ countryTerms: countryTerms });
          }}
          mode="term"
          contentTypes={["country"]}
          isOrderable={true}
          content={countryTerms}
          maxContentItems={5}
        />

        <ToggleControl
          label="Respect listing exclusions"
          checked={respectListingExclusions}
          onChange={value => setAttributes({ respectListingExclusions: value })}
          help="When enabled, posts marked as 'Exclude from listings' will be hidden from results."
        />
      </PanelBody>
    </InspectorControls>
  );
}