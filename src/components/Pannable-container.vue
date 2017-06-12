<template>
    <div id="pannable-container">
      <div id="jsplumb-container">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  /* eslint-disable */
  import GrabToPan from '../libs/grab-to-pan';
  import domConnectorService from '../services/domConnector';
  import $ from 'jquery';

  export default {
    name: 'pannable-container',
    methods: {
      zoom(zoomScaleInString) {
        const scale = this.mapValue[zoomScaleInString];
        domConnectorService.setZoom(scale);
        const cssValue = 'scale(' + scale +')';
        
        $("#jsplumb-container").css({
          "-webkit-transform" : cssValue,
          "-moz-transform"    : cssValue,
          "-ms-transform"     : cssValue,
          "-o-transform"      : cssValue,
          "transform"         : cssValue,
          "-webkit-transform-origin": '1.1% 1.1%'
        });
      },
      zoomIn() {
        console.log('cik')
        if(this.zoomScale === 10) {
          return;
        }
        this.zoomScale++;
        this.zoom(this.zoomScale.toString());
      },
      zoomOut() {
        console.log('cok')
        if(this.zoomScale === 1) {
          return;
        }
        this.zoomScale--;
        this.zoom(this.zoomScale.toString());
      }
    },
    data() {
      return {
        zoomScale : 10,
        mapValue : {
          "1" : 0.1,
          "2" : 0.2,
          "3" : 0.3,
          "4" : 0.4,
          "5" : 0.5,
          "6" : 0.6,
          "7" : 0.7,
          "8" : 0.8,
          "9" : 0.9,
          "10" : 1,
        },
      }
    },
    mounted() {
      const pannableContainer = document.getElementById('pannable-container');
      const g2p = new GrabToPan({
        element: pannableContainer,
        onBeingPanned: () => {

        }
      });

      g2p.ignoreTarget = function(targetElement) {
        if(targetElement.getAttribute('id') !== 'jsplumb-container') {
            return true;
        }
      };

      domConnectorService.ready(() => {
        g2p.activate();
        domConnectorService.setContainer('jsplumb-container');
      });
    }
  }
</script>

<style scoped>
  #pannable-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    max-width: 2000px;
    max-height: 2000px;
    background-color: #EEE;
  }

  #jsplumb-container {
    height: 10000px;
    width: 10000px;
    position: relative;
  }
</style>