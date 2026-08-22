(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Troyes Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of Troyes, France, with the TCAT network, the Centre Hospitalier de Troyes and the UTT.",
            notification: "Welcome to Troyes!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte de Troyes, avec le reseau TCAT, le Centre Hospitalier de Troyes et l'UTT.",
            notification: "Bienvenue a Troyes !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Troyes',
        code: 'TRO',
        description: t('description'),
        population: 68585,
        initialViewState: { zoom: 12, latitude: 48.29, longitude: 4.08, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-tro', label: 'France', cityCodes: ['TRO'] });

    api.map.setTileURLOverride({
        cityCode: 'TRO',
        tilesUrl: 'http://127.0.0.1:8107/TRO/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8107/TRO_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('TRO', {
        buildingsIndex: '/data/TRO/buildings_index.bin.gz',
        demandData: '/data/TRO/demand_data.json.gz',
        roads: '/data/TRO/roads.geojson.gz',
        runwaysTaxiways: '/data/TRO/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/TRO/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/TRO/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'TRO') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Troyes mod loaded successfully!');
})();
