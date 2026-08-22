(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Limoges Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of Limoges, France, with the TCL network, the CHU Dupuytren and the Universite de Limoges.",
            notification: "Welcome to Limoges!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte de Limoges, avec le reseau TCL, le CHU Dupuytren et l'Universite de Limoges.",
            notification: "Bienvenue a Limoges !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Limoges',
        code: 'LMG',
        description: t('description'),
        population: 118045,
        initialViewState: { zoom: 11, latitude: 45.83, longitude: 1.26, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-lim', label: 'France', cityCodes: ['LMG'] });

    api.map.setTileURLOverride({
        cityCode: 'LMG',
        tilesUrl: 'http://127.0.0.1:8106/LMG/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8106/LMG_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LMG', {
        buildingsIndex: '/data/LMG/buildings_index.bin.gz',
        demandData: '/data/LMG/demand_data.json.gz',
        roads: '/data/LMG/roads.geojson.gz',
        runwaysTaxiways: '/data/LMG/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LMG/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LMG/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'LMG') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Limoges mod loaded successfully!');
})();
