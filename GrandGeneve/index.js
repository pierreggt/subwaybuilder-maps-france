(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Grand Geneve Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the cross-border Grand Geneve area (Switzerland/France), with the Leman Express regional rail network, Geneva Airport, CERN and the Annemasse hub.',
            notification: 'Welcome to Grand Geneve!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from Swiss STATPOP/STATENT and French INSEE Filosofi/MOBPRO. Cross-border commuters from official OFS statistics.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte du bassin transfrontalier du Grand Geneve (Suisse/France), avec le reseau ferroviaire regional Leman Express, l aeroport de Geneve, le CERN et le hub d Annemasse.',
            notification: 'Bienvenue a Grand Geneve !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de STATPOP/STATENT suisses et INSEE Filosofi/MOBPRO francais. Frontaliers issus des statistiques officielles OFS.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Grand Geneve',
        code: 'GVA',
        description: t('description'),
        population: 1453033,
        initialViewState: { zoom: 11, latitude: 46.2044, longitude: 6.1432, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-gva', label: 'France', cityCodes: ['GVA'] });

    api.map.setTileURLOverride({
        cityCode: 'GVA',
        tilesUrl: 'http://127.0.0.1:8094/GVA/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8094/GVA_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('GVA', {
        buildingsIndex: '/data/GVA/buildings_index.bin.gz',
        demandData: '/data/GVA/demand_data.json.gz',
        roads: '/data/GVA/roads.geojson.gz',
        runwaysTaxiways: '/data/GVA/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/GVA/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/GVA/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'GVA') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Grand Geneve mod loaded successfully!');
})();
