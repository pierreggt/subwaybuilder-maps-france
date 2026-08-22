(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Corse Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of the whole island of Corsica, France, with the 4 airports, the Chemins de Fer de la Corse, and the Muvistrada/ViaBastia networks.",
            notification: "Welcome to Corsica!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte de l'ile de Corse entiere, avec les 4 aeroports, les Chemins de Fer de la Corse, et les reseaux Muvistrada/ViaBastia.",
            notification: "Bienvenue en Corse !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Corse',
        code: 'COR',
        description: t('description'),
        population: 167762,
        initialViewState: { zoom: 8.5, latitude: 42.15, longitude: 9.1, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-cor', label: 'France', cityCodes: ['COR'] });

    api.map.setTileURLOverride({
        cityCode: 'COR',
        tilesUrl: 'http://127.0.0.1:8103/COR/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8103/COR_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('COR', {
        buildingsIndex: '/data/COR/buildings_index.bin.gz',
        demandData: '/data/COR/demand_data.json.gz',
        roads: '/data/COR/roads.geojson.gz',
        runwaysTaxiways: '/data/COR/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/COR/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/COR/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'COR') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Corse mod loaded successfully!');
})();
