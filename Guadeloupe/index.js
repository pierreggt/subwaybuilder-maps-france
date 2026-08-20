(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Guadeloupe Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Guadeloupe has never had, from Basse-Terre and Grande-Terre to Marie-Galante, Les Saintes and La Desirade.',
            notification: 'Welcome to Guadeloupe!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nJobs and commute flows from INSEE MOBPRO. Population estimated from OSM buildings.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que la Guadeloupe n\'a jamais eu, de Basse-Terre et Grande-Terre a Marie-Galante, aux Saintes et a La Desirade.',
            notification: 'Bienvenue en Guadeloupe !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nEmplois et flux domicile-travail issus de INSEE MOBPRO. Population estimee depuis les batiments OSM.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Guadeloupe',
        code: 'PTP',
        description: t('description'),
        population: 380400,
        initialViewState: { zoom: 11, latitude: 16.2415, longitude: -61.5333, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-ptp', label: 'France', cityCodes: ['PTP'] });

    api.map.setTileURLOverride({
        cityCode: 'PTP',
        tilesUrl: 'http://127.0.0.1:8080/PTP/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/PTP_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('PTP', {
        buildingsIndex: '/data/PTP/buildings_index.bin.gz',
        demandData: '/data/PTP/demand_data.json.gz',
        roads: '/data/PTP/roads.geojson.gz',
        runwaysTaxiways: '/data/PTP/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/PTP/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/PTP/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'PTP') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Guadeloupe mod loaded successfully!');
})();
