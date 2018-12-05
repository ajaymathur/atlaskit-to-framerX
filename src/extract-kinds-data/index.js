const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
  path.join(__dirname, "..", "..", "test.json"),
  "utf-8"
);

const converters = {
  generic: path => convert(path.value)
};

function convert(ast) {
  if (!ast) {
    return "";
  }
  console.log(ast.kind);
  const converter = converters[ast.kind];
  console.log({ converter });
  converter(ast);
}

convert(JSON.parse(data));

module.exports = convert;
