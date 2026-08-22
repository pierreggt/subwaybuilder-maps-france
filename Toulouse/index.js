(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Toulouse Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'The Pink City takes to the rails. From Toulouse-Blagnac airport to the Capitole and Muret, connect Airbus country with a metro worthy of its aerospace ambitions.',
            notification: 'Welcome to Toulouse!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'La Ville Rose se met aux rails. De l\'aeroport Toulouse-Blagnac au Capitole et a Muret, reliez le pays d\'Airbus a un metro digne de ses ambitions aeronautiques.',
            notification: 'Bienvenue a Toulouse !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Toulouse',
        code: 'TLS',
        description: t('description'),
        population: 554668,
        initialViewState: { zoom: 11, latitude: 43.6045, longitude: 1.4442, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-tls', label: 'France', cityCodes: ['TLS'] });

    api.map.setTileURLOverride({
        cityCode: 'TLS',
        tilesUrl: 'http://127.0.0.1:8082/TLS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8082/TLS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('TLS', {
        buildingsIndex: '/data/TLS/buildings_index.bin.gz',
        demandData: '/data/TLS/demand_data.json.gz',
        roads: '/data/TLS/roads.geojson.gz',
        runwaysTaxiways: '/data/TLS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/TLS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/TLS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'TLS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Toulouse mod loaded successfully!');
})();
