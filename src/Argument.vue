<template>
  <div id="app">
    <NavBar 
      @on-show-argument-form="showArgumentFormToCreateContention"
      @on-zoomed-in="zoomIn"
      @on-zoomed-out="zoomOut"
      @on-save-to-json="showModal('saveToJsonModal')"
      @on-load-from-json="showModal('loadFromJsonModal')"
      @on-remove-all-data="showModal('emptyAppDataModal')"
      @on-show-about="showModal('aboutModal')">
    </NavBar>
    <PannableContainer ref="pannableContainerRef">
      <Card 
        v-for="card in cards"
        :card-hovered-id="selected.hovered"
        :card-selected-id="selected.clicked"
        :card="card" 
        :key="card.id" 
        @on-mounted="handleCardOnMounted"
        @on-card-hovered="changeHoveredCardId"
        @on-card-clicked="changeSelectedCardId"
        @on-card-mouse-leave="unHoverAnyCard"
        @on-create-relation-card="showArgumentFormToCreateRelatedCard"
        @on-view-card="viewCard"
        @on-delete-card="deleteCard"
        @on-change-card="changeCard">
      </Card>
    </PannableContainer>
    <create-argument-modal 
      :options="{ withHeader: false, backdrop: 'static', keyboard: false, modalSize: 'medium' }" 
      ref="createArgumentModal"
      @on-hidden="onArgumentFormModalHide">
      <ArgumentForm 
        @on-send-data="handleArgumentFormOnSendData" 
        @on-close-button-clicked="hideArgumentForm"
        ref="argumentForm">
      </ArgumentForm>
    </create-argument-modal>
    <save-to-json-modal
      :options="{ withHeader: false, backdrop: true, keyboard: false, modalSize: 'small' }" 
      ref="saveToJsonModal"
    >
      <div class="form-group">
        <label for="">Nama File</label>
        <input type="text" v-model="jsonFileName" class="form-control">
      </div>
      <div class="form-group">
        <div class="pull-right">
          <button @click="saveToJson" class="btn btn-success btn-sm">Download file</button>
        </div>
      </div>
    </save-to-json-modal>
    <load-from-json-modal
      :options="{ withHeader: false, backdrop: true, keyboard: false, modalSize: 'small' }" 
      ref="loadFromJsonModal"
    >
      <div class="form-group">
        <label for="">Pilih file yang akan dimuat</label>
        <input id="inputFile" @change="setFileToLoad" type="file">
      </div>
      <div class="form-group">
        <div class="pull-right">
          <button @click="loadFromJson" class="btn btn-success btn-sm">Muat File</button>
        </div>
      </div>
    </load-from-json-modal>
    <empty-app-data-modal 
      :options="{ withHeader: false, backdrop: true, keyboard: false, modalSize: 'medium' }" 
      ref="emptyAppDataModal">
      <div class="row">
        <div class="col-md-12">
          <h4 class="warning"><strong>Apakah anda akan menghapus data pada diagram ?</strong></h4>
          <h4 class="warning"><strong>(pastikan menyimpan data diagram anda dahulu)</strong></h4>
        </div>
        <div class="col-md-12">
          <div class="pull-right">
            <button @click="emptyAppDataAndHideModal" class="btn btn-danger btn-sm">
              Hapus
            </button>
            <button @click="hideModal('emptyAppDataModal')" class="btn btn-success btn-sm">
              Tidak
            </button>
          </div>
        </div>
      </div>
    </empty-app-data-modal>
    <about-modal
      :options="{ withHeader: false, backdrop: true, keyboard: false, modalSize: 'medium' }" 
      ref="aboutModal"
    >
      <div class="row">
        <div class="col-md-12 about">
          <h3><strong>Diagram Argumen</strong></h3>
          <p>Aplikasi sederhana untuk membuat diagram argumen</p>
          <p><a href="htt">source code</a></p>
        </div>
      </div>
    </about-modal>
  </div>
</template>

<script>
 /* eslint-disable */
import PannableContainer from './components/Pannable-container';
import NavBar from './components/NavBar';
import Card from './components/Card';
import CardModel from './models/Card';
import Modal from './components/Modal';
import ArgumentForm from './components/ArgumentForm';

import cardsCollections from './collections/Cards';
import domConnectorService from './services/domConnector';
import fileSaverService from './services/fileSaver';
import fileReaderService from './services/fileReader';
import counter from './states/Counter';

import cardTypeAndTitleMap from './mappers/cardTypeAndTitle';

export default {
  name: 'Argument',
  data() {
    return {
      cardsCollections: cardsCollections,
      currentArgumentFormStatus: 'creating',
      toBeCreatedCard: {
        type: 'contention',
        relation: {
          toId: null,
          type: null,
          top: '100px',
          left: '100px'
        }
      },
      toBeEditedCard: {
        id: null
      },
      counter: counter,
      selected: {
        hovered: 0,
        clicked: 0
      },
      jsonFileName: '',
      fileToLoad: null
    }
  },
  components: {
    PannableContainer,
    Card,
    NavBar,
    'create-argument-modal': Modal,
    'save-to-json-modal': Modal,
    'load-from-json-modal': Modal,
    'about-modal': Modal,
    'empty-app-data-modal': Modal,
    ArgumentForm
  },
  methods: {
    showArgumentForm() {
      this.$refs.createArgumentModal.show();
    },
    hideArgumentForm() {
      this.$refs.createArgumentModal.hide();
    },
    setToBeCreatedCard(newData) {
      this.toBeCreatedCard = Object.assign(this.toBeCreatedCard, newData);
    },
    showArgumentFormToCreateContention() {
      this.currentArgumentFormStatus = 'creating';
      this.setToBeCreatedCard({
        type: 'contention',
        relation: {
          toId: null,
          type: null
        }
      });
      this.setArgumentFormTitle('Buat', 'contention');
      this.showModal('createArgumentModal');
    },
    setArgumentFormTitle(currentStatus, cardType) {
      const formTitle =  currentStatus + ' ' + cardTypeAndTitleMap[cardType];
      this.$refs.argumentForm.setTitle(formTitle);
    },
    showArgumentFormToCreateRelatedCard(args) {
      this.currentArgumentFormStatus = 'creating';
      this.setToBeCreatedCard({
        type: args.type,
        relation: {
          toId: args.toRelatedId,
          type: args.type,
          top: (parseInt(args.top) + 200).toString() + 'px',
          left: args.left
        }
      });

      if (args.type === 'sub-reason-connector') {
        const subReasonConnectorCard = this.createCard('');
        this.cardsCollections.add(subReasonConnectorCard);
        return;
      }
      
      this.setArgumentFormTitle('Buat', args.type);
      this.showModal('createArgumentModal');
    },
    handleCardOnMounted(args) {
      domConnectorService.makeDraggable(args.id, (event, ui) => {
        const cardId = parseInt(event.el.id);
        this.cardsCollections.edit(cardId, { 
          left: event.finalPos[0].toString() + 'px',
          top: event.finalPos[1].toString() + 'px'
        });
      });
      if (args.relation !== null) {
        setTimeout(() => {
          domConnectorService.connect(args.id, args.relation.toId, args.relation.type);
          if (args.relation.type === 'sub-reason') {
            domConnectorService.connect(args.relation.toId, args.id, args.relation.type);    
          }
        }, 1000);
      }
    },
    handleArgumentFormOnSendData(args) {
      if (this.currentArgumentFormStatus === 'creating') {
        const newContentionCard = this.createCard(args.content);
        this.cardsCollections.add(newContentionCard);
        this.hideModal('createArgumentModal');
        return;
      }

      this.cardsCollections.edit(this.toBeEditedCard.id, { content: args.content });
      this.hideModal('createArgumentModal');
    },
    changeHoveredCardId(args) {
      this.selected.hovered = args.id;
    },
    changeSelectedCardId(args) {
      this.selected.clicked = args.id;
    },
    unHoverAnyCard() {
      this.selected.hovered = 0;
    },
    viewCard() {

    },
    changeCard(args) {
      this.currentArgumentFormStatus = 'editing';
      this.toBeEditedCard.id = args.id;
      this.$refs.argumentForm.setDataToEdit({
        content: args.content
      });
      this.setArgumentFormTitle('Ubah', args.type);
      this.showModal('createArgumentModal');
    },
    deleteCard(args) {
      if (this.cardsCollections.canCardBeRemoved(args.id)) {
        if (args.relatedToId !== null) {
          domConnectorService.detachConnection(args.id.toString(), args.relatedToId.toString());
          if (args.type === 'sub-reason') {
            domConnectorService.detachConnection(args.relatedToId.toString(), args.id.toString());
          }
        }
        this.cardsCollections.removeCard(args.id);
      }
    },
    loadAppData(appData) {
      const cardInstances = appData.cardsData.map((cardData) => new CardModel(cardData));
      cardInstances.forEach((cardInstance) => this.cardsCollections.add(cardInstance));
      this.counter.setCounter(appData.currentCounter);
    },
    createCard(content) {
      return new CardModel({
        id: this.counter.getNextCounter(),
        type: this.toBeCreatedCard.type,
        content: content,
        top: this.toBeCreatedCard.type === 'contention' ? '200px' : this.toBeCreatedCard.relation.top,
        left: this.toBeCreatedCard.type === 'contention' ? '200px' : this.toBeCreatedCard.relation.left,
        relation: this.toBeCreatedCard.relation.toId === null ? null : { type: this.toBeCreatedCard.relation.type, toId: this.toBeCreatedCard.relation.toId }
      });
    },
    onArgumentFormModalHide() {
      this.$refs.argumentForm.reset();
    },
    zoomIn() {
      this.$refs.pannableContainerRef.zoomIn();
    },
    zoomOut() {
      this.$refs.pannableContainerRef.zoomOut();
    },
    saveToJson() {
      const dataToSave = {
        currentCounter: this.counter.getCurrentCounter(),
        cardsData: this.cardsCollections.getAll()
      };
      fileSaverService.saveToJsonFile(dataToSave, this.jsonFileName);
      this.jsonFileName = '';
      this.showModal('saveToJsonModal');
    },
    setFileToLoad(event) {
      this.fileToLoad = event.target.files[0];
    },
    resetInputFile() {
      this.fileToLoad = null;
      document.getElementById("inputFile").value = "";
    },
    emptyAppData() {
      this.cardsCollections.empty();
      domConnectorService.detachAllConnections();
      this.counter.setCounter(0);
    },
    isAppDataValid(appData) {
      return appData.cardsData !== undefined && appData.currentCounter !== undefined;
    },
    loadFromJson() {
      if (this.fileToLoad === null) {
        alert('Anda harus memilih file');
        return;
      }

      fileReaderService.readJsonFile(this.fileToLoad)
        .then((parsedAppData) => {
          if (!this.isAppDataValid(parsedAppData)) {
            this.resetInputFile();
            alert('File json yang anda muat tidak sesuai');
            return;
          }

          this.emptyAppData();
          setTimeout(() => {
            this.loadAppData(parsedAppData);
            this.resetInputFile();
            this.hideModal('loadFromJsonModal');
          }, 300);
        })
        .catch((error) => {
          this.resetInputFile();
          alert('Harap memuat file yang sesuai');
        });
    },
    showModal(modalName) {
      this.$refs[modalName].show();
    },
    hideModal(modalName) {
      this.$refs[modalName].hide();
    },
    emptyAppDataAndHideModal() {
      this.emptyAppData();
      this.hideModal('emptyAppDataModal');
    }
  },
  computed: {
    cards() {
      return this.cardsCollections.getAll();
    }
  }
};
</script>

<style>
  #app {
    font-family: "q_serif",Georgia,Times,"Times New Roman",serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .label-reason {
    font-size: 13px;
    font-weight: bold;
    background-color: #22BE34;
    padding: 5px;
    color : white;
    border-radius: 60px;
    z-index: 100;
  }

  .label-sub-reason {
    background-color: #22BE34;
    z-index: 100;
  }

  .label-objection {
    font-size: 13px;
    font-weight: bold;
    background-color: #D01919;
    padding: 5px;
    color : white;
    border-radius: 60px;
    z-index: 100;
  }

  .label-rebuttal {
    font-size: 13px;
    font-weight: bold;
    background-color: #FF851B;
    padding: 5px;
    color : white;
    border-radius: 60px;
    z-index: 100;
  }
  
  .jtk-connector.connection-line {
    z-index: 98 !important;
  }

  .warning {
    color: red;
  }

  .about p {
    font-size: 17px;
  }

</style>
