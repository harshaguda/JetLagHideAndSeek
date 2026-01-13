var wms_layers = [];


        var lyr_CartoDBRaster_0 = new ol.layer.Tile({
            'title': 'CartoDBRaster',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
            })
        });
var format_L1_1 = new ol.format.GeoJSON();
var features_L1_1 = format_L1_1.readFeatures(json_L1_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L1_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L1_1.addFeatures(features_L1_1);
var lyr_L1_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L1_1, 
                style: style_L1_1,
                popuplayertitle: 'L1',
                interactive: false,
                title: '<img src="styles/legend/L1_1.png" /> L1'
            });
var format_L2_2 = new ol.format.GeoJSON();
var features_L2_2 = format_L2_2.readFeatures(json_L2_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L2_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L2_2.addFeatures(features_L2_2);
var lyr_L2_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L2_2, 
                style: style_L2_2,
                popuplayertitle: 'L2',
                interactive: false,
                title: '<img src="styles/legend/L2_2.png" /> L2'
            });
var format_L3_3 = new ol.format.GeoJSON();
var features_L3_3 = format_L3_3.readFeatures(json_L3_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L3_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L3_3.addFeatures(features_L3_3);
var lyr_L3_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L3_3, 
                style: style_L3_3,
                popuplayertitle: 'L3',
                interactive: false,
                title: '<img src="styles/legend/L3_3.png" /> L3'
            });
var format_L4_4 = new ol.format.GeoJSON();
var features_L4_4 = format_L4_4.readFeatures(json_L4_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L4_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L4_4.addFeatures(features_L4_4);
var lyr_L4_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L4_4, 
                style: style_L4_4,
                popuplayertitle: 'L4',
                interactive: false,
                title: '<img src="styles/legend/L4_4.png" /> L4'
            });
var format_L5_5 = new ol.format.GeoJSON();
var features_L5_5 = format_L5_5.readFeatures(json_L5_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L5_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L5_5.addFeatures(features_L5_5);
var lyr_L5_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L5_5, 
                style: style_L5_5,
                popuplayertitle: 'L5',
                interactive: true,
                title: '<img src="styles/legend/L5_5.png" /> L5'
            });
var format_L6_6 = new ol.format.GeoJSON();
var features_L6_6 = format_L6_6.readFeatures(json_L6_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L6_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L6_6.addFeatures(features_L6_6);
var lyr_L6_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L6_6, 
                style: style_L6_6,
                popuplayertitle: 'L6',
                interactive: false,
                title: '<img src="styles/legend/L6_6.png" /> L6'
            });
var format_L7_7 = new ol.format.GeoJSON();
var features_L7_7 = format_L7_7.readFeatures(json_L7_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L7_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L7_7.addFeatures(features_L7_7);
var lyr_L7_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L7_7, 
                style: style_L7_7,
                popuplayertitle: 'L7',
                interactive: false,
                title: '<img src="styles/legend/L7_7.png" /> L7'
            });
var format_L8_8 = new ol.format.GeoJSON();
var features_L8_8 = format_L8_8.readFeatures(json_L8_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L8_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L8_8.addFeatures(features_L8_8);
var lyr_L8_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L8_8, 
                style: style_L8_8,
                popuplayertitle: 'L8',
                interactive: false,
                title: '<img src="styles/legend/L8_8.png" /> L8'
            });
var format_L9_9 = new ol.format.GeoJSON();
var features_L9_9 = format_L9_9.readFeatures(json_L9_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L9_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L9_9.addFeatures(features_L9_9);
var lyr_L9_9 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L9_9, 
                style: style_L9_9,
                popuplayertitle: 'L9',
                interactive: false,
                title: '<img src="styles/legend/L9_9.png" /> L9'
            });
var format_L10_10 = new ol.format.GeoJSON();
var features_L10_10 = format_L10_10.readFeatures(json_L10_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L10_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L10_10.addFeatures(features_L10_10);
var lyr_L10_10 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L10_10, 
                style: style_L10_10,
                popuplayertitle: 'L10',
                interactive: false,
                title: '<img src="styles/legend/L10_10.png" /> L10'
            });
var format_L11_11 = new ol.format.GeoJSON();
var features_L11_11 = format_L11_11.readFeatures(json_L11_11, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L11_11 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L11_11.addFeatures(features_L11_11);
var lyr_L11_11 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L11_11, 
                style: style_L11_11,
                popuplayertitle: 'L11',
                interactive: false,
                title: '<img src="styles/legend/L11_11.png" /> L11'
            });
var format_L12_12 = new ol.format.GeoJSON();
var features_L12_12 = format_L12_12.readFeatures(json_L12_12, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_L12_12 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_L12_12.addFeatures(features_L12_12);
var lyr_L12_12 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_L12_12, 
                style: style_L12_12,
                popuplayertitle: 'L12',
                interactive: false,
                title: '<img src="styles/legend/L12_12.png" /> L12'
            });
var format_StationNames_13 = new ol.format.GeoJSON();
var features_StationNames_13 = format_StationNames_13.readFeatures(json_StationNames_13, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_StationNames_13 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_StationNames_13.addFeatures(features_StationNames_13);
var lyr_StationNames_13 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_StationNames_13, 
                style: style_StationNames_13,
                popuplayertitle: 'StationNames',
                interactive: true,
                title: '<img src="styles/legend/StationNames_13.png" /> StationNames'
            });
var group_metro = new ol.layer.Group({
                                layers: [lyr_L1_1,lyr_L2_2,lyr_L3_3,lyr_L4_4,lyr_L5_5,lyr_L6_6,lyr_L7_7,lyr_L8_8,lyr_L9_9,lyr_L10_10,lyr_L11_11,lyr_L12_12,lyr_StationNames_13,],
                                fold: 'close',
                                title: 'metro'});

lyr_CartoDBRaster_0.setVisible(true);lyr_L1_1.setVisible(true);lyr_L2_2.setVisible(true);lyr_L3_3.setVisible(true);lyr_L4_4.setVisible(true);lyr_L5_5.setVisible(true);lyr_L6_6.setVisible(true);lyr_L7_7.setVisible(true);lyr_L8_8.setVisible(true);lyr_L9_9.setVisible(true);lyr_L10_10.setVisible(true);lyr_L11_11.setVisible(true);lyr_L12_12.setVisible(true);lyr_StationNames_13.setVisible(true);
var layersList = [lyr_CartoDBRaster_0,group_metro];
lyr_L1_1.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L2_2.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L3_3.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L4_4.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L5_5.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L6_6.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L7_7.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L8_8.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L9_9.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L10_10.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L11_11.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_L12_12.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'railway:track_ref': 'railway:track_ref', 'start_date': 'start_date', 'maxspeed': 'maxspeed', 'covered': 'covered', 'tracks': 'tracks', 'bridge': 'bridge', 'opening_date': 'opening_date', 'service': 'service', 'usage': 'usage', 'ref:-2022': 'ref:-2022', 'operator:wikidata': 'operator:wikidata', 'name:-2022': 'name:-2022', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'colour': 'colour', 'voltage': 'voltage', 'tunnel': 'tunnel', 'ref': 'ref', 'operator:short': 'operator:short', 'operator': 'operator', 'oneway': 'oneway', 'name:ca': 'name:ca', 'name': 'name', 'layer': 'layer', 'gauge': 'gauge', 'frequency': 'frequency', 'electrified': 'electrified', });
lyr_StationNames_13.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'railway': 'railway', 'traffic_signals': 'traffic_signals', 'traffic_sign:direction': 'traffic_sign:direction', 'traffic_sign': 'traffic_sign', 'maxspeed': 'maxspeed', 'bicycle': 'bicycle', 'addr:street': 'addr:street', 'addr:housenumber': 'addr:housenumber', 'crossing:signals': 'crossing:signals', 'crossing:markings': 'crossing:markings', 'traffic_signals:vibration': 'traffic_signals:vibration', 'traffic_signals:sound': 'traffic_signals:sound', 'tactile_paving': 'tactile_paving', 'highway': 'highway', 'crossing': 'crossing', 'button_operated': 'button_operated', 'defibrillator:access': 'defibrillator:access', 'traffic_signals:direction': 'traffic_signals:direction', 'defibrillator:location:en': 'defibrillator:location:en', 'check_date': 'check_date', 'defibrillator:location': 'defibrillator:location', 'access': 'access', 'name:2022': 'name:2022', 'addr:city': 'addr:city', 'layer': 'layer', 'start_date': 'start_date', 'share_taxi': 'share_taxi', 'network:wikidata': 'network:wikidata', 'level': 'level', 'toilets:wheelchair': 'toilets:wheelchair', 'station': 'station', 'survey:date': 'survey:date', 'name:zh': 'name:zh', 'name:ru': 'name:ru', 'name:ja': 'name:ja', 'name:en': 'name:en', 'location': 'location', 'train': 'train', 'indoor': 'indoor', 'name:ca:-2023': 'name:ca:-2023', 'name:-2023': 'name:-2023', 'wikipedia': 'wikipedia', 'wikimedia_commons': 'wikimedia_commons', 'wikidata': 'wikidata', 'wheelchair': 'wheelchair', 'subway': 'subway', 'public_transport': 'public_transport', 'operator': 'operator', 'network': 'network', 'name:ca': 'name:ca', 'name': 'name', 'emergency:fire_extinguisher': 'emergency:fire_extinguisher', 'emergency': 'emergency', 'covered': 'covered', });
lyr_L1_1.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L2_2.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L3_3.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L4_4.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L5_5.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L6_6.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L7_7.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L8_8.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L9_9.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L10_10.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L11_11.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_L12_12.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'railway': 'TextEdit', 'railway:track_ref': 'TextEdit', 'start_date': 'TextEdit', 'maxspeed': 'TextEdit', 'covered': 'TextEdit', 'tracks': 'TextEdit', 'bridge': 'TextEdit', 'opening_date': 'TextEdit', 'service': 'TextEdit', 'usage': 'TextEdit', 'ref:-2022': 'TextEdit', 'operator:wikidata': 'TextEdit', 'name:-2022': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'colour': 'TextEdit', 'voltage': 'TextEdit', 'tunnel': 'TextEdit', 'ref': 'TextEdit', 'operator:short': 'TextEdit', 'operator': 'TextEdit', 'oneway': 'TextEdit', 'name:ca': 'TextEdit', 'name': 'TextEdit', 'layer': 'TextEdit', 'gauge': 'TextEdit', 'frequency': 'TextEdit', 'electrified': 'TextEdit', });
lyr_StationNames_13.set('fieldImages', {'fid': '', 'full_id': '', 'osm_id': '', 'osm_type': '', 'railway': '', 'traffic_signals': '', 'traffic_sign:direction': '', 'traffic_sign': '', 'maxspeed': '', 'bicycle': '', 'addr:street': '', 'addr:housenumber': '', 'crossing:signals': '', 'crossing:markings': '', 'traffic_signals:vibration': '', 'traffic_signals:sound': '', 'tactile_paving': '', 'highway': '', 'crossing': '', 'button_operated': '', 'defibrillator:access': '', 'traffic_signals:direction': '', 'defibrillator:location:en': '', 'check_date': '', 'defibrillator:location': '', 'access': '', 'name:2022': '', 'addr:city': '', 'layer': '', 'start_date': '', 'share_taxi': '', 'network:wikidata': '', 'level': '', 'toilets:wheelchair': '', 'station': '', 'survey:date': '', 'name:zh': '', 'name:ru': '', 'name:ja': '', 'name:en': '', 'location': '', 'train': '', 'indoor': '', 'name:ca:-2023': '', 'name:-2023': '', 'wikipedia': '', 'wikimedia_commons': '', 'wikidata': '', 'wheelchair': '', 'subway': '', 'public_transport': '', 'operator': '', 'network': '', 'name:ca': '', 'name': '', 'emergency:fire_extinguisher': '', 'emergency': '', 'covered': '', });
lyr_L1_1.set('fieldLabels', {'fid': 'header label - visible with data', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L2_2.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L3_3.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L4_4.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L5_5.set('fieldLabels', {'fid': 'hidden field', 'full_id': 'hidden field', 'osm_id': 'hidden field', 'osm_type': 'hidden field', 'railway': 'hidden field', 'railway:track_ref': 'hidden field', 'start_date': 'hidden field', 'maxspeed': 'hidden field', 'covered': 'hidden field', 'tracks': 'hidden field', 'bridge': 'hidden field', 'opening_date': 'hidden field', 'service': 'hidden field', 'usage': 'hidden field', 'ref:-2022': 'hidden field', 'operator:wikidata': 'hidden field', 'name:-2022': 'hidden field', 'wikipedia': 'hidden field', 'wikidata': 'hidden field', 'colour': 'hidden field', 'voltage': 'hidden field', 'tunnel': 'hidden field', 'ref': 'hidden field', 'operator:short': 'hidden field', 'operator': 'hidden field', 'oneway': 'hidden field', 'name:ca': 'hidden field', 'name': 'no label', 'layer': 'hidden field', 'gauge': 'hidden field', 'frequency': 'hidden field', 'electrified': 'hidden field', });
lyr_L6_6.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L7_7.set('fieldLabels', {'fid': 'header label - visible with data', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L8_8.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L9_9.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L10_10.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L11_11.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_L12_12.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'railway': 'no label', 'railway:track_ref': 'no label', 'start_date': 'no label', 'maxspeed': 'no label', 'covered': 'no label', 'tracks': 'no label', 'bridge': 'no label', 'opening_date': 'no label', 'service': 'no label', 'usage': 'no label', 'ref:-2022': 'no label', 'operator:wikidata': 'no label', 'name:-2022': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'colour': 'no label', 'voltage': 'no label', 'tunnel': 'no label', 'ref': 'no label', 'operator:short': 'no label', 'operator': 'no label', 'oneway': 'no label', 'name:ca': 'no label', 'name': 'no label', 'layer': 'no label', 'gauge': 'no label', 'frequency': 'no label', 'electrified': 'no label', });
lyr_StationNames_13.set('fieldLabels', {'fid': 'hidden field', 'full_id': 'hidden field', 'osm_id': 'hidden field', 'osm_type': 'hidden field', 'railway': 'hidden field', 'traffic_signals': 'hidden field', 'traffic_sign:direction': 'hidden field', 'traffic_sign': 'hidden field', 'maxspeed': 'hidden field', 'bicycle': 'hidden field', 'addr:street': 'hidden field', 'addr:housenumber': 'hidden field', 'crossing:signals': 'hidden field', 'crossing:markings': 'hidden field', 'traffic_signals:vibration': 'hidden field', 'traffic_signals:sound': 'hidden field', 'tactile_paving': 'hidden field', 'highway': 'hidden field', 'crossing': 'hidden field', 'button_operated': 'hidden field', 'defibrillator:access': 'hidden field', 'traffic_signals:direction': 'hidden field', 'defibrillator:location:en': 'hidden field', 'check_date': 'hidden field', 'defibrillator:location': 'hidden field', 'access': 'hidden field', 'name:2022': 'hidden field', 'addr:city': 'hidden field', 'layer': 'hidden field', 'start_date': 'hidden field', 'share_taxi': 'hidden field', 'network:wikidata': 'hidden field', 'level': 'hidden field', 'toilets:wheelchair': 'hidden field', 'station': 'hidden field', 'survey:date': 'hidden field', 'name:zh': 'hidden field', 'name:ru': 'hidden field', 'name:ja': 'hidden field', 'name:en': 'hidden field', 'location': 'hidden field', 'train': 'hidden field', 'indoor': 'hidden field', 'name:ca:-2023': 'hidden field', 'name:-2023': 'hidden field', 'wikipedia': 'hidden field', 'wikimedia_commons': 'hidden field', 'wikidata': 'hidden field', 'wheelchair': 'hidden field', 'subway': 'hidden field', 'public_transport': 'hidden field', 'operator': 'hidden field', 'network': 'hidden field', 'name:ca': 'hidden field', 'name': 'no label', 'emergency:fire_extinguisher': 'hidden field', 'emergency': 'hidden field', 'covered': 'hidden field', });
lyr_StationNames_13.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});