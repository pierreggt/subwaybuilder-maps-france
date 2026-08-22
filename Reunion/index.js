(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[La Reunion Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro La Reunion has never had, from Saint-Denis and Roland Garros airport to Le Port and Saint-Paul.',
            notification: 'Welcome to La Reunion!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que La Reunion n\'a jamais eu, de Saint-Denis et l\'aeroport Roland Garros au Port et a Saint-Paul.',
            notification: 'Bienvenue a La Reunion !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'La Reunion',
        code: 'RUN',
        description: t('description'),
        population: 896200,
        initialViewState: { zoom: 11, latitude: -20.8722, longitude: 55.4477, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-run', label: 'France', cityCodes: ['RUN'] });

    api.map.setTileURLOverride({
        cityCode: 'RUN',
        tilesUrl: 'http://127.0.0.1:8080/RUN/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/RUN_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('RUN', {
        buildingsIndex: '/data/RUN/buildings_index.bin.gz',
        demandData: '/data/RUN/demand_data.json.gz',
        roads: '/data/RUN/roads.geojson.gz',
        runwaysTaxiways: '/data/RUN/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/RUN/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/RUN/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'RUN') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'La Reunion mod loaded successfully!');
})();
