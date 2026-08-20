(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Le Havre Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the Le Havre metropolitan area, France, with its tramway network, Universite Le Havre Normandie and the Groupe Hospitalier du Havre.',
            notification: 'Welcome to Le Havre!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from INSEE Filosofi 2021. Jobs estimated from OSM + INSEE mobility flows.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de la metropole havraise, avec son reseau de tramway, l Universite Le Havre Normandie et le Groupe Hospitalier du Havre.',
            notification: 'Bienvenue a Le Havre !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de INSEE Filosofi 2021. Emplois estimes depuis OSM + flux INSEE.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Le Havre',
        code: 'LHA',
        description: t('description'),
        population: 117868,
        initialViewState: { zoom: 12, latitude: 49.4944, longitude: 0.1079, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-lha', label: 'France', cityCodes: ['LHA'] });

    api.map.setTileURLOverride({
        cityCode: 'LHA',
        tilesUrl: 'http://127.0.0.1:8088/LHA/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8088/LHA_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('LHA', {
        buildingsIndex: '/data/LHA/buildings_index.bin.gz',
        demandData: '/data/LHA/demand_data.json.gz',
        roads: '/data/LHA/roads.geojson.gz',
        runwaysTaxiways: '/data/LHA/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/LHA/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/LHA/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'LHA') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Le Havre mod loaded successfully!');
})();
