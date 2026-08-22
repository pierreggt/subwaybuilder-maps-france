(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Eurodistrict of Basel Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Map of the trinational Basel Eurodistrict (Switzerland/France/Germany), with the EuroAirport Basel-Mulhouse-Freiburg, the Basel tram network and Mulhouse and Saint-Louis stations.',
            notification: 'Welcome to Eurodistrict of Basel!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nPopulation from Swiss STATPOP/STATENT, French INSEE Filosofi/MOBPRO, and German Zensus 2022. Cross-border commuters from official OFS statistics.\n\nEnjoy!'
        },
        fr: {
            description: 'Carte de l Eurodistrict trinational de Bale (Suisse/France/Allemagne), avec l EuroAirport Bale-Mulhouse-Fribourg, le reseau de tramway de Bale et les gares de Mulhouse et Saint-Louis.',
            notification: 'Bienvenue a Eurodistrict de Bale !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nPopulation issue de STATPOP/STATENT suisses, INSEE Filosofi/MOBPRO francais, et Zensus 2022 allemand. Frontaliers issus des statistiques officielles OFS.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Eurodistrict of Basel',
        code: 'BSL',
        description: t('description'),
        population: 864924,
        initialViewState: { zoom: 11, latitude: 47.5596, longitude: 7.5886, bearing: 0 }
    });

    api.cities.registerTab({ id: 'france-bsl', label: 'France', cityCodes: ['BSL'] });

    api.map.setTileURLOverride({
        cityCode: 'BSL',
        tilesUrl: 'http://127.0.0.1:8095/BSL/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8095/BSL_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('BSL', {
        buildingsIndex: '/data/BSL/buildings_index.bin.gz',
        demandData: '/data/BSL/demand_data.json.gz',
        roads: '/data/BSL/roads.geojson.gz',
        runwaysTaxiways: '/data/BSL/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/BSL/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/BSL/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'BSL') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Eurodistrict of Basel mod loaded successfully!');
})();
