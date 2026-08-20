(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Grenoble Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Grenoble metropolitan area, France, with its extensive tramway network, the Domaine universitaire and CHU Grenoble Alpes.',
            notification: 'Welcome to Grenoble!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole grenobloise, avec son vaste reseau de tramway, le Domaine universitaire et le CHU Grenoble Alpes.',
            notification: 'Bienvenue a Grenoble !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Grenoble',
        code: 'GRE',
        description: t('description'),
        population: 463620,
        initialViewState: { zoom: 11, latitude: 45.1885, longitude: 5.7245, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-gre', label: 'France', cityCodes: ['GRE'] });

    api.map.setTileURLOverride({
        cityCode: 'GRE',
        tilesUrl: 'http://127.0.0.1:8089/GRE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8089/GRE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('GRE', {
        buildingsIndex: '/data/GRE/buildings_index.bin.gz',
        demandData: '/data/GRE/demand_data.json.gz',
        roads: '/data/GRE/roads.geojson.gz',
        runwaysTaxiways: '/data/GRE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/GRE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/GRE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'GRE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Grenoble mod loaded successfully!');
})();
