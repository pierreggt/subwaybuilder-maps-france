(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Pau Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of Pau, France, with the Idelis network (Febus BHNS), the Centre Hospitalier de Pau and the UPPA campus.",
            notification: "Welcome to Pau!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte de Pau, avec le reseau Idelis (BHNS Febus), le Centre Hospitalier de Pau et le campus UPPA.",
            notification: "Bienvenue a Pau !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Pau',
        code: 'PAU',
        description: t('description'),
        population: 76062,
        initialViewState: { zoom: 12, latitude: 43.31, longitude: -0.37, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-pau', label: 'France', cityCodes: ['PAU'] });

    api.map.setTileURLOverride({
        cityCode: 'PAU',
        tilesUrl: 'http://127.0.0.1:8105/PAU/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8105/PAU_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('PAU', {
        buildingsIndex: '/data/PAU/buildings_index.bin.gz',
        demandData: '/data/PAU/demand_data.json.gz',
        roads: '/data/PAU/roads.geojson.gz',
        runwaysTaxiways: '/data/PAU/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/PAU/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/PAU/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'PAU') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Pau mod loaded successfully!');
})();
