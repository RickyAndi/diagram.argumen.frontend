<template>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="padding: 0px; margin-right: 0px; margin-left: 0px;">
    <div class="container-fluid" style="padding-right: 0px; padding-left: 0px;">
      <ul>
        <li class="menu-list"><button title="Perbesar tampilan" @click="zoomIn" style="width: 100%; height: 100%" class="btn btn-success btn-sm btn-block">Perbesar <span class="glyphicon glyphicon-zoom-in"></span></button></li>
        <li class="menu-list"><button title="Perkecil tampilan" @click="zoomOut" style="width: 100%; height: 100%" class="btn btn-success btn-sm btn-block">Perkecil <span class="glyphicon glyphicon-zoom-out"></span></button></li>
        <li class="menu-list"><button title="Simpan diagram anda dalam bentuk file json" @click="saveToJson" style="width: 100%; height: 100%" class="btn btn-info btn-sm btn-block">Simpan ke file <span class="glyphicon glyphicon-floppy-disk"></span></button></li>
        <li class="menu-list"><button title="Muat file json anda untuk ditampilkan pada diagram" @click="loadFromJson" style="width: 100%; height: 100%" class="btn btn-warning btn-sm btn-block">Muat dari file <span class="glyphicon glyphicon-upload"></span></button></li>
        <li class="menu-list"><button title="Buat kesimpulan" @click="showArgumentForm" style="width: 100%; height: 100%" class="btn btn-primary btn-sm btn-block">Buat Kesimpulan</button></li>
        <li class="menu-list"><button title="Hapus semua data (anda akan mengkosongka diagram)" @click="removeAllData" style="width: 100%; height: 100%" class="btn btn-danger btn-sm btn-block">Hapus Data</button></li>
        <li class="menu-list"><button title="Lihat tentang aplikasi ini" @click="showAbout" style="width: 100%; height: 100%" class="btn btn-info btn-sm btn-block">Tentang Aplikasi</button></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',
    methods: {
      showArgumentForm() {
        this.$emit('on-show-argument-form');
      },
      zoomIn() {
        this.$emit('on-zoomed-in');
      },
      zoomOut() {
        this.$emit('on-zoomed-out');
      },
      saveToJson() {
        this.$emit('on-save-to-json');
      },
      loadFromJson() {
        this.$emit('on-load-from-json');
      },
      showAbout() {
        this.$emit('on-show-about');
      },
      removeAllData() {
        this.$emit('on-remove-all-data');
      },
    },
  };
</script>

<style scoped>
   ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #333;
  }

  li {
      float: left;
  }

  li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
  }
  
  li a:hover {
      background-color: #111;
  }

  .menu-list {
      margin-top: 10px;
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 10px;
  }

  .navbar {
    z-index: 102;
  }
</style>
