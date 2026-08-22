(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Rennes Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'The Breton capital, already home to one of France\'s few fully-automated metros, invites you to expand it further. From Rennes-Saint-Jacques airport to Cesson-Sevigne, connect the crossroads of Brittany.',
            notification: 'Welcome to Rennes!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'La capitale bretonne, deja dotee d\'un des rares metros automatiques de France, vous invite a l\'etendre encore. De l\'aeroport de Rennes-Saint-Jacques a Cesson-Sevigne, reliez le carrefour de la Bretagne.',
            notification: 'Bienvenue a Rennes !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Rennes',
        code: 'RNS',
        description: t('description'),
        population: 297940,
        initialViewState: { zoom: 12, latitude: 48.1173, longitude: -1.6778, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-rns', label: 'France', cityCodes: ['RNS'] });

    api.map.setTileURLOverride({
        cityCode: 'RNS',
        tilesUrl: 'http://127.0.0.1:8085/RNS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8085/RNS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('RNS', {
        buildingsIndex: '/data/RNS/buildings_index.bin.gz',
        demandData: '/data/RNS/demand_data.json.gz',
        roads: '/data/RNS/roads.geojson.gz',
        runwaysTaxiways: '/data/RNS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/RNS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/RNS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'RNS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Rennes mod loaded successfully!');
})();
