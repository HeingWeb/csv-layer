import MapView from '@arcgis/core/views/MapView'
import CSVLayer from '@arcgis/core/layers/CSVLayer'
import Map from '@arcgis/core/Map'

export interface MapState {
  map?: Map;
  view?: MapView;
  layer?: CSVLayer
}

type MapAction =
  | { type: "SET_MAP"; payload: Map }
  | { type: "SET_VIEW"; payload: MapView }
  | { type: "SET_LAYER"; payload: CSVLayer };
 
  
export function mapReducer(state:MapState, action:MapAction) {
    switch (action.type) {
      case 'SET_MAP':
        return { ...state, map: action.payload };
      case 'SET_VIEW':
        return { ...state, view: action.payload };
      case 'SET_LAYER':
            return { ...state, layer: action.payload };
      default:
        return state;
    }
  }
