(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Rouen Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Rouen metropolitan area, France, with its metro/Metrobus, TEOR and Astuce network, Universite de Rouen Normandie and CHU Rouen.',
            notification: 'Welcome to Rouen!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole rouennaise, avec son metro/Metrobus, son reseau TEOR et Astuce, l Universite de Rouen Normandie et le CHU de Rouen.',
            notification: 'Bienvenue a Rouen !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Rouen',
        code: 'ROU',
        description: t('description'),
        population: 293606,
        initialViewState: { zoom: 12, latitude: 49.4431, longitude: 1.0993, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-rou', label: 'France', cityCodes: ['ROU'] });

    api.map.setTileURLOverride({
        cityCode: 'ROU',
        tilesUrl: 'http://127.0.0.1:8096/ROU/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8096/ROU_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ROU', {
        buildingsIndex: '/data/ROU/buildings_index.bin.gz',
        demandData: '/data/ROU/demand_data.json.gz',
        roads: '/data/ROU/roads.geojson.gz',
        runwaysTaxiways: '/data/ROU/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ROU/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ROU/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'ROU') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Rouen mod loaded successfully!');
})();
