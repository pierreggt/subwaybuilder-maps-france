(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Lyon Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'From Lyon-Saint Exupery airport to Grenoble, Saint-Etienne, Valence and Clermont-Ferrand: build the network that unites the Rhone valley and the Alpine foothills.',
            notification: 'Welcome to Lyon - Rhone Valley & Alps!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'De l\'aeroport Lyon-Saint Exupery a Grenoble, Saint-Etienne, Valence et Clermont-Ferrand : construisez le reseau qui relie la vallee du Rhone et les contreforts des Alpes.',
            notification: 'Bienvenue a Lyon - Vallee du Rhone & Alpes !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Lyon - Vallee du Rhone & Alpes',
        code: 'LSY',
        description: t('description'),
        population: 2719487,
        initialViewState: { zoom: 8, latitude: 45.55, longitude: 4.55, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-lsy', label: 'France', cityCodes: ['LSY'] });

    api.map.setTileURLOverride({
        cityCode: 'LSY',
        tilesUrl: 'http://127.0.0.1:8081/LSY/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8081/LSY_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LSY', {
        buildingsIndex: '/data/LSY/buildings_index.bin.gz',
        demandData: '/data/LSY/demand_data.json.gz',
        roads: '/data/LSY/roads.geojson.gz',
        runwaysTaxiways: '/data/LSY/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LSY/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LSY/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'LSY') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Lyon mod loaded successfully!');
})();
