<template>
  <div 
    :class="classObject" 
    @click="onCardClicked" 
    @mouseover="onCardMouseOver"
    @mouseleave="onCardMouseLeave"
    :id="card.id" 
    class="panel card" 
    :style="styleObject">

    <div v-if="!isSubAlasanConnector" class="panel-heading">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <strong><span class="card-title">{{ cardTitle }}</span></strong>
          </div>
          <div v-if="showFooter" class="pull-right">
            <button @click="changeThisCard" class="btn btn-success btn-xs" title="Ubah argumen ini">
              <span class="glyphicon glyphicon-pencil"></span>
            </button>
            <button @click="deleteThisCard" class="btn btn-danger btn-xs" title="Hapus argumen ini">
              <span class="glyphicon glyphicon-remove"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div v-if="!isSubAlasanConnector" class="col-md-12">
          <p class="card-content">{{ card.content }}</p>
        </div>
        <div v-else class="col-md-12">
          <span class="dan"><strong>Dan</strong></span>
        </div>
      </div>
    </div>
    <div v-if="showFooter && !isSubAlasanConnector" class="panel-footer">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <button @click="createRelationCard('reason')" title="Buat alasan (reason) untuk argumen ini" class="btn btn-primary btn-xs">Alasan</button>
            <button @click="createRelationCard('objection')" title="Buat keberatan (objection) untuk argumen ini" v-if="card.type !== 'objection' && card.type !== 'rebuttal'" class="btn btn-danger btn-xs">Keberatan</button>
            <button @click="createRelationCard('rebuttal')" title="Buat bantahan (rebuttal) untuk argumen ini" v-if="card.type === 'objection' || card.type === 'rebuttal'" class="btn btn-warning btn-xs">Bantahan</button>
            <button @click="createRelationCard('sub-reason-connector')" title="Buat sub alasan untuk argumen ini" class="btn btn-success btn-xs">Sub Alasan</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showFooter && isSubAlasanConnector" class="panel-footer">
      <div class="row">
        <div class="col-md-12">
          <button @click="createRelationCard('sub-reason')" class="btn btn-success btn-block btn-xs" title="Buat Sub Alasan">Sub Alasan</button>
          <button @click="deleteThisCard" class="btn btn-danger btn-xs btn-block" title="Hapus argumen ini">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Card from '../models/Card';
  import cardTypeAndTitleMap from '../mappers/cardTypeAndTitle';

  export default {
    name: 'card',
    props: {
      card: {
        type: Card,
        required: true
      },
      cardHoveredId: {
        type: Number,
        required: true
      },
      cardSelectedId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
      }
    },
    computed: {
      classObject() {
        return {
          'hovered': this.card.id === this.cardHoveredId,
          'selected': this.card.id === this.cardSelectedId,
          'panel-default': this.card.type === 'contention',
          'panel-success': this.card.type === 'sub-reason-connector' || this.card.type === 'reason' || this.card.type === 'sub-reason',
          'panel-danger': this.card.type === 'objection',
          'panel-warning': this.card.type === 'rebuttal'
        };
      },
      styleObject() {
        return {
          left: this.card.left,
          top: this.card.top,
          width: this.isSubAlasanConnector ? '100px' : '300px'
        }
      },
      cardTitle() {
        return cardTypeAndTitleMap[this.card.type] === undefined ? '' : cardTypeAndTitleMap[this.card.type];
      },
      showFooter() {
        return this.card.id === this.cardHoveredId || this.card.id === this.cardSelectedId;
      },
      isSubAlasanConnector() {
        return this.card.type === 'sub-reason-connector';
      }
    },
    methods: {
      createRelationCard(type) {
        this.$emit('on-create-relation-card', {
          type: type,
          toRelatedId: this.card.id,
          top: this.card.top,
          left: this.card.left
        });
      },
      onCardMouseOver() {
        this.$emit('on-card-hovered', {
          id: this.card.id
        });
      },
      onCardClicked() {
        this.$emit('on-card-clicked', {
          id: this.card.id
        });
      },
      onCardMouseLeave() {
        this.$emit('on-card-mouse-leave');
      },
      viewThisCard() {
        this.$emit('on-view-card', {
          id: this.card.id
        });
      },
      deleteThisCard() {
        this.$emit('on-delete-card', {
          id: this.card.id,
          relatedToId: this.card.relation === null ? null : this.card.relation.toId,
          type: this.card.type
        });
      },
      changeThisCard() {
        this.$emit('on-change-card', {
          id: this.card.id,
          content: this.card.content,
          type: this.card.type
        });
      }
    },
    mounted() {
      this.$emit('on-mounted', {
        id: this.card.id,
        relation: this.card.relation
      });
    }
  }
</script>

<style scoped>
  .card {
    position: absolute;
    z-index: 99 !important;
  }
  
  .card-title {
    font-size: 16px;
  }

  .card-content {
    font-size: 15px;
  }

  .selected {
    z-index: 100 !important;
  }

  .hovered {
    z-index: 101 !important;
  }

  .hovered.panel-default, .selected.panel-default {
    border: solid 2px black;
  }

  .hovered.panel-success, .selected.panel-success {
    border: solid 2px green;
  }

  .hovered.panel-danger, .selected.panel-danger {
    border: solid 2px red;
  }

  .hovered.panel-warning, .selected.panel-warning {
    border: solid 2px orange;
  }

  .dan {
    font-size: 17px;
  }

  .glyphicon {
    font-size: 10px;
  }
</style>