//OSM tiles attribution and URL
var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; ' + osmLink;

//ESRI World Imagery tiles attribution and URL
var cartoLink = '<a href="http://cartodb.com/attributions">EsriWorldImagery</a>';
var cartoURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var cartoAttrib = ' &copy; ' + cartoLink + ' &copy; ' + osmLink;

//Stamen Toner tiles attribution and URL
var stamenURL = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}';
var stamenAttrib = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

//Create map tiles
var osmMap = L.tileLayer(osmURL, {attribution: osmAttrib});
var cartoMap = L.tileLayer(cartoURL, {attribution: cartoAttrib});
var stamenMap = L.tileLayer(stamenURL,{
	attribution: stamenAttrib,
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});			

//Create map
var map = L.map('map',{layers: [osmMap]}).setView([-25.753889, 28.231111], 16);

//Create Gates overlayer
var gate =  L.tileLayer.wms('http://localhost:8080/geoserver/GMT320/wms?' , {
	layers: 'gates', 
	format: 'image/png',
	transparent: true
}).addTo(map);

/*var owsrootUrl = 'http://localhost:8080/geoserver/GMT320/ows?';
var defaultParameters = {
  	service: 'WFS',
  	version: '1.0.0',
  	request: 'GetFeature',
  	typeName: 'gates',
  	count : '100',
  	outputFormat: 'text/javascript',
  	format_options : 'callback:getJson',    
 	SrsName : 'EPSG:4326'
};
var parameters = L.Util.extend({}, defaultParameters);
var URL = owsrootUrl + L.Util.getParamString(parameters);

var gateLayer = null;
var popupOptions = {maxWidth: 200};
var ajax = $.ajax({
    url : URL,
    dataType : 'jsonp',
    jsonpCallback : 'getJson',
    success : function (response) {
        gateLayer = L.geoJson(response, {
            style: function (feature) {
                return {
                    stroke: false,
                    fillColor: '#36ff46',
                    fillOpacity: 80
                };
            },
            onEachFeature: function (feature, layer) {
                var name = 'Name: ' + feature.properties.gate_number_or_name;
                layer.bindPopup(name,popupOptions);
            }
        }).addTo(map);
    }
});*/


//Create Building footprint overlayer
var building =  L.tileLayer.wms('http://localhost:8080/geoserver/GMT320/wms?' , { 
	layers: 'building_footprint', 
	format: 'image/png',
	transparent: true
}).addTo(map);

//Create Bike Racks overlayer
var bikeracks =  L.tileLayer.wms('http://localhost:8080/geoserver/GMT320/wms?' , { 
	layers: 'bikeracks', 
	format: 'image/png',
	transparent: true
}).addTo(map);
                
//Base layer definition
var baseMaps = {
	"OpenStreetMap": osmMap,
	"Esri World Imagery": cartoMap,
	"Statem Toner": stamenMap
};

var overlayMaps = {
	"Gates": gate,
	"Buldings": building,
	"Bike Racks": bikeracks
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);