(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Martinique Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Martinique has never had, from Fort-de-France and Aime Cesaire airport to Le Robert and Sainte-Luce.',
            notification: 'Welcome to Martinique!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que la Martinique n\'a jamais eu, de Fort-de-France et l\'aeroport Aime Cesaire au Robert et a Sainte-Luce.',
            notification: 'Bienvenue en Martinique !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Martinique',
        code: 'FDF',
        description: t('description'),
        population: 355500,
        initialViewState: { zoom: 11, latitude: 14.6037, longitude: -61.0764, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-fdf', label: 'France', cityCodes: ['FDF'] });

    api.map.setTileURLOverride({
        cityCode: 'FDF',
        tilesUrl: 'http://127.0.0.1:8080/FDF/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/FDF_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('FDF', {
        buildingsIndex: '/data/FDF/buildings_index.bin.gz',
        demandData: '/data/FDF/demand_data.json.gz',
        roads: '/data/FDF/roads.geojson.gz',
        runwaysTaxiways: '/data/FDF/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/FDF/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/FDF/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'FDF') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Martinique mod loaded successfully!');
})();
