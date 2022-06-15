# Build instructions

## Install dependencies

```
npm install
```

Clone the greenworks directory:
```
npm install --save --ignore-scripts git+https://github.com/greenheartgames/greenworks.git
```

[Copy the steamworks sdk directory in the greenworks sources.](https://github.com/greenheartgames/greenworks/blob/master/docs/get-steamworks-sdk.md)

In `./node_modules/greenworks/bindings.gyp`:

Line 213 (post build action), replace `python` by `python3` or the path to your python installation.

For mac build, line 48 and 49 (variables for OS=="mac" build), change the `osx32` strings to `osx`.

```
npm run rebuild-greenworks
```

## Build command

```
npm run build
```