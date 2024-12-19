import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet core styles
import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw styles
import { Control } from 'leaflet-draw'; // Import the Control class from leaflet-draw

const LeafletMap = () => {
  useEffect(() => {
    // Initialize the Leaflet map
    const map = L.map('map').setView([51.505, -0.09], 13); // Set the center and zoom level

    // Add OpenStreetMap tile layer (no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Initialize the Leaflet Draw plugin and add controls
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true, // Enable polygon drawing
        polyline: false, // Disable polyline drawing
        rectangle: false, // Disable rectangle drawing
        circle: false, // Disable circle drawing
        marker: false, // Disable marker drawing
      },
      edit: {
        featureGroup: new L.FeatureGroup().addTo(map), // Store drawn polygons in this feature group
      },
    });
    map.addControl(drawControl);

    // Event listener for when a polygon is drawn
    map.on('draw:created', (e) => {
      const layer = e.layer;
      const polygon = layer.toGeoJSON(); // Get the polygon as GeoJSON
      console.log('Polygon drawn:', polygon); // Output the GeoJSON of the polygon
      map.addLayer(layer); // Add the drawn polygon to the map
    });

    return () => {
      map.remove(); // Cleanup the map when the component unmounts
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default LeafletMap;
