(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Saint-Etienne Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Saint-Etienne metropolitan area, France, with its historic tramway network, Universite Jean Monnet and CHU de Saint-Etienne.',
            notification: 'Welcome to Saint-Etienne!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole stephanoise, avec son reseau de tramway historique, l Universite Jean Monnet et le CHU de Saint-Etienne.',
            notification: 'Bienvenue a Saint-Etienne !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Saint-Etienne',
        code: 'STE',
        description: t('description'),
        population: 231469,
        initialViewState: { zoom: 12, latitude: 45.4397, longitude: 4.3872, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-ste', label: 'France', cityCodes: ['STE'] });

    api.map.setTileURLOverride({
        cityCode: 'STE',
        tilesUrl: 'http://127.0.0.1:8091/STE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8091/STE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('STE', {
        buildingsIndex: '/data/STE/buildings_index.bin.gz',
        demandData: '/data/STE/demand_data.json.gz',
        roads: '/data/STE/roads.geojson.gz',
        runwaysTaxiways: '/data/STE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/STE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/STE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'STE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Saint-Etienne mod loaded successfully!');
})();
