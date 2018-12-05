const bolt = require("bolt");
const path = require("path");
const esrt = require("extract-react-types");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const template = require("./framerXTemplate");
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const k2s = require("kind2string").default;

async function run() {
  const ws = await bolt.getWorkspaces({
    cwd: path.join(__dirname, "..", "..", "atlaskit-mk-2")
  });
  const coreDirectories = ws.filter(
    w => w.dir.indexOf("/core/") > -1 && w.config.props
  );

  const packageProps = {};

  const resolveOpts = {
    pathFilter: (pkg, location, dist) => {
      if (
        pkg["atlaskit:src"] &&
        location.includes("node_modules") &&
        location.includes(pkg.main)
      ) {
        return location.replace(dist, pkg["atlaskit:src"]);
      }
      return null;
    }
  };

  // Get the props tree for each one
  await Promise.all(
    coreDirectories.map(async w => {
      packageProps[w.name] = esrt(
        await readFile(path.join(w.dir, w.config.props + ".js")),
        "flow",
        path.join(w.dir, w.config.props + ".js"),
        resolveOpts
      );
    })
  );

  //  console.log({ packageProps: JSON.stringify(packageProps, null, 2) });
  fs.writeFileSync(
    "test.json",
    JSON.stringify(packageProps["@atlaskit/avatar"].classes[0], null, 2)
  );

  const componentProperties = [
    {
      "@atlaskit/avatar": {
        props: {
          appearance: {
            value: ["circle", "square"],
            type: "Array",
            optional: false,
            defaultValue: "circle"
          }
        }
      }
    }
  ];

  const propsObject = componentProperties[0]["@atlaskit/avatar"].props;

  function tm(...args) {
    return t.program([...template(...args)]);
  }

  const ast = tm({
    IMPORT_NAME: t.identifier("Button"),
    SOURCE: t.stringLiteral("@atlaskit/button"),
    PROPS: t.objectTypeAnnotation(
      Object.keys(propsObject).map(propName =>
        t.objectTypeProperty(
          t.stringLiteral(propName),
          t.unionTypeAnnotation([
            t.stringLiteralTypeAnnotation("circle"),
            t.stringLiteralTypeAnnotation("square")
          ])
        )
      )
    )
  });

  console.log(generate(ast, { sourceType: "module" }).code);
}

// Object.keys(propsObject).map(propName =>
//   t.objectProperty(
//     t.stringLiteral(propName),
//     t.stringLiteral(propsObject[propName].value)
//   )
// )
run().then(() => {});

// componentProperties.map(componentProperty => {
//   let value = Object.keys(componentProperty);
//   t.objectProperty(t.stringLiteral(componentProperty))
// }
// )[t.objectProperty(t.stringLiteral("hello"), t.stringLiteral("hello"))]
