<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" :class="modalSize">
      <div class="modal-content">
        <div v-if="normalizedOptions('withHeader')" class="modal-header">
          <button type="button" class="close" @click="hide()" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title" id="myModalLabel">{{ normalizedOptions('title') }}</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { Modal } from 'bootstrap.native';
  import ifEqualReturnOtherwise from '../utils/ifEqualReturnOtherwise';

  export default {
    name: 'modal',
    props: {
      options: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
      }
    },
    methods: {
      show() {
        (new Modal(this.$el, {
          backdrop: this.normalizedOptions('backdrop'),
          keyboard: this.normalizedOptions('keyboard')
        })).show();
      },
      hide() {
        (new Modal(this.$el, {})).hide();
      },
      onHidden() {
        this.$emit('on-hidden');
      },
      normalizedOptions(optionName) {
        const otherwiseValue = {
          title: '',
          withHeader: true,
          backdrop: null,
          keyboard: true,
          modalSize: 'medium'
        };

        return ifEqualReturnOtherwise(this.options[optionName], undefined, otherwiseValue[optionName]);
      }
    },
    computed: {
      modalSize() {
        return {
          'modal-lg': this.normalizedOptions('modalSize') === 'large',
          'modal-sm': this.normalizedOptions('modalSize') === 'small',
          'modal-md': this.normalizedOptions('modalSize') === 'medium'
        };
      }
    },
    mounted() {
      this.$el.addEventListener('hidden.bs.modal', () => {
        this.onHidden();
      });
    }
  }
</script>

<style scoped>
  .modal-content {
    z-index: auto !important;
  }
</style>