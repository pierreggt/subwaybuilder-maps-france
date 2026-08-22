(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Angers Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Angers metropolitan area, France, with its tramway network, Universite d Angers and CHU Angers.',
            notification: 'Welcome to Angers!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole angevine, avec son reseau de tramway, l Universite d Angers et le CHU d Angers.',
            notification: 'Bienvenue a Angers !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Angers',
        code: 'ANG',
        description: t('description'),
        population: 211758,
        initialViewState: { zoom: 12, latitude: 47.4712, longitude: -0.5636, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-ang', label: 'France', cityCodes: ['ANG'] });

    api.map.setTileURLOverride({
        cityCode: 'ANG',
        tilesUrl: 'http://127.0.0.1:8080/ANG/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/ANG_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ANG', {
        buildingsIndex: '/data/ANG/buildings_index.bin.gz',
        demandData: '/data/ANG/demand_data.json.gz',
        roads: '/data/ANG/roads.geojson.gz',
        runwaysTaxiways: '/data/ANG/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ANG/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ANG/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'ANG') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Angers mod loaded successfully!');
})();
