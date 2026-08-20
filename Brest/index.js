(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Brest Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Brest metropolitan area, France, with its tramway network, Universite de Bretagne Occidentale and CHRU Brest.',
            notification: 'Welcome to Brest!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole brestoise, avec son reseau de tramway, l Universite de Bretagne Occidentale et le CHRU Brest.',
            notification: 'Bienvenue a Brest !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Brest',
        code: 'BRE',
        description: t('description'),
        population: 171425,
        initialViewState: { zoom: 12, latitude: 48.3904, longitude: -4.486, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-bre', label: 'France', cityCodes: ['BRE'] });

    api.map.setTileURLOverride({
        cityCode: 'BRE',
        tilesUrl: 'http://127.0.0.1:8093/BRE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8093/BRE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BRE', {
        buildingsIndex: '/data/BRE/buildings_index.bin.gz',
        demandData: '/data/BRE/demand_data.json.gz',
        roads: '/data/BRE/roads.geojson.gz',
        runwaysTaxiways: '/data/BRE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BRE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BRE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'BRE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Brest mod loaded successfully!');
})();
