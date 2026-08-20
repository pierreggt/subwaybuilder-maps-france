(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Reims Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Reims metropolitan area, France, with its tramway network, Universite de Reims Champagne-Ardenne and CHU de Reims.',
            notification: 'Welcome to Reims!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole remoise, avec son reseau de tramway, l Universite de Reims Champagne-Ardenne et le CHU de Reims.',
            notification: 'Bienvenue a Reims !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Reims',
        code: 'RMS',
        description: t('description'),
        population: 143108,
        initialViewState: { zoom: 12, latitude: 49.2583, longitude: 4.0317, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-rms', label: 'France', cityCodes: ['RMS'] });

    api.map.setTileURLOverride({
        cityCode: 'RMS',
        tilesUrl: 'http://127.0.0.1:8086/RMS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8086/RMS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('RMS', {
        buildingsIndex: '/data/RMS/buildings_index.bin.gz',
        demandData: '/data/RMS/demand_data.json.gz',
        roads: '/data/RMS/roads.geojson.gz',
        runwaysTaxiways: '/data/RMS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/RMS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/RMS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'RMS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Reims mod loaded successfully!');
})();
