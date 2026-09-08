import { getBlockVariations } from "@wordpress/blocks";

export default function Content(props) {
  const {attributes, name, path = ''} = props;
  const { preview } = attributes;

  if (!preview) {
    return null;
  }


  let blockName = name.replace('mmd/', '');

  const variations = getBlockVariations(name);

  if (typeof variations === 'object') {
    const match = Object.values(variations).find(
      (data) => data.name === attributes?.variation
    );

    if (match) {
      blockName = match.name;
    }
  }

  let src = '';
  if (path) {
    src = `${window.location.protocol}//${window.location.host}/${path}/preview.png?${Date.now()}`;
  }
  else {
    src = `${window.location.protocol}//${window.location.host}/wp-content/themes/qp-newsletter/gutenberg/blocks/${blockName}/preview.png?${Date.now()}`;
  }

  return (
    <img
      src={src}
      alt="Preview"
      decoding="async"
      loading="lazy"
      width="500"
      height="200"
    />
  );
}
