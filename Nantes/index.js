(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Nantes Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'The Venice of the West rises. From Nantes Atlantique airport to the Loire estuary and Ile de Nantes, build a metro worthy of the city of the Machines and the Dukes of Brittany.',
            notification: 'Welcome to Nantes!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'La Venise de l\'Ouest prend le rail. De l\'aeroport Nantes Atlantique a l\'estuaire de la Loire et l\'Ile de Nantes, batissez un metro digne de la ville des Machines et des ducs de Bretagne.',
            notification: 'Bienvenue a Nantes !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Nantes',
        code: 'NTE',
        description: t('description'),
        population: 447121,
        initialViewState: { zoom: 12, latitude: 47.2184, longitude: -1.5536, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-nte', label: 'France', cityCodes: ['NTE'] });

    api.map.setTileURLOverride({
        cityCode: 'NTE',
        tilesUrl: 'http://127.0.0.1:8092/NTE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8092/NTE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('NTE', {
        buildingsIndex: '/data/NTE/buildings_index.bin.gz',
        demandData: '/data/NTE/demand_data.json.gz',
        roads: '/data/NTE/roads.geojson.gz',
        runwaysTaxiways: '/data/NTE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/NTE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/NTE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'NTE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Nantes mod loaded successfully!');
})();
