(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Dijon Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Dijon metropolitan area, France, with its tramway network, Universite Bourgogne-Europe and CHU Dijon Bourgogne.',
            notification: 'Welcome to Dijon!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole dijonnaise, avec son reseau de tramway, l Universite Bourgogne-Europe et le CHU Dijon Bourgogne.',
            notification: 'Bienvenue a Dijon !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Dijon',
        code: 'DIJ',
        description: t('description'),
        population: 181380,
        initialViewState: { zoom: 12, latitude: 47.322, longitude: 5.0415, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-dij', label: 'France', cityCodes: ['DIJ'] });

    api.map.setTileURLOverride({
        cityCode: 'DIJ',
        tilesUrl: 'http://127.0.0.1:8084/DIJ/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8084/DIJ_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('DIJ', {
        buildingsIndex: '/data/DIJ/buildings_index.bin.gz',
        demandData: '/data/DIJ/demand_data.json.gz',
        roads: '/data/DIJ/roads.geojson.gz',
        runwaysTaxiways: '/data/DIJ/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/DIJ/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/DIJ/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'DIJ') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Dijon mod loaded successfully!');
})();
