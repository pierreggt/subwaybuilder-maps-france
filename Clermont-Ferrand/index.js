(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Clermont-Ferrand Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Clermont-Ferrand metropolitan area, France, with its rubber-tired tramway, Universite Clermont Auvergne and CHU Clermont-Ferrand.',
            notification: 'Welcome to Clermont-Ferrand!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole clermontoise, avec son tramway sur pneus, l Universite Clermont Auvergne et le CHU de Clermont-Ferrand.',
            notification: 'Bienvenue a Clermont-Ferrand !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Clermont-Ferrand',
        code: 'CFE',
        description: t('description'),
        population: 211714,
        initialViewState: { zoom: 12, latitude: 45.7772, longitude: 3.0863, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-cfe', label: 'France', cityCodes: ['CFE'] });

    api.map.setTileURLOverride({
        cityCode: 'CFE',
        tilesUrl: 'http://127.0.0.1:8090/CFE/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8090/CFE_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('CFE', {
        buildingsIndex: '/data/CFE/buildings_index.bin.gz',
        demandData: '/data/CFE/demand_data.json.gz',
        roads: '/data/CFE/roads.geojson.gz',
        runwaysTaxiways: '/data/CFE/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/CFE/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/CFE/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'CFE') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Clermont-Ferrand mod loaded successfully!');
})();
