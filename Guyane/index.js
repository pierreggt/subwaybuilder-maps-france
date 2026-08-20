(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Guyane Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro French Guiana has never had, from Saint-Laurent-du-Maroni and the Guiana Space Centre to Cayenne and its airport.',
            notification: 'Welcome to Guyane!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nJobs and commute flows from INSEE MOBPRO. Population estimated from OSM buildings.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que la Guyane n\'a jamais eu, de Saint-Laurent-du-Maroni et du Centre Spatial Guyanais a Cayenne et son aeroport.',
            notification: 'Bienvenue en Guyane !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nEmplois et flux domicile-travail issus de INSEE MOBPRO. Population estimee depuis les batiments OSM.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Guyane',
        code: 'CAY',
        description: t('description'),
        population: 293996,
        initialViewState: { zoom: 10, latitude: 4.9346, longitude: -52.3364, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-cay', label: 'France', cityCodes: ['CAY'] });

    api.map.setTileURLOverride({
        cityCode: 'CAY',
        tilesUrl: 'http://127.0.0.1:8080/CAY/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/CAY_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('CAY', {
        buildingsIndex: '/data/CAY/buildings_index.bin.gz',
        demandData: '/data/CAY/demand_data.json.gz',
        roads: '/data/CAY/roads.geojson.gz',
        runwaysTaxiways: '/data/CAY/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/CAY/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/CAY/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'CAY') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Guyane mod loaded successfully!');
})();
