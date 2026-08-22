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
| Angers | ANG | [updates/ang-update.json](updates/ang-update.json) |
| Flandre & Hainaut (Lille) | LIL | [updates/lil-update.json](updates/lil-update.json) |
| Lyon - Vallée du Rhône & Alpes | LSY | [updates/lsy-update.json](updates/lsy-update.json) |
| Marseille - Provence | MRS | [updates/mrs-update.json](updates/mrs-update.json) |
| Arc Méditerranéen (Narbonne, Béziers, Thau, Perpignan, Montpellier, Nîmes, Arles, Avignon) | NAR | [updates/nar-update.json](updates/nar-update.json) |
| Besançon | BES | [updates/bes-update.json](updates/bes-update.json) |
| Brest | BRE | [updates/bre-update.json](updates/bre-update.json) |
| Caen | CAE | [updates/cae-update.json](updates/cae-update.json) |
| Calais-Dunkerque | CDK | [updates/cdk-update.json](updates/cdk-update.json) |
| Corse | COR | [updates/cor-update.json](updates/cor-update.json) |
| Dijon | DIJ | [updates/dij-update.json](updates/dij-update.json) |
| Eurodistrict Bâle | BSL | [updates/bsl-update.json](updates/bsl-update.json) |
| Grand Genève | GVA | [updates/gva-update.json](updates/gva-update.json) |
| Guadeloupe | PTP | [updates/ptp-update.json](updates/ptp-update.json) |
| Guyane | CAY | [updates/cay-update.json](updates/cay-update.json) |
| La Rochelle | LRO | [updates/lro-update.json](updates/lro-update.json) |
| La Réunion | RUN | [updates/run-update.json](updates/run-update.json) |
| Le Havre | LHA | [updates/lha-update.json](updates/lha-update.json) |
| Le Mans | LEM | [updates/lem-update.json](updates/lem-update.json) |
| Limoges | LMG | [updates/lmg-update.json](updates/lmg-update.json) |
| Martinique | FDF | [updates/fdf-update.json](updates/fdf-update.json) |
| Metz-Nancy | MNC | [updates/mnc-update.json](updates/mnc-update.json) |
| Orléans | ORL | [updates/orl-update.json](updates/orl-update.json) |
| Pau | PAU | [updates/pau-update.json](updates/pau-update.json) |
| Pays Basque | PYB | [updates/pyb-update.json](updates/pyb-update.json) |
| Reims | RMS | [updates/rms-update.json](updates/rms-update.json) |
| Rouen | ROU | [updates/rou-update.json](updates/rou-update.json) |
| Tours | TOU | [updates/tou-update.json](updates/tou-update.json) |
| Troyes | TRO | [updates/tro-update.json](updates/tro-update.json) |
