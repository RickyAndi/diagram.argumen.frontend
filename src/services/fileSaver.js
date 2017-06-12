/* eslint-disable */
import FileSaver from 'file-saver';

export default {
  saveAs(blob, name) {
    FileSaver.saveAs(blob, name === '' ? 'argumenSaya.rickyandi.github.io.json' : name + '.rickyandi.github.io.json');
  },
  saveToJsonFile(objectData, fileName) {
    const stringifiedObjectData = JSON.stringify(objectData);
    const blob = new Blob([stringifiedObjectData], { type: "text/plain;charset=utf-8" });
    this.saveAs(blob, fileName);
  }
}