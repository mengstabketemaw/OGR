import L from 'leaflet';
import png from './po.png';
import pipeline from './markers/pipeline.png';
import exploration from './markers/exploration.png';
import air from './markers/air.png';
import drill from './markers/drill.png';

const point = new L.Icon({
  iconUrl: png,
  iconSize: new L.Point(50, 65),
});

const pipelineIcon = new L.Icon({
  iconUrl: pipeline,
  iconSize: new L.Point(30, 35),
});

const explorationIcon = new L.Icon({
  iconUrl: exploration,
  iconSize: new L.Point(30, 35),
});

const drillIcon = new L.Icon({
  iconUrl: air,
  iconSize: new L.Point(30, 35),
});

const airIcon = new L.Icon({
  iconUrl: drill,
  iconSize: new L.Point(30, 35),
});
function DoctorsIcon(username) {
  return new L.Icon({
    iconUrl: `${'Config.USER_URL'}/avatar/${username}`,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [40 / 2, 40 / 2], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 40 / 2], // point from which the popup should open relative to the iconAnchor
  });
}

export default DoctorsIcon;

export { point, pipelineIcon, explorationIcon, airIcon, drillIcon };
