import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet core styles
import 'leaflet-draw/dist/leaflet.draw.css'; // Leaflet Draw styles
import { Control } from 'leaflet-draw'; // Import the Control class from leaflet-draw
import { Box } from '@mui/material'; // Import Material-UI Box for layout

// Import the image
import logo from '../src/images/imagelogo.png'; // Adjust the path to match your file structure

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

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      {/* Box container for logo without background color */}
      <Box 
        sx={{
          padding: '20px', 
          maxWidth: '800px', 
          margin: '0 auto', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
          display: 'flex', 
          justifyContent: 'center'
        }}
      >
        {/* Image logo */}
        <img 
          src={logo} 
          alt="Flyover Drone Services" 
          style={{ width: '200px', height: 'auto' }} // You can adjust the size of the logo here
        />
      </Box>

      {/* Add space between logo and map */}
      <div style={{ marginTop: '30px' }} />

      {/* Leaflet map */}
      <div id="map" style={{ width: '100%', height: '1000px' }} />
    </div>
  );
};

export default LeafletMap;