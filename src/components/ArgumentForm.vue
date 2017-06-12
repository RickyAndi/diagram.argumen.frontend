<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <h3>{{ title }}</h3>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="isi" class="control-label">Isi</label>
            <textarea name="isi" rows="10" class="form-control" v-model="formData.content"></textarea>
          </div>
          <div class="form-group">
            <div class="pull-right">
              <button @click="sendData" v-if="showSaveButton" class="btn btn-primary">Simpan</button>
              <button @click="sendData" v-if="showEditButton" class="btn btn-primary">Ubah</button>
              <button @click="closeButtonClicked" class="btn btn-warning">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   /* eslint-disable */
  export default {
    name: 'argument-form',
    data() {
      return {
        statusEnum: {
          'CREATING': 'creating',
          'EDITING': 'editing'
        },
        currentStatus: 'creating',
        formData: {
          content: ''
        },
        title: ''
      }
    },
    methods: {
      sendData() {
        this.$emit('on-send-data', {
          content: this.formData.content
        });
      },
      setDataToEdit(data) {
        this.formData.content = data.content;
      },
      reset() {
        this.formData.content = '';
      },
      closeButtonClicked() {
        this.$emit('on-close-button-clicked');
      },
      setTitle(title) {
        this.title = title;
      }
    },
    computed: {
      isCreating() {
        return this.currentStatus === this.statusEnum['CREATING'];
      },
      isEditing() {
        return this.currentStatus === this.statusEnum['EDITING'];
      },
      showSaveButton() {
        return this.isCreating;
      },
      showEditButton() {
        return this.isEditing;
      },
    }
  }
</script>

<style>
  
</style>