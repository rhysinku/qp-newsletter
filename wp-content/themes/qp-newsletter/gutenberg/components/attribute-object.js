import deepmerge from "deepmerge";

export class AttributeObject {
  constructor() {
    this.attributes = [];
  }

  /**
   * Add attributes
   */
  add(attributes) {
    this.attributes.push(attributes);
  }

  /**
   * Update the default value of an attribute
   */
  updateDefaultValue(attributeName, defaultValue, suffix = "") {
    this.attributes.forEach(attribute => {
      if (attribute[attributeName + suffix]) {
        attribute[attributeName + suffix].default = defaultValue;
      }
    });
  }

  /**
   * Merge all attributes into a single object
   */
  getMergedAttributes() {
    return deepmerge.all(this.attributes);
  }
}
