import {AttributeObject, Button} from '@marameodesign/components';

export const schema = () => {
  const attrObject = new AttributeObject();

  Button.addAttributes(attrObject);

  attrObject.add({
    anchor: {
      type: 'string'
    },
    tabLabel: {
      type: 'string',
      default: ''
    },
    isFirst: {
      type: 'boolean',
      default: false
    },
  });

  return attrObject.getMergedAttributes();
}
