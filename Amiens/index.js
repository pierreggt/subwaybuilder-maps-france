(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Amiens Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Amiens metropolitan area, France, with its Ametis BHNS network, Universite de Picardie Jules Verne and CHU Amiens-Picardie.',
            notification: 'Welcome to Amiens!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole amienoise, avec son reseau Ametis BHNS, l Universite de Picardie Jules Verne et le CHU Amiens-Picardie.',
            notification: 'Bienvenue a Amiens !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Amiens',
        code: 'AMI',
        description: t('description'),
        population: 155171,
        initialViewState: { zoom: 12, latitude: 49.8942, longitude: 2.2957, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-ami', label: 'France', cityCodes: ['AMI'] });

    api.map.setTileURLOverride({
        cityCode: 'AMI',
        tilesUrl: 'http://127.0.0.1:8097/AMI/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8097/AMI_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('AMI', {
        buildingsIndex: '/data/AMI/buildings_index.bin.gz',
        demandData: '/data/AMI/demand_data.json.gz',
        roads: '/data/AMI/roads.geojson.gz',
        runwaysTaxiways: '/data/AMI/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/AMI/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/AMI/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'AMI') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Amiens mod loaded successfully!');
})();
