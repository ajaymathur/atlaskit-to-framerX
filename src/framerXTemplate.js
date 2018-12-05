const template = require("@babel/template").default;

module.exports = template(
  `import * as React from 'react';
import { PropertyControls, ControlType } from 'framer';
import Button from '@atlaskit/button';
import AKProps from '../AKProps';
import IMPORT_NAME from 'SOURCE';

const props = PROPS;

export class AKButton extends React.Component<{}> {
  render(){return <div>Hello</div>;}
}
`,
  {
    allowImportExportEverywhere: true,
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  }
);
