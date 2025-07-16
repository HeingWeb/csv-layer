import MapView from '@arcgis/core/views/MapView'
import CSVLayer from '@arcgis/core/layers/CSVLayer'
import Map from '@arcgis/core/Map'
import { type MapState, mapReducer } from '../hooks/mapReducer'
import { useEffect, useReducer, useRef } from 'react'

const initalStates: MapState={}

function MapComponent() {
  const mapRef=useRef<HTMLDivElement |null>(null)
  const [state, dispatch]=useReducer(mapReducer, initalStates)
  const url = "https://developers.arcgis.com/javascript/latest/sample-code/layers-csv/live/earthquakes.csv";
  
  useEffect(()=>{
        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event
        if (mapRef.current && !state.map) {    
        const template = {
          title: "Earthquake Info",
          content: "Magnitude {mag} {type} hit {place} on {time}."
        };
        const csvLayer = new CSVLayer({
          url: url,
          copyright: "USGS Earthquakes",
          popupTemplate: template
        });
        csvLayer.renderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
    size: 16,
    color: [255, 84, 54, 1],
    outline: {  // autocasts as new SimpleLineSymbol()
      width: 0.5,
      color: "white"
    }
  }
};
        
         const map = new Map({
              basemap: "dark-gray-vector"
        });
        map.add(csvLayer);
        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-117.1611, 32.7157],
            zoom: 7,
            padding: {
                right: 300
            }
        })
         dispatch({ type: "SET_LAYER", payload: csvLayer });
            dispatch({ type: "SET_MAP", payload: map })
            dispatch({ type: "SET_VIEW", payload: view });
            //  return () => {
            //     if (view) {
            //     view.destroy();
            //     }
            // };
        }
  },[])
  
  return (
      <div ref={mapRef} className='viewPortal'></div>
  )
}

export default MapComponent