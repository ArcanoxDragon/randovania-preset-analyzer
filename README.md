# randovania-preset-analyzer

This is a very simple Node.js tool that will analyze a folder of exported [Randovania](https://github.com/randovania/randovania) preset (`.rdvpreset`) files and produce a CSV file with a summary of the most important preset settings.

It is intended to be used on large Multiworld sessions to identify presets that may cause problems generating a valid game layout.

# Building

Make sure you have an up-to-date installation of [Node.js](https://nodejs.org/en). This project uses the [Yarn](https://yarnpkg.com) package manager, so make sure that [Corepack](https://yarnpkg.com/corepack) is enabled for your Node.js installation so that it can properly locate Yarn.

First, clone the source code into its own folder.

```sh
git clone https://github.com/ArcanoxDragon/randovania-preset-analyzer.git randovania-preset-analyzer
cd randovania-preset-analyzer
```

Next, run `yarn` to install the necessary dependencies and then run `yarn build` to compile the TypeScript source code.

# Running

After running `yarn build` (as instructed above), you can use `yarn start` to run the tool. The tool requires one positional argument, which is a path to a folder containing one or more `.rdvpreset` files exported from a Randovania Multiworld session:

```sh
yarn start "C:\My Randovania Presets\"
```

The preset files are expected to follow a specific file naming convention. Randovania will export them using this convention automatically when using the "Export All Presets" option in a Multiworld session. The format is as follows:

```
World{number}-{game_name}-{player_name}-{world_name}.rdvpreset
```

Once the tool has been run against a folder of preset files, a new `Summary.csv` file will be created next to the preset files. This CSV file will contain a summary of the most common settings known to cause complications when generating sessions.
