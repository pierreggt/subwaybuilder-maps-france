(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Paris Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: '16 metro lines, a moody RER, and a region that now stretches to every town where a Transilien line ends -- Creil, Dreux, Montargis, Chateau-Thierry, Gisors. Real job placement from INSEE SIRENE data, not just population density. Show them how it\'s done.',
            notification: 'Welcome to Paris!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nResidents from INSEE Filosofi 2021. Jobs placed on real buildings via INSEE SIRENE establishment data, calibrated on MOBPRO commute totals.\n\nEnjoy!'
        },
        fr: {
            description: '16 lignes de metro, un RER capricieux, et une region qui s\'etend maintenant jusqu\'a chaque ville terminus du Transilien -- Creil, Dreux, Montargis, Chateau-Thierry, Gisors. Emplois places sur de vrais batiments via les donnees SIRENE de l\'INSEE, pas juste la densite de population. A vous de faire mieux.',
            notification: 'Bienvenue a Paris !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nResidents issus d\'INSEE Filosofi 2021. Emplois places sur de vrais batiments via les donnees SIRENE de l\'INSEE, cales sur les totaux de mobilite MOBPRO.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Paris - Ile de France',
        code: 'PRS',
        country: 'FR',
        description: t('description'),
        population: 6650825,
        initialViewState: { zoom: 8, latitude: 48.75, longitude: 2.35, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-prs', label: 'France', cityCodes: ['PRS'] });

    api.map.setTileURLOverride({
        cityCode: 'PRS',
        tilesUrl: 'http://127.0.0.1:8090/PRS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8090/PRS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('PRS', {
        buildingsIndex: '/data/PRS/buildings_index.bin.gz',
        demandData: '/data/PRS/demand_data.json.gz',
        roads: '/data/PRS/roads.geojson.gz',
        runwaysTaxiways: '/data/PRS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/PRS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/PRS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'PRS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Paris mod loaded successfully!');
})();
