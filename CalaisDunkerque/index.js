(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Calais - Dunkerque Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Calais-Dunkerque coastal area, France, with the free DK Bus network, Universite du Littoral Cote d Opale and the Centre Hospitalier de Dunkerque.',
            notification: 'Welcome to Calais - Dunkerque!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte du littoral Calais-Dunkerque, avec son reseau DK Bus gratuit, l Universite du Littoral Cote d Opale et le Centre Hospitalier de Dunkerque.',
            notification: 'Bienvenue a Calais - Dunkerque !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Calais - Dunkerque',
        code: 'CDK',
        description: t('description'),
        population: 164220,
        initialViewState: { zoom: 10, latitude: 50.97, longitude: 2.05, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-cdk', label: 'France', cityCodes: ['CDK'] });

    api.map.setTileURLOverride({
        cityCode: 'CDK',
        tilesUrl: 'http://127.0.0.1:8098/CDK/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8098/CDK_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('CDK', {
        buildingsIndex: '/data/CDK/buildings_index.bin.gz',
        demandData: '/data/CDK/demand_data.json.gz',
        roads: '/data/CDK/roads.geojson.gz',
        runwaysTaxiways: '/data/CDK/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/CDK/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/CDK/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'CDK') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Calais - Dunkerque mod loaded successfully!');
})();
