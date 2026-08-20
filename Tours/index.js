(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Tours Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Tours metropolitan area, France, with its tramway network, Tours-Val de Loire airport, Universite de Tours and CHRU Tours.',
            notification: 'Welcome to Tours!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole de Tours, avec son reseau de tramway, l aeroport Tours-Val de Loire, l Universite de Tours et le CHRU de Tours.',
            notification: 'Bienvenue a Tours !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Tours',
        code: 'TOU',
        description: t('description'),
        population: 188817,
        initialViewState: { zoom: 12, latitude: 47.3941, longitude: 0.6848, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-tou', label: 'France', cityCodes: ['TOU'] });

    api.map.setTileURLOverride({
        cityCode: 'TOU',
        tilesUrl: 'http://127.0.0.1:8082/TOU/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8082/TOU_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('TOU', {
        buildingsIndex: '/data/TOU/buildings_index.bin.gz',
        demandData: '/data/TOU/demand_data.json.gz',
        roads: '/data/TOU/roads.geojson.gz',
        runwaysTaxiways: '/data/TOU/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/TOU/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/TOU/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'TOU') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Tours mod loaded successfully!');
})();
