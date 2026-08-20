(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Avignon Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Avignon metropolitan area, France, with Avignon Universite, the Centre Hospitalier and the historic Palais des Papes.',
            notification: 'Welcome to Avignon!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole avignonnaise, avec Avignon Universite, le Centre Hospitalier et le Palais des Papes.',
            notification: 'Bienvenue a Avignon !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Avignon',
        code: 'AVI',
        description: t('description'),
        population: 224306,
        initialViewState: { zoom: 12, latitude: 43.9493, longitude: 4.8059, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-avi', label: 'France', cityCodes: ['AVI'] });

    api.map.setTileURLOverride({
        cityCode: 'AVI',
        tilesUrl: 'http://127.0.0.1:8092/AVI/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8092/AVI_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('AVI', {
        buildingsIndex: '/data/AVI/buildings_index.bin.gz',
        demandData: '/data/AVI/demand_data.json.gz',
        roads: '/data/AVI/roads.geojson.gz',
        runwaysTaxiways: '/data/AVI/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/AVI/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/AVI/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'AVI') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Avignon mod loaded successfully!');
})();
