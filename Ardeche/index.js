(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Ardeche Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: "Map of the whole Ardeche department, France. Fun fact: the only French department with no active SNCF passenger station in its main towns. Can you do better than the SNCF?",
            notification: "Welcome to Ardeche!\n\nFun fact: Ardeche is the only French department with no active SNCF passenger station in its prefecture. Can you build a better transport network than the national railway managed to?\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!"
        },
        fr: {
            description: "Carte du departement de l'Ardeche entier. Le saviez-vous : c'est le seul departement francais sans gare SNCF voyageurs active dans sa prefecture. Saurez-vous faire mieux que la SNCF ?",
            notification: "Bienvenue en Ardeche !\n\nLe saviez-vous : l'Ardeche est le seul departement francais sans gare SNCF voyageurs active dans sa prefecture. Saurez-vous construire un meilleur reseau de transport que ce que la SNCF a reussi a faire ?\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !"
        }
    });

    api.registerCity({
        name: 'Ardeche',
        code: 'ARD',
        description: t('description'),
        population: 316557,
        initialViewState: { zoom: 9, latitude: 44.8, longitude: 4.35, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-ard', label: 'France', cityCodes: ['ARD'] });

    api.map.setTileURLOverride({
        cityCode: 'ARD',
        tilesUrl: 'http://127.0.0.1:8108/ARD/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8108/ARD_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('ARD', {
        buildingsIndex: '/data/ARD/buildings_index.bin.gz',
        demandData: '/data/ARD/demand_data.json.gz',
        roads: '/data/ARD/roads.geojson.gz',
        runwaysTaxiways: '/data/ARD/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/ARD/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/ARD/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'ARD') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Ardeche mod loaded successfully!');
})();
