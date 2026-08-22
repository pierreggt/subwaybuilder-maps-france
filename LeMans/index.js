(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Le Mans Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Le Mans metropolitan area, France, with its tramway network, Le Mans Universite and the Centre Hospitalier du Mans.',
            notification: 'Welcome to Le Mans!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole du Mans, avec son reseau de tramway, Le Mans Universite et le Centre Hospitalier du Mans.',
            notification: 'Bienvenue a Le Mans !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Le Mans',
        code: 'LEM',
        description: t('description'),
        population: 124256,
        initialViewState: { zoom: 12, latitude: 48.0061, longitude: 0.1996, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-lem', label: 'France', cityCodes: ['LEM'] });

    api.map.setTileURLOverride({
        cityCode: 'LEM',
        tilesUrl: 'http://127.0.0.1:8081/LEM/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8081/LEM_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LEM', {
        buildingsIndex: '/data/LEM/buildings_index.bin.gz',
        demandData: '/data/LEM/demand_data.json.gz',
        roads: '/data/LEM/roads.geojson.gz',
        runwaysTaxiways: '/data/LEM/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LEM/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LEM/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'LEM') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Le Mans mod loaded successfully!');
})();
