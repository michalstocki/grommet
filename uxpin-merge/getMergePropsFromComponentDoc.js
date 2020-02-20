const { parse, join } = require('path');
const proxyquire = require('proxyquire');
const { mapValues } = require('lodash/object');
require('@babel/register');

class PropertyTypeBuilder {
  constructor(typeName) {
    this.typeName = typeName;
    this.propDescription = '';
    this.isPropRequired = true;
  }

  get isRequired() {
    this.isPropRequired = true;
    return this;
  }

  description(description) {
    this.propDescription = description;
    return this;
  }

  defaultValue(value) {
    this.defaultPropValue = value;
    this.isPropRequired = false;
    return this;
  }

  setPropertyName(name) {
    this.propertyName = name;
  }

  toUXPinComponentPropertyDefinition() {
    const serializedProperty = {
      name: this.propertyName,
      type: this.getUXPinPropertyType(),
      description: this.propDescription,
      isRequired: this.isPropRequired,
    };

    if (typeof this.defaultPropValue !== 'undefined') {
      serializedProperty.defaultValue = this.defaultPropValue;
    }

    return serializedProperty;
  }

  getUXPinPropertyType() {
    return {
      name: this.typeName,
      structure: {}
    };
  }
}

class OneOfTypePropertyTypeBuilder extends PropertyTypeBuilder {
  constructor(typeValues) {
    super('oneOfType');
    this.typeValues = typeValues;
  }

  getUXPinPropertyType() {
    return {
      name: 'union',
      structure: {
        elements: this.typeValues.map((t) => t.getUXPinPropertyType()),
      },
    };
  }
}

class OneOfPropertyTypeBuilder extends PropertyTypeBuilder {
  constructor(values) {
    super('oneOf');
    this.values = values;
  }

  getUXPinPropertyType() {
    return {
      name: 'union',
      structure: {
        elements: this.values.map((v) => (
          { name: 'literal', structure: { value: v } }
        )),
      },
    };
  }
}

class ShapePropertyTypeBuilder extends PropertyTypeBuilder {
  constructor(shape) {
    super('shape');
    this.shape = shape;
  }

  getUXPinPropertyType() {
    return {
      name: 'shape',
      structure: mapValues(this.shape, (t) => t.getUXPinPropertyType()),
    };
  }
}
class ArrayOfPropertyTypeBuilder extends PropertyTypeBuilder {
  constructor(arrayItemType) {
    super('arrayOf');
    this.arrayItemType = arrayItemType;
  }

  getUXPinPropertyType() {
    return {
      name: 'typedArray',
      structure: {
        memberType: this.arrayItemType,
      },
    };
  }
}

const serializingPropTypes = {
  get bool() {
    return new PropertyTypeBuilder('boolean');
  },
  oneOfType(typeValues) {
    return new OneOfTypePropertyTypeBuilder(typeValues);
  },
  oneOf(values) {
    return new OneOfPropertyTypeBuilder(values);
  },
  get string() {
    return new PropertyTypeBuilder('string');
  },
  get number() {
    return new PropertyTypeBuilder('number');
  },
  shape(shape) {
    return new ShapePropertyTypeBuilder(shape);
  },
  get object() {
    return new PropertyTypeBuilder('object');
  },
  get element() {
    return new PropertyTypeBuilder('element');
  },
  get node() {
    return new PropertyTypeBuilder('node');
  },
  get func() {
    return new PropertyTypeBuilder('func');
  },
  arrayOf(type) {
    return new ArrayOfPropertyTypeBuilder(type);
  },
};

module.exports.getMergePropsFromComponentDoc = function({ path }) {
  return new Promise((resolve) => {
    const { dir, name } = parse(path);
    const docPath = join(__dirname, '..', dir, 'doc.js');
    const docFactory = proxyquire(docPath, {
      'react-desc': {
        PropTypes: serializingPropTypes,
        '@global': true
      },
    });
    const docData = docFactory.doc({});
    const propTypes = docData.propTypes;
    const uxPinSerializedProps = Object.keys(propTypes).map((propName) => {
      const propBuilder = propTypes[propName];
      propBuilder.setPropertyName(propName);
      return propBuilder.toUXPinComponentPropertyDefinition();
    });

    resolve({
      result: {
        name: name,
        properties: uxPinSerializedProps,
      },
      warnings: [],
    });
  });
};
