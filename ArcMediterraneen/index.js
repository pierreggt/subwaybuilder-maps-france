(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = "[L’Arc Mediterraneen Mod]";
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of the French Mediterranean coast, from Carcassonne to Avignon: Narbonne, Beziers, the etang de Thau (Sete, Agde), Perpignan, Montpellier, Nimes and Arles.",
            notification: "Welcome to L’Arc Mediterraneen!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte du littoral mediterraneen francais, de Carcassonne a Avignon : Narbonne, Beziers, l’etang de Thau (Sete, Agde), Perpignan, Montpellier, Nimes et Arles.",
            notification: "Bienvenue sur L’Arc Mediterraneen !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: "L’Arc Mediterraneen",
        code: 'NAR',
        description: t('description'),
        population: 1475594,
        initialViewState: { zoom: 9, latitude: 43.3, longitude: 3.6, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-nar', label: 'France', cityCodes: ['NAR'] });

    api.map.setTileURLOverride({
        cityCode: 'NAR',
        tilesUrl: 'http://127.0.0.1:8099/NAR/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8099/NAR_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('NAR', {
        buildingsIndex: '/data/NAR/buildings_index.bin.gz',
        demandData: '/data/NAR/demand_data.json.gz',
        roads: '/data/NAR/roads.geojson.gz',
        runwaysTaxiways: '/data/NAR/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/NAR/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/NAR/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'NAR') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, "L’Arc Mediterraneen mod loaded successfully!");
})();
