 /* eslint-disable no-undef */
import 'jsplumb';
import connectionTypeAndStyleMapper from '../mappers/connectionTypeAndStyleMapper';

export default {
  ready(callback) {
    jsPlumb.ready(() => {
      callback();
    });
  },
  setContainer(containerId) {
    jsPlumb.setContainer(containerId);
  },
  setZoom(scale) {
    jsPlumb.setZoom(scale);
  },
  connect(sourceId, targetId, relationType) {
    jsPlumb.connect({
      source: document.getElementById(sourceId),
      target: document.getElementById(targetId),
      detachable: false,
      connector: ['Flowchart'],
      cssClass: 'connection-line',
      overlays: [
        ['Arrow', {
          width: 12,
          length: 12,
          location: 1,
        }],
        ['Label', {
          label: connectionTypeAndStyleMapper[relationType].labelContent,
          cssClass: connectionTypeAndStyleMapper[relationType].cssClass,
        }],
      ],
      paintStyle: {
        stroke: connectionTypeAndStyleMapper[relationType].connectionColor,
        strokeWidth: 1,
      },
      deleteEndpointsOnDetach: true,
      endpoint: 'Blank',
      anchor: [
        'Top',
        'Bottom',
        'Left',
        'Right',
      ],
    });
  },
  makeDraggable(domId, onStopCallback) {
    jsPlumb.draggable(document.getElementById(domId), {
      stop: (event, ui) => {
        onStopCallback(event, ui);
      },
    });
  },
  getConnection(sourceId, targetId) {
    return jsPlumb.getConnections({
      source: sourceId,
      target: targetId,
    });
  },
  detachConnection(sourceId, targetId) {
    const connections = this.getConnection(sourceId, targetId);
    if (connections[0]) {
      jsPlumb.deleteConnection(connections[0]);
    }
  },
  detachAllConnections() {
    jsPlumb.deleteEveryConnection();
    jsPlumb.deleteEveryEndpoint();
  },
  repaintEverything() {
    jsPlumb.repaintEverything();
  },
  repaint(id) {
    jsPlumb.repaint(id.toString());
  },
};
