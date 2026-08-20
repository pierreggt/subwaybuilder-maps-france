(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Besancon Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Besancon metropolitan area, France, with its tramway network, Universite Marie-et-Louis-Pasteur and CHU Besancon.',
            notification: 'Welcome to Besancon!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole bisontine, avec son reseau de tramway, l Universite Marie-et-Louis-Pasteur et le CHU Besancon.',
            notification: 'Bienvenue a Besancon !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Besancon',
        code: 'BES',
        description: t('description'),
        population: 129356,
        initialViewState: { zoom: 12, latitude: 47.2378, longitude: 6.0244, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-bes', label: 'France', cityCodes: ['BES'] });

    api.map.setTileURLOverride({
        cityCode: 'BES',
        tilesUrl: 'http://127.0.0.1:8085/BES/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8085/BES_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BES', {
        buildingsIndex: '/data/BES/buildings_index.bin.gz',
        demandData: '/data/BES/demand_data.json.gz',
        roads: '/data/BES/roads.geojson.gz',
        runwaysTaxiways: '/data/BES/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BES/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BES/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'BES') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Besancon mod loaded successfully!');
})();
