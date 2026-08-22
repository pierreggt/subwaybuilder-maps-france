(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Pays Basque Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Cross-border map of the French and Spanish Basque Country, from Tarnos/Bayonne to San Sebastian/Donostia, with the Txik Txak and DBUS/Euskotren networks.",
            notification: "Welcome to Pays Basque!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nFrench side: INSEE Filosofi 2021/MOBPRO. Spanish side: INE/Eustat 2024 population, building-density job estimate, real cross-border commuter figures (Euroregion Nouvelle-Aquitaine Euskadi Navarre).\n\nEnjoy!"
        },
        fr: {
            description: "Carte transfrontaliere du Pays Basque francais et espagnol, de Tarnos/Bayonne a Saint-Sebastien/Donostia, avec les reseaux Txik Txak et DBUS/Euskotren.",
            notification: "Bienvenue au Pays Basque !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nCote francais : INSEE Filosofi 2021/MOBPRO. Cote espagnol : population INE/Eustat 2024, emplois estimes par densite de batiments, vrais chiffres de frontaliers (Euroregion Nouvelle-Aquitaine Euskadi Navarre).\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Pays Basque',
        code: 'PYB',
        description: t('description'),
        population: 330535,
        initialViewState: { zoom: 10, latitude: 43.36, longitude: -1.75, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-pyb', label: 'France', cityCodes: ['PYB'] });

    api.map.setTileURLOverride({
        cityCode: 'PYB',
        tilesUrl: 'http://127.0.0.1:8102/PYB/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8102/PYB_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('PYB', {
        buildingsIndex: '/data/PYB/buildings_index.bin.gz',
        demandData: '/data/PYB/demand_data.json.gz',
        roads: '/data/PYB/roads.geojson.gz',
        runwaysTaxiways: '/data/PYB/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/PYB/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/PYB/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'PYB') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Pays Basque mod loaded successfully!');
})();
