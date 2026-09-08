import { TextControl } from '@wordpress/components';

export default function InspectorControl( props ) {
  const { blockID } = props.attributes;

  // build a random string from props.clientId
  const randomString = props.clientId.substring(0, 20);

  // if blockID is empty or if it's 20 characters long and not equal to randomString, set blockID to randomString
  // this is to prevent duplicate block IDs
  if ( !blockID || ( blockID.length == 20 && blockID != randomString ) ) {
    props.setAttributes( { blockID: randomString } );
  }

  return (
    <TextControl
      label="Block ID"
      value={ blockID }
      onChange={ ( blockID ) => props.setAttributes( { blockID } ) }
      help="This is used for anchor links. The value must be less than 20 characters."
    />
  );
};
