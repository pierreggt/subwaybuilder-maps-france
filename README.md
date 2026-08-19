# Subway Builder Maps — France (pierreggt collection)

A shared repository of community-created [Subway Builder](https://store.steampowered.com/app/2716540/Subway_Builder/) maps for France (metropolitan and overseas territories), built with [depot](https://github.com/Subway-Builder-Modded/depot).

Each map lives in its own top-level folder (full mod source, `.pmtiles` tracked via [Git LFS](https://git-lfs.com/)) and is also published as a versioned [GitHub Release](../../releases), one release per map (tag format `<code>-vX.Y.Z`), with the release asset being the flat data zip.

## Registry updates

This repo hosts **multiple maps as separate releases**. The [Subway-Builder-Modded registry](https://github.com/Subway-Builder-Modded/registry)'s "GitHub Releases" update type only supports repositories that publish a single mod or map — it always resolves to whatever release is currently tagged "latest" repo-wide, which would silently serve the wrong map's zip here.

Each map is therefore registered with the registry as **`Update Type: Custom URL`**, pointing at a dedicated manifest in [`updates/`](updates/):

```
https://raw.githubusercontent.com/pierreggt/subwaybuilder-maps-france/main/updates/<code>-update.json
```

Each `<code>-update.json` follows the registry's `schema_version: 1` update manifest format (`versions[]` with `version`, `game_version`, `date`, `download`, `sha256`) and points at that specific map's own GitHub Release asset — so pulling in a new release for one map never affects any other map's update pointer.

## Maps

| City | Code | Update manifest |
|---|---|---|
| La Réunion | RUN | [updates/run-update.json](updates/run-update.json) |
