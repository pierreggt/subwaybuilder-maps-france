(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Strasbourg Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Capital of Europe, city of rails. From Strasbourg-Entzheim airport to the European Parliament and the Kehl border, build a metro worthy of a city where three cultures meet.',
            notification: 'Welcome to Strasbourg!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Capitale de l\'Europe, ville de rails. De l\'aeroport de Strasbourg-Entzheim au Parlement europeen et a la frontiere de Kehl, batissez un metro digne d\'une ville ou se croisent trois cultures.',
            notification: 'Bienvenue a Strasbourg !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Strasbourg',
        code: 'STR',
        description: t('description'),
        population: 371948,
        initialViewState: { zoom: 12, latitude: 48.5734, longitude: 7.7521, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-str', label: 'France', cityCodes: ['STR'] });

    api.map.setTileURLOverride({
        cityCode: 'STR',
        tilesUrl: 'http://127.0.0.1:8083/STR/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8083/STR_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('STR', {
        buildingsIndex: '/data/STR/buildings_index.bin.gz',
        demandData: '/data/STR/demand_data.json.gz',
        roads: '/data/STR/roads.geojson.gz',
        runwaysTaxiways: '/data/STR/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/STR/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/STR/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'STR') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Strasbourg mod loaded successfully!');
})();
