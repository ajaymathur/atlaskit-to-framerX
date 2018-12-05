# atlakit-to-framerX

> Migrate the Atlaskit components to FramerX

## Pre-requisities

- Atlaskit repository should sit in the same directory as this repository
- You should be ready to be amazed

## How this repository works

### Pull the props data from Atlaskit components

Atlaskit uses _bolt_ which is awessome and provides lots of its utility.

We use bolt to get all the packages, which are Atlaskit components. Currently we work only on the core packages.

Also we ignore the ones that are internal.

We will pass in the main file to get the props from it. We have added a props field to the package json to pull the props from the component.
