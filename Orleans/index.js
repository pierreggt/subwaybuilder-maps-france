(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Orleans Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Orleans metropolitan area, France, with its tramway network, Universite d Orleans and the CHR d Orleans.',
            notification: 'Welcome to Orleans!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole orleanaise, avec son reseau de tramway, l Universite d Orleans et le CHR d Orleans.',
            notification: 'Bienvenue a Orleans !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Orleans',
        code: 'ORL',
        description: t('description'),
        population: 173480,
        initialViewState: { zoom: 12, latitude: 47.9029, longitude: 1.9039, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-orl', label: 'France', cityCodes: ['ORL'] });

    api.map.setTileURLOverride({
        cityCode: 'ORL',
        tilesUrl: 'http://127.0.0.1:8083/ORL/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8083/ORL_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ORL', {
        buildingsIndex: '/data/ORL/buildings_index.bin.gz',
        demandData: '/data/ORL/demand_data.json.gz',
        roads: '/data/ORL/roads.geojson.gz',
        runwaysTaxiways: '/data/ORL/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ORL/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ORL/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'ORL') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Orleans mod loaded successfully!');
})();
