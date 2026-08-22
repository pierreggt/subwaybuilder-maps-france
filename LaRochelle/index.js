(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[La Rochelle Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of La Rochelle, France, and the Ile de Re, with the Yelo network, the Centre Hospitalier and the Grand Port Maritime.",
            notification: "Welcome to La Rochelle!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte de La Rochelle et de l'Ile de Re, avec le reseau Yelo, le Centre Hospitalier et le Grand Port Maritime.",
            notification: "Bienvenue a La Rochelle !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'La Rochelle',
        code: 'LRO',
        description: t('description'),
        population: 109625,
        initialViewState: { zoom: 11, latitude: 46.13, longitude: -1.25, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-lro', label: 'France', cityCodes: ['LRO'] });

    api.map.setTileURLOverride({
        cityCode: 'LRO',
        tilesUrl: 'http://127.0.0.1:8101/LRO/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8101/LRO_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LRO', {
        buildingsIndex: '/data/LRO/buildings_index.bin.gz',
        demandData: '/data/LRO/demand_data.json.gz',
        roads: '/data/LRO/roads.geojson.gz',
        runwaysTaxiways: '/data/LRO/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LRO/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LRO/ocean_depth_index_contours.json.gz'
    });

    api.map.setLayerOverride({
        layerId: 'parks-large',
        sourceLayer: 'landuse',
        filter: ['in', ['get', 'kind'], ['literal',
            ['park','garden','nature_reserve','grass','cemetery','golf_course',
             'forest','wood','meadow','village_green','recreation_ground','pitch','zoo','allotments']]]
    });

    api.map.setLayerOverride({
        layerId: 'airports',
        sourceLayer: 'landuse',
        filter: ['==', ['get', 'kind'], 'aerodrome']
    });

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'LRO') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'La Rochelle mod loaded successfully!');
})();
