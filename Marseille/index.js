(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Marseille Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'From the Calanques to the Vieux-Port, Marseille-Provence airport to Aix-en-Provence, and south to the Toulon naval base and Istres: build the transport network this whole sprawling, hilly region has always needed.',
            notification: 'Welcome to Marseille - Provence!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Des Calanques au Vieux-Port, de l\'aeroport Marseille-Provence a Aix-en-Provence, jusqu\'a la base navale de Toulon et Istres : construisez le reseau de transport que toute cette region tentaculaire et vallonnee attend depuis toujours.',
            notification: 'Bienvenue a Marseille - Provence !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Marseille - Provence',
        code: 'MRS',
        description: t('description'),
        population: 1146909,
        initialViewState: { zoom: 9, latitude: 43.35, longitude: 5.45, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-mrs', label: 'France', cityCodes: ['MRS'] });

    api.map.setTileURLOverride({
        cityCode: 'MRS',
        tilesUrl: 'http://127.0.0.1:8091/MRS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8091/MRS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MRS', {
        buildingsIndex: '/data/MRS/buildings_index.bin.gz',
        demandData: '/data/MRS/demand_data.json.gz',
        roads: '/data/MRS/roads.geojson.gz',
        runwaysTaxiways: '/data/MRS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MRS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MRS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MRS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Marseille mod loaded successfully!');
})();
