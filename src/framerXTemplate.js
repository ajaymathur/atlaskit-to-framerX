const template = require("@babel/template").default;

module.exports = template(
  `import * as React from 'react';
import { PropertyControls, ControlType } from 'framer';
import Button from '@atlaskit/button';
import AKProps from '../AKProps';
import IMPORT_NAME from 'SOURCE';

PROPS

export class AKButton extends React.Component<{}> {
  static defaultProps = {} 

  

  render(){return <div {...this.props}>Hello</div>;}
}
`,
  {
    allowImportExportEverywhere: true,
    sourceType: "module",
    plugins: ["jsx", "typescript", "classProperties"]
  }
);
