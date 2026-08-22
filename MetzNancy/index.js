(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Metz-Nancy Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of the Sillon Lorrain, France, covering Metz and Nancy, with the Le Met'/Mettis and Stan networks.",
            notification: "Welcome to Metz-Nancy!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte du Sillon Lorrain, couvrant Metz et Nancy, avec les reseaux Le Met'/Mettis et Stan.",
            notification: "Bienvenue a Metz-Nancy !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Metz - Nancy',
        code: 'MNC',
        description: t('description'),
        population: 339768,
        initialViewState: { zoom: 10, latitude: 48.90, longitude: 6.17, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-mnc', label: 'France', cityCodes: ['MNC'] });

    api.map.setTileURLOverride({
        cityCode: 'MNC',
        tilesUrl: 'http://127.0.0.1:8104/MNC/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8104/MNC_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MNC', {
        buildingsIndex: '/data/MNC/buildings_index.bin.gz',
        demandData: '/data/MNC/demand_data.json.gz',
        roads: '/data/MNC/roads.geojson.gz',
        runwaysTaxiways: '/data/MNC/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MNC/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MNC/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MNC') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Metz-Nancy mod loaded successfully!');
})();
