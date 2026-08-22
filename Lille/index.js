(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Lille Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'From Lille-Lesquin airport to Euralille, across the Belgian border at Mouscron, and south to Bethune, Lens, Douai and Arras: build a transport network for the whole Lille metropole and its region.',
            notification: 'Welcome to Lille Metropole!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nFrench side: INSEE Filosofi 2021/MOBPRO. Belgian side (Mouscron/Estaimpuis): Statbel/ONSS population and jobs, real INSEE cross-border commuter figures.\n\nEnjoy!'
        },
        fr: {
            description: 'De l\'aeroport de Lille-Lesquin a Euralille, jusqu\'a la frontiere belge a Mouscron, et au sud vers Bethune, Lens, Douai et Arras : batissez un reseau de transport pour toute la metropole lilloise et sa region.',
            notification: 'Bienvenue a Lille Metropole !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nCote francais : INSEE Filosofi 2021/MOBPRO. Cote belge (Mouscron/Estaimpuis) : population/emplois Statbel/ONSS, vrais chiffres de frontaliers INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Flandre & Hainaut',
        code: 'LIL',
        description: t('description'),
        population: 1060367,
        initialViewState: { zoom: 9, latitude: 50.5, longitude: 2.95, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-lil', label: 'France', cityCodes: ['LIL'] });

    api.map.setTileURLOverride({
        cityCode: 'LIL',
        tilesUrl: 'http://127.0.0.1:8084/LIL/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8084/LIL_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LIL', {
        buildingsIndex: '/data/LIL/buildings_index.bin.gz',
        demandData: '/data/LIL/demand_data.json.gz',
        roads: '/data/LIL/roads.geojson.gz',
        runwaysTaxiways: '/data/LIL/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LIL/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LIL/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'LIL') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Lille mod loaded successfully!');
})();
